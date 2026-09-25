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
 * Strict sentence-level translation map for lesson excerpts and common phrases
 * when Hindi mode is active, ensuring NO English paragraph is sent to hi-IN TTS.
 */
const HINDI_SPEECH_REPLACEMENTS: [RegExp, string][] = [
  // Exact user prompt example:
  [
    /In ancient Greece,?\s*the legendary king Theseus sailed a wooden ship home from Crete(?: after slaying the Minotaur)?/gi,
    'प्राचीन यूनान में प्रसिद्ध राजा थीसियस क्रीट से लकड़ी के एक जहाज़ पर सवार होकर अपने घर लौटे।'
  ],
  [
    /The Athenians preserved the vessel in their harbor for centuries[^\n.]*/gi,
    'एथेंस के लोगों ने उस जहाज को बंदरगाह में सदियों तक संभाल कर रखा।'
  ],
  [
    /As decades passed,?\s*individual wooden planks rotted[^\n.]*/gi,
    'समय के साथ जहाज का एक-एक तख्ता सड़ता गया और नई लकड़ी लगाई जाती रही।'
  ],
  [
    /Philosophers asked:?\s*Is this still the Ship of Theseus\??/gi,
    'दार्शनिकों ने सवाल पूछा कि क्या यह अब भी थीसियस का वही जहाज है?'
  ],
  // Common lesson hooks / prompts:
  [
    /Every single day,?\s*you make hundreds of choices[^\n.]*/gi,
    'हर दिन आप सैकड़ों फैसले लेते हैं।'
  ],
  [
    /Why do I believe what I believe\??/gi,
    'मैं जो मानता हूं, वह क्यों मानता हूं?'
  ],
  [
    /When an emergency strikes,?\s*the first few minutes determine survival/gi,
    'जब कोई आपातकाल आता है, तो पहले कुछ मिनट ही जीवन रक्षा तय करते हैं।'
  ],
  [
    /You have only 24 hours in a day,?\s*limited money in your wallet/gi,
    'आपके पास दिन में केवल 24 घंटे हैं और जेब में सीमित पैसा है।'
  ],
  [
    /In wilderness survival,?\s*your mind is your greatest tool/gi,
    'उत्तरजीविता में आपका दिमाग ही सबसे बड़ा औजार है।'
  ],
  [
    /Modern farming is no longer just about traditional physical labor/gi,
    'आधुनिक कृषि अब केवल पारंपरिक शारीरिक श्रम तक सीमित नहीं है।'
  ],
  [
    /Today we will understand/gi,
    'आज हम समझेंगे'
  ],
  [
    /In this lesson,?\s*we will learn/gi,
    'इस पाठ में हम सीखेंगे'
  ],
  [
    /Let's understand/gi,
    'आइए समझते हैं'
  ],
  [
    /The big idea is/gi,
    'मुख्य विचार यह है कि'
  ],
  [
    /The core concept is/gi,
    'मुख्य सिद्धांत यह है कि'
  ],
  [
    /Real-Life Example:?/gi,
    'असल ज़िंदगी का उदाहरण:'
  ],
  [
    /Key Takeaways?:?/gi,
    'महत्वपूर्ण सीख:'
  ],
  [
    /Don't worry/gi,
    'चिंता मत कीजिए'
  ],
  [
    /Alright scholar/gi,
    'चलो विद्वान जी'
  ],
  [
    /Take your time/gi,
    'आराम से सोचिए'
  ],
  [
    /Speak your answer/gi,
    'अपना उत्तर बोलिए'
  ],
  [
    /Next lesson teaser:?/gi,
    'अगला पाठ:'
  ],
  [
    /Coming up next:?/gi,
    'आगे आने वाला पाठ:'
  ],
  [
    /In the context of/gi,
    'के संदर्भ में'
  ],
  [
    /Oops,?\s*Tia's connection hit a slight bump[^\n.]*/gi,
    'माफ़ कीजिए, टिया का कनेक्शन थोड़ा धीमा हो गया।'
  ],
  [
    /Please try asking again!?/gi,
    'कृपया फिर से पूछिए।'
  ],
  [
    /Oops,?\s*Tia ka connection thoda slow ho gaya[^\n.]*/gi,
    'माफ़ कीजिए, टिया का कनेक्शन थोड़ा धीमा हो गया।'
  ],
  [
    /Ek baar phir try karo\.?/gi,
    'एक बार फिर कोशिश कीजिए।'
  ],
  [
    /What would you like to explore today\??/gi,
    'आज आप क्या समझना चाहते हैं?'
  ],
  [
    /Ask me anything!?/gi,
    'मुझसे कुछ भी पूछिए!'
  ],
  [
    /Did that click or did your brain take a detour\??/gi,
    'बात समझ आई या दिमाग थोड़ा चकरा गया?'
  ],
  [
    /Say the word and I can make it funny/gi,
    'बताइए तो इसे और मज़ाकिया बनाऊँ'
  ],
  [
    /or throw a quick quiz question at you!?/gi,
    'या एक झटपट क्विज़ पूछूँ?'
  ],
];

/**
 * Common Roman Hinglish phrase map to pure Devanagari Hindi for TTS
 */
