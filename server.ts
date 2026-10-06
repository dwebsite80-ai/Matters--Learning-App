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

  // Detect Cloud Run container vs local dev environment
  const isCloudRun = Boolean(process.env.K_SERVICE || process.env.K_REVISION);
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    isCloudRun ||
    process.env.npm_lifecycle_event === 'start';

  const candidates = [
    path.join(process.cwd(), 'dist'),
    path.resolve(__dirname, 'dist'),
    path.resolve(__dirname, '..', 'dist'),
    '/app/applet/dist',
    '/workspace/dist',
  ];
  const distPath = candidates.find((dir) => fs.existsSync(path.join(dir, 'index.html')));

  if (isProduction || distPath) {
    if (distPath) {
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
      console.warn('[Server] Running in production mode but dist folder was not found. Serving fallback.');
      app.get('*', (req, res) => {
        res.status(200).send('<!doctype html><html><head><title>Matters</title></head><body><h1>Matters is starting up...</h1><script>setTimeout(() => location.reload(), 2000);</script></body></html>');
      });
    }
  } else {
    console.log('[Server] Initializing Vite middleware for development');
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  // Cloud Run assigns PORT (usually 8080). Local dev server uses port 3000.
  const listenPort = isCloudRun
    ? (process.env.PORT ? parseInt(process.env.PORT, 10) : 8080)
    : 3000;

  const server = http.createServer(app);

  server.on('error', (err: any) => {
    console.error(`[Server] Error on port ${listenPort}:`, err);
    if (err.code === 'EADDRINUSE') {
      console.warn(`[Server] Port ${listenPort} in use.`);
    }
  });

  server.listen(listenPort, '0.0.0.0', () => {
    console.log(`[Server] Ready and listening on http://0.0.0.0:${listenPort} (CloudRun: ${isCloudRun})`);
  });

  // If in dev environment and PORT is set to something other than 3000, also bind to it if available
  if (!isCloudRun && process.env.PORT && parseInt(process.env.PORT, 10) !== 3000) {
    const extraPort = parseInt(process.env.PORT, 10);
    try {
      const extraServer = http.createServer(app);
      extraServer.on('error', () => {
        // Silently skip if extra port is unavailable (e.g. nginx proxy port)
      });
      extraServer.listen(extraPort, '0.0.0.0', () => {
        console.log(`[Server] Additional listener active on http://0.0.0.0:${extraPort}`);
      });
    } catch {
      // Ignore
    }
  }

  // Graceful shutdown on Cloud Run SIGTERM
  process.on('SIGTERM', () => {
    console.log('[Server] Received SIGTERM, shutting down gracefully');
    server.close(() => {
      process.exit(0);
    });
  });
}

startServer();
