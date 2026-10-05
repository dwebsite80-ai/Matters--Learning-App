import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';

// Use compiled ESM modules with explicit .js extension for native Node 22 execution
import { processTiaChat, getGeminiApiKey } from './src/services/tiaAiHandler.js';
import { processSignup } from './src/services/authServerHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // CORS middleware to ensure seamless communication in all environments (iframes, shared previews, local)
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  app.use(express.json());

  // Health checks for Cloud Run & Google Cloud Load Balancer
  app.get('/healthz', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', hasGeminiApiKey: Boolean(getGeminiApiKey()) });
  });

  // Diagnostic status check for API configuration (no secrets exposed)
  app.get('/api/tia/status', (req, res) => {
    const hasKey = Boolean(getGeminiApiKey());
    res.json({
      ok: true,
      hasGeminiApiKey: hasKey,
      nodeEnv: process.env.NODE_ENV || 'production',
    });
  });

  // Tia AI chat endpoint - accepts message/question, course (optional), lesson (optional)
  app.post('/api/tia/chat', async (req, res) => {
    try {
      const result = await processTiaChat(req.body || {});
      return res.status(result.status).json(result.data);
    } catch (err: any) {
      console.error('[Tia Server] Error handling /api/tia/chat:', err?.message || err);
      return res.status(500).json({ ok: false, error: 'Internal server error processing Tia chat' });
    }
  });

  // Secure Server-side Signup Endpoint (replaces client-side /auth/v1/signup)
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const clientIp =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        req.socket.remoteAddress ||
        '127.0.0.1';
      const result = await processSignup(req.body || {}, clientIp);
      return res.status(result.status).json(result.data);
    } catch (err: any) {
      console.error('[Auth Server] Error handling /api/auth/signup:', err?.message || err);
      return res.status(500).json({
        ok: false,
        error: 'Oops, kuch technical problem aa gayi. Dobara try karo.',
      });
    }
  });

  // Determine if running in production mode:
  // If built assets exist and we are NOT in explicit npm run dev mode, always serve production build
  const candidates = [
    path.join(process.cwd(), 'dist'),
    path.resolve(__dirname, 'dist'),
    path.resolve(__dirname, '..', 'dist'),
    '/app/applet/dist',
  ];
  const distPath = candidates.find((dir) => fs.existsSync(path.join(dir, 'index.html')));
  const isExplicitDev = process.env.npm_lifecycle_event === 'dev';
  const isProduction = Boolean(distPath) && !isExplicitDev;

  if (isProduction && distPath) {
    console.log(`[Server] Serving production build from: ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Application build artifact index.html not found. Run npm run build.');
      }
    });
  } else {
    console.log('[Server] Initializing Vite middleware for development');
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  // Primary listener binds to the assigned PORT (3000 in dev, Cloud Run assigned PORT in production)
  const primaryServer = http.createServer(app);
  primaryServer.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[Server] Port ${PORT} is already in use; skipping listener on ${PORT}.`);
    } else {
      console.error(`[Server] Error on port ${PORT}:`, err);
    }
  });

  primaryServer.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Ready and listening on http://0.0.0.0:${PORT}`);
  });

  // Secondary listener for port 3000 if PORT is a distinct Cloud Run port (e.g., 8080)
  if (PORT !== 3000) {
    try {
      const secondaryServer = http.createServer(app);
      secondaryServer.on('error', () => {
        // Silently skip if port 3000 is unavailable or in use
      });
      secondaryServer.listen(3000, '0.0.0.0', () => {
        console.log(`[Server] Secondary listener active on http://0.0.0.0:3000`);
      });
    } catch {
      // Ignore
    }
  }
}

startServer();
