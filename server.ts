import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import { createServer as createViteServer } from 'vite';

import { processTiaChat, getGeminiApiKey } from './src/services/tiaAiHandler';
import { processSignup } from './src/services/authServerHandler';

async function startServer() {
  const app = express();
  const PRIMARY_PORT = 3000;

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

  // Health checks
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasGeminiApiKey: Boolean(getGeminiApiKey()) });
  });
  app.get('/healthz', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Diagnostic status check for API configuration (no secrets exposed)
  app.get('/api/tia/status', (req, res) => {
    const hasKey = Boolean(getGeminiApiKey());
    res.json({
      ok: true,
      hasGeminiApiKey: hasKey,
      nodeEnv: process.env.NODE_ENV || 'development',
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

  // Vite middleware setup for development, or static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const candidates = [
      path.join(process.cwd(), 'dist'),
      __dirname,
      path.resolve(__dirname, '..', 'dist'),
      '/app/applet/dist',
    ];
    const distPath =
      candidates.find((dir) => fs.existsSync(path.join(dir, 'index.html'))) || candidates[0];

    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath, (err) => {
          if (err && !res.headersSent) {
            res.status(500).send('Error serving application');
          }
        });
      } else {
        res.status(404).send('Application build artifact index.html not found. Run npm run build.');
      }
    });
  }

  const tryListen = (port: number, label: string) => {
    try {
      const server = http.createServer(app);
      server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          console.warn(`[${label}] Port ${port} is already in use; skipping listener on ${port}.`);
        } else {
          console.error(`[${label}] Server error on port ${port}:`, err);
        }
      });
      server.listen(port, '0.0.0.0', () => {
        console.log(`Tia Server (${label}) listening on http://0.0.0.0:${port}`);
      });
      return server;
    } catch (err) {
      console.warn(`[${label}] Failed to start listener on port ${port}:`, err);
      return null;
    }
  };

  // Primary listener binds to port 3000 (standard for AI Studio dev server & Nginx reverse proxy)
  tryListen(PRIMARY_PORT, 'primary');

  // Secondary listener for standalone Cloud Run container if PORT is specified and distinct
  const secondaryPort = Number(process.env.PORT);
  if (secondaryPort && secondaryPort !== PRIMARY_PORT) {
    tryListen(secondaryPort, 'secondary');
  }
}

startServer();
