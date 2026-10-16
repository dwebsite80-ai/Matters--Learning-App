/**
 * Matters — Tia Unified TTS Audio Provider Architecture
 * 
 * Supports:
 * 1. Browser Voice (Free native Web Speech API fallback)
 * 2. Premium Studio HD — Gemini TTS (Aoede & Kore female voices)
 * 3. Google Cloud Chirp 3 HD — Cloud Text-to-Speech (Hindi hi-IN & Indian English en-IN)
 * 
 * Architecture Rules:
 * - Server credentials (GEMINI_API_KEY, GCP service accounts) stay strictly on server.
 * - Handles audio caching for reusable samples and previews to keep monthly costs low.
 * - Graceful fallback to Browser Voice whenever premium engines are unconfigured or fail.
 */

export type TiaTtsProvider = 'browser' | 'gemini_tts' | 'google_cloud_chirp';

export interface TiaTtsVoiceOption {
  id: string;
  name: string;
  provider: TiaTtsProvider;
  gender: 'female';
  language: 'hi' | 'en' | 'both';
  description: string;
  isAvailable: boolean;
  unavailabilityReason?: string;
}

export const TIA_PREMIUM_VOICES: TiaTtsVoiceOption[] = [
  // Gemini TTS Voices
  {
    id: 'gemini-aoede',
    name: 'Aoede (Gemini Studio HD)',
    provider: 'gemini_tts',
    gender: 'female',
    language: 'both',
    description: 'Deep, engaging, expressive female studio voice from Gemini',
    isAvailable: true,
  },
  {
    id: 'gemini-kore',
    name: 'Kore (Gemini Studio HD)',
    provider: 'gemini_tts',
    gender: 'female',
    language: 'both',
    description: 'Crisp, bright, warm female conversational voice from Gemini',
    isAvailable: true,
  },
  // Google Cloud Chirp 3 HD Voices
  {
    id: 'chirp-hi-female',
    name: 'Chirp 3 HD Hindi (Google Cloud)',
    provider: 'google_cloud_chirp',
    gender: 'female',
    language: 'hi',
    description: 'Natural neural Hindi voice with expressive cadence and authentic Hindi phonemes',
    isAvailable: false,
    unavailabilityReason: 'Google Cloud Text-to-Speech service account credentials (GOOGLE_APPLICATION_CREDENTIALS) not configured on server',
  },
  {
    id: 'chirp-en-in-female',
    name: 'Chirp 3 HD Indian English (Google Cloud)',
    provider: 'google_cloud_chirp',
    gender: 'female',
    language: 'en',
    description: 'High-definition Indian English accent neural voice from Google Cloud',
    isAvailable: false,
    unavailabilityReason: 'Google Cloud Text-to-Speech service account credentials (GOOGLE_APPLICATION_CREDENTIALS) not configured on server',
  },
];

export interface TiaTtsStatusResponse {
  ok: boolean;
  providers: {
    browser: {
      available: boolean;
      status: 'active';
      cost: 'Free';
    };
    gemini_tts: {
      available: boolean;
      status: 'active' | 'missing_key';
      voices: string[];
      cost: 'Gemini API tokens (~₹0.002 per response)';
    };
    google_cloud_chirp: {
      available: boolean;
      status: 'not_configured' | 'active';
      voices: string[];
      cost: '₹0.0013 per character after 1M free chars/month';
      unavailabilityReason: string;
    };
  };
}
