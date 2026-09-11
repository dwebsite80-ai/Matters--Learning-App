import { getGeminiApiKey } from '../../src/services/tiaAiHandler';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const hasKey = Boolean(getGeminiApiKey());
  return res.status(200).json({
    ok: true,
    hasGeminiApiKey: hasKey,
    environment: 'vercel-serverless',
    timestamp: new Date().toISOString(),
  });
}
