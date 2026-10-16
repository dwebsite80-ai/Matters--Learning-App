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

/**
 * Converts raw 24kHz 16-bit Mono L16 PCM audio into standard WAV format
 * so browsers (HTML5 Audio element) can decode and play it seamlessly.
 */
function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const wavBuffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  wavBuffer.write('RIFF', 0);
  wavBuffer.writeUInt32LE(36 + dataSize, 4);
  wavBuffer.write('WAVE', 8);

  // fmt subchunk
  wavBuffer.write('fmt ', 12);
  wavBuffer.writeUInt32LE(16, 16); // subchunk1 size (16 for PCM)
  wavBuffer.writeUInt16LE(1, 20); // audio format (1 = Linear PCM)
  wavBuffer.writeUInt16LE(numChannels, 22);
  wavBuffer.writeUInt32LE(sampleRate, 24);
  wavBuffer.writeUInt32LE(byteRate, 28);
  wavBuffer.writeUInt16LE(blockAlign, 32);
  wavBuffer.writeUInt16LE(bitsPerSample, 34);

  // data subchunk
  wavBuffer.write('data', 36);
  wavBuffer.writeUInt32LE(dataSize, 40);
  pcmBuffer.copy(wavBuffer, 44);

  return wavBuffer;
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
        model: 'gemini-2.5-flash-preview-tts',
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
    console.log(`[Tia TTS] Cache hit for "${voiceName}" (${language})`);
    return {
      status: 200,
      data: {
        ok: true,
        audioBase64: cached.audioBase64,
        mimeType: cached.mimeType,
        cached: true,
        voiceName,
        provider,
        model: 'gemini-2.5-flash-preview-tts',
      },
    };
  }

  // Handle Gemini TTS synthesis
  if (provider === 'gemini_tts') {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      console.warn('[Tia TTS] Missing GEMINI_API_KEY');
      return {
        status: 503,
        data: {
          ok: false,
          error: 'GEMINI_API_KEY is not configured on the server',
          code: 'MISSING_GEMINI_KEY',
          fallbackToBrowser: true,
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

      // Use the verified, officially supported Gemini TTS model
      const ttsModels = [
        'gemini-2.5-flash-preview-tts',
        'gemini-3.8-flash-lite-tts',
        'gemini-3.8-flash-tts',
        'gemini-3.1-flash-tts-preview',
      ];

      let audioResult: { audioBase64: string; mimeType: string; rawModel: string } | null = null;
      let lastError: any = null;

      for (const modelName of ttsModels) {
        try {
          console.log(`[Tia TTS] Requesting synthesis | Model: ${modelName} | Voice: ${selectedVoice} | Lang: ${language} | Length: ${cleanText.length}`);

          const response = await ai.models.generateContent({
            model: modelName,
            contents: cleanText,
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
              const rawMime = p.inlineData.mimeType || 'audio/L16;codec=pcm;rate=24000';
              let finalBase64 = p.inlineData.data;
              let finalMime = 'audio/wav';

              // If Gemini returns raw PCM (audio/L16), wrap it in a proper WAV container
              if (rawMime.includes('audio/L16') || rawMime.includes('pcm')) {
                const pcmBuffer = Buffer.from(p.inlineData.data, 'base64');
                const wavBuffer = pcmToWav(pcmBuffer, 24000, 1, 16);
                finalBase64 = wavBuffer.toString('base64');
              } else {
                finalMime = rawMime;
              }

              audioResult = {
                audioBase64: finalBase64,
                mimeType: finalMime,
                rawModel: modelName,
              };
              console.log(`[Tia TTS] Successfully generated audio via ${modelName} | Size: ${finalBase64.length} chars | Format: ${finalMime}`);
              break;
            }
          }

          if (audioResult) break;
        } catch (modelErr: any) {
          lastError = modelErr;
          console.warn(`[Tia TTS] Model ${modelName} issue:`, modelErr?.message || modelErr);
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
            model: audioResult.rawModel,
          },
        };
      }

      console.error('[Tia TTS] All Gemini TTS models failed:', lastError?.message || lastError);
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
