import { processTiaChat, getGeminiApiKey } from '../../src/services/tiaAiHandler.js';

export default async function handler(req: any, res: any) {
  // CORS support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Safe server-side diagnostic logging - NEVER log keys
  const hasKey = Boolean(getGeminiApiKey());
  console.log(`[Tia Backend] Request received | HTTP Method: ${req.method} | GEMINI_API_KEY present: ${hasKey}`);

  if (req.method !== 'POST') {
    console.warn(`[Tia Backend] Method rejected: ${req.method}`);
    return res.status(405).json({ ok: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const questionText = body.message || body.question || body.userText || '';
    console.log(`[Tia Backend] Question received: "${questionText.slice(0, 100)}"`);
    const result = await processTiaChat(body);
    console.log(`[Tia Backend] Handled successfully | Response status: ${result.status} | ok: ${result.data?.ok}`);
    return res.status(result.status).json(result.data);
  } catch (err: any) {
    console.error('[Tia Backend] Unhandled error:', err?.message || err);
    return res.status(500).json({ ok: false, error: 'Internal server error processing Tia chat' });
  }
}