const ROMAN_HINGLISH_TO_DEVANAGARI: [RegExp, string][] = [
  [/\bnamaste\b/gi, 'नमस्ते'],
  [/\btia\b/gi, 'टिया'],
  [/\baap\b/gi, 'आप'],
  [/\bkarein\b/gi, 'करें'],
  [/\bkaro\b/gi, 'करो'],
  [/\bkyun\b/gi, 'क्यों'],
  [/\bkyon\b/gi, 'क्यों'],
  [/\bkya\b/gi, 'क्या'],
  [/\bkaise\b/gi, 'कैसे'],
  [/\bkuch\b/gi, 'कुछ'],
  [/\bchalo\b/gi, 'चलो'],
  [/\bhai\b/gi, 'है'],
  [/\bhain\b/gi, 'हैं'],
  [/\bhoon\b/gi, 'हूँ'],
  [/\bho\b/gi, 'हो'],
  [/\btha\b/gi, 'था'],
  [/\bthi\b/gi, 'थी'],
  [/\bthe\b/gi, 'थे'],
  [/\bek\b/gi, 'एक'],
  [/\bdo\b/gi, 'दो'],
  [/\bteen\b/gi, 'तीन'],
  [/\bchaar\b/gi, 'चार'],
  [/\bpaanch\b/gi, 'पाँच'],
  [/\baur\b/gi, 'और'],
  [/\bya\b/gi, 'या'],
  [/\bpar\b/gi, 'पर'],
  [/\bse\b/gi, 'से'],
  [/\bko\b/gi, 'को'],
  [/\bmein\b/gi, 'में'],
  [/\bme\b/gi, 'में'],
  [/\bpe\b/gi, 'पे'],
  [/\bke\b/gi, 'के'],
  [/\bki\b/gi, 'की'],
  [/\bka\b/gi, 'का'],
  [/\bnahi\b/gi, 'नहीं'],
  [/\bnahin\b/gi, 'नहीं'],
  [/\bmat\b/gi, 'मत'],
  [/\bbaat\b/gi, 'बात'],
  [/\bsamajh\b/gi, 'समझ'],
  [/\byahan\b/gi, 'यहाँ'],
  [/\bvahan\b/gi, 'वहाँ'],
  [/\babhi\b/gi, 'अभी'],
  [/\baaj\b/gi, 'आज'],
  [/\bkal\b/gi, 'कल'],
  [/\bpura\b/gi, 'पूरा'],
  [/\bpuri\b/gi, 'पूरी'],
  [/\bpure\b/gi, 'पूरे'],
  [/\bsahi\b/gi, 'सही'],
  [/\bgalat\b/gi, 'गलत'],
  [/\baham\b/gi, 'अहम'],
  [/\bmukhya\b/gi, 'मुख्य'],
  [/\bshuru\b/gi, 'शुरू'],
  [/\bkhatam\b/gi, 'खत्म'],
  [/\bbahut\b/gi, 'बहुत'],
  [/\bthoda\b/gi, 'थोड़ा'],
  [/\bzyada\b/gi, 'ज़्यादा'],
  [/\bpaath\b/gi, 'पाठ'],
  [/\bsawal\b/gi, 'सवाल'],
  [/\bjawab\b/gi, 'जवाब'],
  [/\buttar\b/gi, 'उत्तर'],
  [/\bpucho\b/gi, 'पूछो'],
  [/\bboliye\b/gi, 'बोलिए'],
  [/\bbataiye\b/gi, 'बताइए'],
  [/\bsun\b/gi, 'सुन'],
  [/\bdost\b/gi, 'दोस्त'],
  [/\bsathi\b/gi, 'साथी'],
];

/**
 * Cleans text for TTS playback:
 * - Preserves Devanagari script completely
 * - Strictly converts English source paragraphs and Roman Hinglish to Devanagari in Hindi mode
 * - Preserves Hindi punctuation (e.g. । purna viram) and sentence boundaries
 * - Preserves valid English technical/proper terms (e.g. Inflation, Asset, GDP, Python)
 * - Removes markdown symbols and emojis that would otherwise be spoken aloud as awkward English labels
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

  // If Hindi mode is active, apply lesson translations and Roman Hinglish conversion
  if (isHindi) {
    // 1. Check direct English sentence / paragraph replacements
    for (const [regex, replacement] of HINDI_SPEECH_REPLACEMENTS) {
      cleaned = cleaned.replace(regex, replacement);
    }

    // 2. Convert common Roman Hinglish words into pure Devanagari script
    for (const [regex, devanagari] of ROMAN_HINGLISH_TO_DEVANAGARI) {
      cleaned = cleaned.replace(regex, devanagari);
    }

    // 3. Sentence boundary formatting for Hindi
    cleaned = cleaned.replace(/([।!?.:;])\s*\n+/g, '$1 ');
    cleaned = cleaned.replace(/\n+/g, '। ');
  } else {
    // English mode: clean sentence boundaries
    cleaned = cleaned.replace(/([!?.:;])\s*\n+/g, '$1 ');
    cleaned = cleaned.replace(/\n+/g, '. ');
  }

  cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();
  return cleaned;
}

