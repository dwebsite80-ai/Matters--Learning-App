import { processSignup } from '../../src/services/authServerHandler';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      '127.0.0.1';

    const result = await processSignup(req.body || {}, clientIp);
    return res.status(result.status).json(result.data);
  } catch (err: any) {
    console.error('[API /api/auth/signup] Error:', err);
    return res.status(500).json({
      ok: false,
      error: 'Oops, kuch technical problem aa gayi. Dobara try karo.',
    });
  }
}
