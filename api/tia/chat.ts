import { processTiaChat, getGeminiApiKey } from '../../src/services/tiaAiHandler';

export default async function handler(req: any, res: any) {
  // CORS support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Safe server-side diagnostic logging (Step 5) - NEVER log keys
  const hasKey = Boolean(getGeminiApiKey());
  console.log(`[Vercel API /api/tia/chat] Request received | HTTP Method: ${req.method} | GEMINI_API_KEY present: ${hasKey}`);

  if (req.method !== 'POST') {
    console.warn(`[Vercel API /api/tia/chat] Method rejected: ${req.method}`);
    return res.status(405).json({ ok: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const result = await processTiaChat(body);
    console.log(`[Vercel API /api/tia/chat] Handled successfully | Response status: ${result.status} | ok: ${result.data?.ok}`);
    return res.status(result.status).json(result.data);
  } catch (err: any) {
    console.error('[Vercel API /api/tia/chat] Unhandled error:', err?.message || err);
    return res.status(500).json({ ok: false, error: 'Internal server error processing Tia chat' });
  }
}
