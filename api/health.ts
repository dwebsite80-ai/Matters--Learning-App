import { getGeminiApiKey } from '../src/services/tiaAiHandler';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const hasKey = Boolean(getGeminiApiKey());
  return res.status(200).json({
    status: 'ok',
    hasGeminiApiKey: hasKey,
    environment: 'vercel-serverless',
  });
}
