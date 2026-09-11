import { AppLanguage, TiaLanguageConfig } from '../types';

export interface TiaVoiceSettings {
  pitch: number;
  rate: number;
  gender: 'female';
}

export interface TiaCentralizedConfig extends TiaLanguageConfig {
  voiceSettings: TiaVoiceSettings;
}

/**
 * Single source of truth helper for Tia Voice Assistant Language configuration.
 *
 * Current User Selected Language -> Tia Response Language + Tia Voice Language
 *
 * Hindi:
 * language = "hi"
 * locale = "hi-IN"
 * voice = <female Hindi-capable voice> (Swara, Kalpana, Lekha, Google हिन्दी, or female Hindi)
 *
 * English:
 * language = "en"
 * locale = "en-IN"
 * voice = <existing working English voice> (en-IN, India, Samantha, Google UK English female)
 *
 * Rule: Never use English voice for Hindi. Never use Hindi voice for English.
 */
export function getTiaLanguageConfig(currentLanguage: AppLanguage | string = 'en'): TiaCentralizedConfig {
  const isHindi = currentLanguage === 'hi';

  if (isHindi) {
    return {
      language: 'hi',
      locale: 'hi-IN',
      ttsLocale: 'hi-IN',
      responseLanguage: 'Hindi',
      voiceSettings: {
        pitch: 1.1, // Warm, bright, friendly female pitch
        rate: 0.95, // Natural conversational cadence for clear Hindi phonemes and pauses
        gender: 'female',
      },
      systemInstruction:
        'You are Tia, a funny and friendly female AI learning tutor. Respond primarily in Hindi. You may naturally use common English educational terms where appropriate. Speak naturally like a friendly Indian tutor with natural pauses and clear pronunciation. Keep explanations simple and conversational.',
    };
  }

  return {
    language: 'en',
    locale: 'en-IN',
    ttsLocale: 'en-IN',
    responseLanguage: 'English',
    voiceSettings: {
      pitch: 1.08, // Existing working English voice pitch
      rate: 1.02, // Existing working English voice rate
      gender: 'female',
    },
    systemInstruction:
      'You are Tia, a funny and friendly AI learning tutor. Respond in natural English. Speak like a friendly Indian tutor. Keep explanations simple and conversational.',
  };
}

/**
 * Centralized Voice Selector:
 * Selects the optimal TTS voice for the active language.
 *
 * In Hindi:
 * - Strictly prioritizes female Hindi-capable voices (Swara, Kalpana, Lekha, Google हिन्दी, etc.)
 * - Actively avoids/penalizes known male Hindi voices (Hemant, Madhur, Rishi)
 * - NEVER falls back to an English voice for Hindi text!
 *
 * In English:
 * - Preserves the exact existing working English voice selector (en-IN, India, Samantha, etc.)
 * - NEVER uses a Hindi voice for English text.
 */
