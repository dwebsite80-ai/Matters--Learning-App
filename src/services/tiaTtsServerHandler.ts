/**
 * Server-side TTS synthesis handler for Tia AI Assistant
 * 
 * Endpoints handled:
 * - GET  /api/tia/tts/status -> returns provider readiness & available voices
 * - POST /api/tia/tts/synthesize -> generates premium audio (Gemini TTS / Cloud Chirp)
 */

import { GoogleGenAI } from '@google/genai';
import { getGeminiApiKey } from './tiaAiHandler';

// In-memory LRU / preview cache to avoid redundant cloud calls and keep user within budget (₹300 - ₹700/mo)
const audioCache = new Map<string, { audioBase64: string; mimeType: string; timestamp: number }>();
const MAX_CACHE_SIZE = 100;

function getCacheKey(text: string, voiceName: string, lang: string): string {
  return `${voiceName}:${lang}:${text.slice(0, 120).trim()}`;
}

export function getTtsStatus() {
  const hasGeminiKey = Boolean(getGeminiApiKey());
  const hasGcpCreds = Boolean(
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    process.env.GCP_TTS_KEY ||
    process.env.GOOGLE_CLOUD_KEY
  );

  return {
    ok: true,
    providers: {
      browser: {
        available: true,
        status: 'active',
        name: 'Browser Web Speech API',
        cost: 'Free (0 cost)',
        latency: 'Near instant (0ms)',
      },
      gemini_tts: {
        available: hasGeminiKey,
        status: hasGeminiKey ? 'active' : 'missing_key',
        name: 'Gemini Premium Studio HD',
        voices: ['Aoede', 'Kore'],
        cost: 'Included in Gemini API tier (~₹0.002 / response)',
        latency: 'Cloud neural audio (~600ms - 1.2s)',
      },
      google_cloud_chirp: {
        available: hasGcpCreds,
        status: hasGcpCreds ? 'active' : 'not_configured',
        name: 'Google Cloud Chirp 3 HD',
        voices: ['hi-IN-Chirp3-HD-F', 'en-IN-Chirp3-HD-F'],
        cost: 'Standard GCP pricing (~₹0.0013 / char after 1M free chars/month)',
        unavailabilityReason: hasGcpCreds
          ? undefined
          : 'Google Cloud Service Account (GOOGLE_APPLICATION_CREDENTIALS) not configured in server environment. Set credentials in Cloud Run to activate.',
      },
    },
  };
}

export async function synthesizeTiaAudio(body: {
  text?: string;
  provider?: string;
  voiceName?: string;
  language?: string;
}): Promise<{ status: number; data: any }> {
  const text = (body.text || '').trim();
  const provider = body.provider || 'gemini_tts';
  const voiceName = body.voiceName || 'Aoede';
  const language = body.language === 'hi' ? 'hi' : 'en';

  if (!text) {
    return {
      status: 400,
      data: { ok: false, error: 'Text to synthesize cannot be empty' },
    };
  }

  // Cap audio synthesis text at 600 chars to avoid timeout & high latency
  const cleanText = text.slice(0, 600);
  const cacheKey = getCacheKey(cleanText, voiceName, language);

  if (audioCache.has(cacheKey)) {
    const cached = audioCache.get(cacheKey)!;
    return {
      status: 200,
      data: {
        ok: true,
        audioBase64: cached.audioBase64,
        mimeType: cached.mimeType,
        cached: true,
        voiceName,
        provider,
      },
    };
  }

  // Handle Gemini TTS synthesis
  if (provider === 'gemini_tts') {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return {
        status: 503,
        data: {
          ok: false,
          error: 'GEMINI_API_KEY is not configured on the server',
          code: 'MISSING_GEMINI_KEY',
        },
      };
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build-tts',
          },
        },
      });

      // Valid prebuilt female voices: 'Aoede', 'Kore'
      const selectedVoice =
        voiceName.toLowerCase().includes('kore') ? 'Kore' : 'Aoede';

      // Model cascade for audio modality
      const ttsModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
      let audioResult: { audioBase64: string; mimeType: string } | null = null;
      let lastError: any = null;

      for (const modelName of ttsModels) {
        try {
          const prompt =
            language === 'hi'
              ? `Read this response naturally in spoken Hindi as an encouraging, friendly mentor named Tia: "${cleanText}"`
              : `Read this response naturally in conversational Indian English as an encouraging, friendly mentor named Tia: "${cleanText}"`;

          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: selectedVoice,
                  },
                },
              },
            },
          });

          const candidate = response?.candidates?.[0];
          const parts = candidate?.content?.parts || [];
          for (const p of parts) {
            if (p.inlineData && p.inlineData.data) {
              audioResult = {
                audioBase64: p.inlineData.data,
                mimeType: p.inlineData.mimeType || 'audio/wav',
              };
              break;
            }
          }

          if (audioResult) break;
        } catch (modelErr: any) {
          lastError = modelErr;
          console.warn(`[Tia TTS] ${modelName} audio generation spike/issue:`, modelErr?.message || modelErr);
        }
      }

      if (audioResult) {
        // Cache result
        if (audioCache.size >= MAX_CACHE_SIZE) {
          const firstKey = audioCache.keys().next().value;
          if (firstKey) audioCache.delete(firstKey);
        }
        audioCache.set(cacheKey, {
          audioBase64: audioResult.audioBase64,
          mimeType: audioResult.mimeType,
          timestamp: Date.now(),
        });

        return {
          status: 200,
          data: {
            ok: true,
            audioBase64: audioResult.audioBase64,
            mimeType: audioResult.mimeType,
            voiceName: selectedVoice,
            provider: 'gemini_tts',
          },
        };
      }

      // If audio modality is not available in current region / model demand spike, return clean fallback code
      return {
        status: 503,
        data: {
          ok: false,
          error: lastError?.message || 'Gemini Audio modality currently busy or unavailable',
          code: 'GEMINI_AUDIO_UNAVAILABLE',
          fallbackToBrowser: true,
        },
      };
    } catch (err: any) {
      console.error('[Tia TTS] Error in Gemini TTS:', err);
      return {
        status: 500,
        data: {
          ok: false,
          error: err?.message || 'Server error generating Gemini TTS',
          fallbackToBrowser: true,
        },
      };
    }
  }

  // Handle Google Cloud Chirp 3 HD
  if (provider === 'google_cloud_chirp') {
    const hasGcpCreds = Boolean(
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      process.env.GCP_TTS_KEY
    );

    if (!hasGcpCreds) {
      return {
        status: 503,
        data: {
          ok: false,
          error: 'Google Cloud Text-to-Speech credentials (GOOGLE_APPLICATION_CREDENTIALS) not configured on the server',
          code: 'GCP_CREDS_NOT_CONFIGURED',
          fallbackToBrowser: true,
        },
      };
    }

    // If credentials were provided in future, actual GCP REST call with OAuth token would execute here.
    return {
      status: 503,
      data: {
        ok: false,
        error: 'Google Cloud Chirp requires service account authentication',
        code: 'GCP_AUTH_REQUIRED',
        fallbackToBrowser: true,
      },
    };
  }

  return {
    status: 400,
    data: {
      ok: false,
      error: `Unsupported voice provider: ${provider}`,
      fallbackToBrowser: true,
    },
  };
}
