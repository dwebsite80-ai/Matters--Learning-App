/**
 * Matters — Tia Dedicated Settings & Control Storage
 * 
 * Persists user preferences for Tia Assistant:
 * - Active Voice & Synthesis options (Pitch, Rate, Female voice preference, Auto-speech)
 * - Language configuration (Hindi / English)
 * - Personality & Tone flags (Humor, Explanatory Depth, Relatable analogies)
 * - Assistant Behavior (Voice response toggle, Auto follow-up listening)
 */

export type TiaVoiceEngine = 'browser' | 'gemini_tts' | 'google_cloud_tts';
export type TiaReplyStyle = 'conversational' | 'concise' | 'detailed';

export interface TiaPersonalitySettings {
  humorLevel: 'witty' | 'balanced' | 'serious';
  friendliness: 'warm_peer' | 'polite_mentor';
  depth: 'concise' | 'balanced' | 'detailed';
  useEverydayAnalogies: boolean;
}

export interface TiaVoiceControls {
  engine: TiaVoiceEngine;
  femaleVoiceOnly: boolean;
  rate: number; // 0.8 - 1.3
  pitch: number; // 0.9 - 1.3
  autoSpeakResponse: boolean;
  enableFollowUpListening: boolean;
}

export interface TiaAppSettings {
  language: 'hi' | 'en';
  voice: TiaVoiceControls;
  personality: TiaPersonalitySettings;
  replyStyle: TiaReplyStyle;
}

export const DEFAULT_TIA_SETTINGS: TiaAppSettings = {
  language: 'hi',
  voice: {
    engine: 'browser',
    femaleVoiceOnly: true,
    rate: 1.0,
    pitch: 1.08,
    autoSpeakResponse: true,
    enableFollowUpListening: true,
  },
  personality: {
    humorLevel: 'witty',
    friendliness: 'warm_peer',
    depth: 'balanced',
    useEverydayAnalogies: true,
  },
  replyStyle: 'conversational',
};

const TIA_SETTINGS_KEY = 'matters_tia_settings_v1';

export function getStoredTiaSettings(): TiaAppSettings {
  if (typeof window === 'undefined') return DEFAULT_TIA_SETTINGS;
  try {
    const raw = localStorage.getItem(TIA_SETTINGS_KEY);
    if (!raw) return DEFAULT_TIA_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_TIA_SETTINGS,
      ...parsed,
      voice: {
        ...DEFAULT_TIA_SETTINGS.voice,
        ...(parsed.voice || {}),
      },
      personality: {
        ...DEFAULT_TIA_SETTINGS.personality,
        ...(parsed.personality || {}),
      },
    };
  } catch (err) {
    console.warn('[Tia Settings] Failed to load from storage, using defaults:', err);
    return DEFAULT_TIA_SETTINGS;
  }
}

export function saveStoredTiaSettings(settings: TiaAppSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TIA_SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(
      new CustomEvent('matters:tia-settings-changed', {
        detail: { settings },
      })
    );
  } catch (err) {
    console.error('[Tia Settings] Failed to save to localStorage:', err);
  }
}

export function resetStoredTiaSettings(): TiaAppSettings {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(TIA_SETTINGS_KEY);
    } catch (e) {
      // ignore
    }
  }
  window.dispatchEvent(
    new CustomEvent('matters:tia-settings-changed', {
      detail: { settings: DEFAULT_TIA_SETTINGS },
    })
  );
  return DEFAULT_TIA_SETTINGS;
}