export function selectTiaVoice(
  voices: SpeechSynthesisVoice[],
  language: AppLanguage | string
): SpeechSynthesisVoice | undefined {
  if (!voices || voices.length === 0) return undefined;

  const isHindi = language === 'hi';

  if (isHindi) {
    // Filter to ONLY Hindi-capable voices
    const hindiVoices = voices.filter((v) => {
      const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
      const name = (v.name || '').toLowerCase();
      const isHiLang = lang === 'hi' || lang.startsWith('hi-');
      const hasHindiName = name.includes('hindi') || v.name.includes('हिन्दी');
      const isEnglishOnly = lang.startsWith('en') && !hasHindiName;
      return (isHiLang || hasHindiName) && !isEnglishOnly;
    });

    // If no Hindi-capable voice exists in synthesis engine, return undefined.
    // Setting utterance.lang = 'hi-IN' without an assigned voice allows the platform
    // to synthesize via its native hi-IN engine, rather than mispronouncing via English.
    if (hindiVoices.length === 0) {
      return undefined;
    }

    // Rank Hindi voices with strong preference for FEMALE voices
    const scoredVoices = hindiVoices.map((v) => {
      const name = (v.name || '').toLowerCase();
      let score = 10;

      // Microsoft Edge neural female voice (Swara) - pristine quality
      if (name.includes('swara')) {
        score += 100;
      }
      // Microsoft Kalpana (female)
      else if (name.includes('kalpana')) {
        score += 90;
      }
      // Apple Lekha (macOS / iOS female Hindi)
      else if (name.includes('lekha')) {
        score += 90;
      }
      // Google हिन्दी / Google Hindi (Chrome / Android female Hindi voice)
      else if (name.includes('google') && (name.includes('hindi') || v.name.includes('हिन्दी'))) {
        score += 80;
      }
      // Other female keywords and names
      else if (
        name.includes('female') ||
        name.includes('woman') ||
        name.includes('girl') ||
        name.includes('priya') ||
        name.includes('ananya') ||
        name.includes('shruti') ||
        name.includes('kavya') ||
        name.includes('neerja') ||
        name.includes('aditi') ||
        name.includes('pooja') ||
        name.includes('sunita') ||
        (v as any).gender === 'female'
      ) {
        score += 70;
      }

      // Heavily penalize known male Hindi voices to guarantee a female voice is selected
      if (
        name.includes('hemant') ||
        name.includes('madhur') ||
        name.includes('rishi') ||
        name.includes('male') ||
        name.includes('man') ||
        name.includes('boy') ||
        name.includes('guy') ||
        name.includes('david') ||
        name.includes('george') ||
        name.includes('mark') ||
        (v as any).gender === 'male'
      ) {
        score -= 200;
      }

      return { voice: v, score };
    });

    scoredVoices.sort((a, b) => b.score - a.score);
    return scoredVoices[0].voice;
  }

  // English: Keep the current working English voice selection exactly as it is
  const englishVoice = voices.find(
    (v) =>
      v.lang.toLowerCase() === 'en-in' ||
      v.name.toLowerCase().includes('india') ||
      v.name.toLowerCase().includes('samantha') ||
      v.name.toLowerCase().includes('google uk english female') ||
      (v.lang.toLowerCase().startsWith('en') && v.name.toLowerCase().includes('female'))
  );

  // Guarantee that an English voice is never a Hindi voice
  if (englishVoice) {
    const lang = (englishVoice.lang || '').toLowerCase();
    const name = (englishVoice.name || '').toLowerCase();
    if (lang.startsWith('hi') || name.includes('hindi') || englishVoice.name.includes('हिन्दी')) {
      return undefined;
    }
  }

  return englishVoice;
}

/**
 * Cleans text for TTS playback:
 * - Preserves Devanagari script completely
 * - Preserves Hindi punctuation (e.g. । purna viram) and sentence boundaries
 * - Preserves English technical and educational terms (e.g. Inflation, Asset)
 * - Removes markdown symbols and emojis that would otherwise be spoken aloud as awkward English labels
 * - Never transliterates Hindi into Latin letters
 */
export function cleanTiaSpeechText(text: string, isHindi: boolean): string {
  let cleaned = (text || '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[*_~#]/g, '')
    .replace(/^[•·\-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/[•·—–]/g, ' ')
    .replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{200D}\u{FE0F}📌💡🎯🎙️✨😂🧠🔥🚀☕⚡📈📉💰🏢🏠👥⭐❌✅⚠️👉👍👇]/gu,
      ''
    )
    .trim();

  // Handle sentence boundaries and natural pauses
  cleaned = cleaned.replace(/([।!?.:;])\s*\n+/g, '$1 ');
  if (isHindi) {
    cleaned = cleaned.replace(/\n+/g, '। ');
  } else {
    cleaned = cleaned.replace(/\n+/g, '. ');
  }

  cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();
  return cleaned;
}

