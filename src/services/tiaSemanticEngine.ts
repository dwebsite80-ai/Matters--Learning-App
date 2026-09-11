import { AppLanguage, TiaLessonContext, TiaMessage, Lesson } from '../types';
import { DynamicCourseScope, getCourseScope } from './tiaCourseRegistry';
import { ALL_SUBJECTS, ALL_LESSONS, getLessonById } from '../data/initialContent';
import { cleanTiaSpeechText } from './tiaLanguageConfig';

export type UserIntentType =
  | 'NET_WORTH_VALUATION'
  | 'REVENUE_MODEL'
  | 'BUSINESS_MODEL'
  | 'FOUNDERS'
  | 'EARLY_CHALLENGES'
  | 'GROWTH_TRACTION'
  | 'DISADVANTAGES_RISKS'
  | 'DEFINITION_CONCEPT'
  | 'WHY_IT_HAPPENS'
  | 'HOW_TO_IMPROVE'
  | 'PRACTICAL_EXAMPLE'
  | 'FUNNY_EXPLANATION'
  | 'QUIZ'
  | 'GREETING'
  | 'GENERAL';

export interface ClassificationResult {
  category: 'EXACT_LESSON' | 'COURSE_RELATED' | 'OUT_OF_SCOPE' | 'GREETING';
  intent: string;
  intentType: UserIntentType;
  resolvedConcept: string;
  course: DynamicCourseScope;
  isFunnyRequest: boolean;
  isExampleRequest: boolean;
  isWhyRequest: boolean;
  isQuizRequest: boolean;
  targetLesson?: Lesson;
}

export interface KnowledgeResponseResult {
  text: string;
  displayText: string;
  speechText: string;
  quickActions: string[];
}

/**
 * Universal out-of-scope topics that NEVER belong to ANY study course
 */
const UNIVERSAL_OUT_OF_SCOPE_WORDS = [
  'ipl',
  'cricket',
  'virat kohli',
  'rohit sharma',
  'dhoni',
  'bollywood',
  'shahrukh',
  'salman',
  'movie',
  'film',
  'weather',
  'mausam',
  'recipe',
  'khana',
  'biryani',
  'astrology',
  'horoscope',
  'kundli',
  'rashi',
  'election result',
  'politician',
  'modi speech',
  'whatsapp status',
  'shayari',
  'love story',
  'pubg',
  'free fire',
];

/**
 * Normalizes input string for reliable keyword matching
 */
export function normalizeText(text: string): string {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/[?.,!/\\;:'"()]/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Detects the specific intent/sub-aspect of the user's question
 */
export function detectUserIntent(norm: string): UserIntentType {
  // 1. Net worth / Valuation / Market Cap
  if (
    /\b(net\s*worth|networth|valuation|market\s*cap|market\s*capitalization|kimat|worth|financial\s*worth|kitne\s*ki\s*company|kitna\s*paisa\s*hai|shares?\s*value|दौलत|संपत्ति|वैल्यू|मूल्य|नेटवर्थ)\b/i.test(
      norm
    )
  ) {
    return 'NET_WORTH_VALUATION';
  }

  // 2. Revenue Model / How does it make money
  if (
    /\b(paise\s*kaise\s*kamata|paisa\s*kaise\s*kamati|paise\s*kaise\s*kamate|how\s*does\s*it\s*make\s*money|how\s*it\s*makes\s*money|revenue\s*model|monetization|commission|kamai\s*kaise|fees?\s*kitni|service\s*fee|कमाई|कमीशन|रेवेन्यू)\b/i.test(
      norm
    )
  ) {
    return 'REVENUE_MODEL';
  }

  // 3. Founders / Who started it
  if (
    /\b(founder|founders|kisne\s*banaya|kisne\s*start\s*kiya|who\s*started|who\s*founded|brian\s*chesky|joe\s*gebbia|nathan\s*blecharczyk|ceo\s*kaun|owner\s*kaun|संस्थापक|मालिक)\b/i.test(
      norm
    )
  ) {
    return 'FOUNDERS';
  }

  // 4. Early Challenges / Initial struggles / Obama O's
  if (
    /\b(problem\s*aayi|start\s*karne\s*me\s*kya\s*problem|shuruat\s*me\s*kya\s*dikkat|challenges|obstacles|struggle|struggles|initial\s*problem|rejections?|obama\s*o|कठिनाई|मुश्किल|शुरुआती\s*दिक्कत|चुनौती)\b/i.test(
      norm
    )
  ) {
    return 'EARLY_CHALLENGES';
  }

  // 5. Growth / Traction / Scaling
  if (
    /\b(kaise\s*grow\s*kiya|initial\s*growth|traction|craigslist|photography|scaling|scale\s*kaise|बढ़ावा|ग्रोथ|grow\s*kaise)\b/i.test(
      norm
    )
  ) {
    return 'GROWTH_TRACTION';
  }

  // 6. Disadvantages / Risks / Challenges
  if (
    /\b(disadvantage|disadvantages|challenges|nuksan|khatre|risks?|drawback|drawbacks|limitations?|regulations?|नुकसान|खामियां|कमियां)\b/i.test(
      norm
    )
  ) {
    return 'DISADVANTAGES_RISKS';
  }

  // 7. Business Model (General architecture)
  if (
    /\b(business\s*model|बिज़नेस\s*मॉडल|बिजनेस\s*मॉडल|model\s*kya\s*hai|two\s*sided\s*marketplace|asset\s*light|kaise\s*kaam\s*karta|platform\s*model|architecture)\b/i.test(
      norm
    )
  ) {
    return 'BUSINESS_MODEL';
  }

  // 8. Why / Causes
  if (
    /\b(why|kyu|kyun|kyu\s*hota|kyun\s*hota|reasons?|causes?|क्यों|कारण|वजह)\b/i.test(
      norm
    )
  ) {
    return 'WHY_IT_HAPPENS';
  }

  // 9. How to improve / Actionable advice
  if (
    /\b(kaise\s*improve\s*karu|kaise\s*badhaye|how\s*to\s*improve|kaise\s*kare|how\s*to\s*overcome|behtar\s*kaise|सुधार\s*कैसे)\b/i.test(
      norm
    )
  ) {
    return 'HOW_TO_IMPROVE';
  }

  // 10. Quiz request
  if (/\b(quiz|test|question\s*pucho|सवाल\s*पूछो|क्विज़)\b/i.test(norm)) {
    return 'QUIZ';
  }

  // 11. Funny explanation request
  if (/\b(funny|मज़ाक|मजाक|comedy|hasao|roast)\b/i.test(norm)) {
    return 'FUNNY_EXPLANATION';
  }

  // 12. Practical example request
  if (/\b(example|उदाहरण|मिसाल|scenario|sample)\b/i.test(norm)) {
    return 'PRACTICAL_EXAMPLE';
  }

  // 13. Definition / What is
  if (
    /\b(kya\s*hota\s*hai|kya\s*hai|what\s*is|define|meaning|matlab|अर्थ|परिभाषा)\b/i.test(
      norm
    )
  ) {
    return 'DEFINITION_CONCEPT';
  }

  return 'GENERAL';
}

/**
 * Classifies a user question against the DYNAMIC course and lesson hierarchy.
 */
export function classifyUserQuestion(
  userText: string,
  context?: TiaLessonContext
): ClassificationResult {
  const norm = normalizeText(userText);
  const course = getCourseScope(context?.subjectId, context);

  // Mode & request modifiers
  const isFunnyRequest =
    norm.includes('funny') ||
    norm.includes('मज़ाक') ||
    norm.includes('comedy') ||
    norm.includes('roast');
  const isExampleRequest =
    norm.includes('example') || norm.includes('उदाहरण') || norm.includes('मिसाल');
  const isWhyRequest =
    norm.includes('why') ||
    norm.includes('kyu') ||
    norm.includes('kyun') ||
    norm.includes('क्यों') ||
    norm.includes('reason');
  const isQuizRequest =
    norm.includes('quiz') ||
    norm.includes('test') ||
    norm.includes('सवाल पूछो') ||
    norm.includes('क्विज़');

  const intentType = detectUserIntent(norm);

  // STEP 1 - Check Greetings
  const isGreeting =
    /^(hi|hello|hey|namaste|नमस्ते|सुप्रभात|good morning|good evening|pranam)\b/i.test(
      norm
    ) && norm.split(' ').length <= 4;

  if (isGreeting) {
    return {
      category: 'GREETING',
      intent: 'Greeting to Tia',
      intentType: 'GREETING',
      resolvedConcept: 'greeting',
      course,
      isFunnyRequest: false,
      isExampleRequest: false,
      isWhyRequest: false,
      isQuizRequest: false,
    };
  }

  // STEP 2 - Universal Out-of-Scope check
  const isUniversalOutOfScope = UNIVERSAL_OUT_OF_SCOPE_WORDS.some((kw) => {
    const regex = new RegExp(`\\b${kw}\\b`, 'i');
    return regex.test(norm);
  });

  if (isUniversalOutOfScope) {
    return {
      category: 'OUT_OF_SCOPE',
      intent: `Universal out of scope for ${course.name}`,
      intentType: 'GENERAL',
      resolvedConcept: 'out_of_scope',
      course,
      isFunnyRequest,
      isExampleRequest,
      isWhyRequest,
      isQuizRequest,
    };
  }

  // STEP 3 - Entity Detection & Resolution within Course
  const activeLessonTitle = (context?.lessonTitle || '').toLowerCase();
  let entity = '';

  if (norm.includes('airbnb')) {
    entity = 'airbnb';
  } else if (norm.includes('zerodha')) {
    entity = 'zerodha';
  } else if (norm.includes('amul')) {
    entity = 'amul';
  } else if (norm.includes('canva')) {
    entity = 'canva';
  } else if (norm.includes('oyo')) {
    entity = 'oyo';
  } else if (activeLessonTitle.includes('airbnb')) {
    // Current lesson is Airbnb, antecedent resolved to Airbnb
    entity = 'airbnb';
  } else if (activeLessonTitle.includes('zerodha')) {
    entity = 'zerodha';
  } else if (activeLessonTitle.includes('amul')) {
    entity = 'amul';
  } else if (activeLessonTitle.includes('canva')) {
    entity = 'canva';
  } else if (activeLessonTitle.includes('oyo')) {
    entity = 'oyo';
  }

  // If entity is Airbnb (or lesson is Airbnb):
  if (entity === 'airbnb') {
    let resolvedConcept = 'airbnb_business_model';
    if (intentType === 'NET_WORTH_VALUATION') {
      resolvedConcept = 'airbnb_networth';
    } else if (intentType === 'REVENUE_MODEL') {
      resolvedConcept = 'airbnb_revenue';
    } else if (intentType === 'FOUNDERS') {
      resolvedConcept = 'airbnb_founders';
    } else if (intentType === 'EARLY_CHALLENGES') {
      resolvedConcept = 'airbnb_challenges';
    } else if (intentType === 'GROWTH_TRACTION') {
      resolvedConcept = 'airbnb_growth';
    } else if (intentType === 'DISADVANTAGES_RISKS') {
      resolvedConcept = 'airbnb_disadvantages';
    }

    return {
      category: 'EXACT_LESSON',
      intent: `Airbnb inquiry: ${intentType}`,
      intentType,
      resolvedConcept,
      course,
      isFunnyRequest,
      isExampleRequest,
      isWhyRequest,
      isQuizRequest,
    };
  }

  // If entity is Zerodha:
  if (entity === 'zerodha') {
    let resolvedConcept = 'zerodha_business_model';
    if (intentType === 'NET_WORTH_VALUATION') {
      resolvedConcept = 'zerodha_networth';
    } else if (intentType === 'REVENUE_MODEL') {
      resolvedConcept = 'zerodha_revenue';
    } else if (intentType === 'FOUNDERS') {
      resolvedConcept = 'zerodha_founders';
    } else if (intentType === 'EARLY_CHALLENGES') {
      resolvedConcept = 'zerodha_challenges';
    }

    return {
      category: 'EXACT_LESSON',
      intent: `Zerodha inquiry: ${intentType}`,
      intentType,
      resolvedConcept,
      course,
      isFunnyRequest,
      isExampleRequest,
      isWhyRequest,
      isQuizRequest,
    };
  }

  // General Case Studies Concepts
  if (course.id === 'case-studies') {
    if (norm.includes('business model')) {
      return {
        category: 'COURSE_RELATED',
        intent: 'Business model definition',
        intentType: 'BUSINESS_MODEL',
        resolvedConcept: 'business_model',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
    if (norm.includes('case study') || norm.includes('purpose kya')) {
      return {
        category: 'COURSE_RELATED',
        intent: 'Case study purpose',
        intentType: 'DEFINITION_CONCEPT',
        resolvedConcept: 'case_study_purpose',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
    if (norm.includes('competitive advantage') || norm.includes('moat')) {
      return {
        category: 'COURSE_RELATED',
        intent: 'Competitive advantage / moat',
        intentType: 'DEFINITION_CONCEPT',
        resolvedConcept: 'competitive_advantage',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
  }

  // Economics Concepts
  if (course.id === 'economics') {
    if (
      norm.includes('mehngai') ||
      norm.includes('inflation') ||
      norm.includes('cpi') ||
      norm.includes('मुद्रास्फीति')
    ) {
      return {
        category: 'EXACT_LESSON',
        intent: 'Inflation explanation',
        intentType: 'DEFINITION_CONCEPT',
        resolvedConcept: 'inflation',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
    if (norm.includes('gdp') || norm.includes('national income') || norm.includes('सकल घरेलू उत्पाद')) {
      return {
        category: 'EXACT_LESSON',
        intent: 'GDP explanation',
        intentType: 'DEFINITION_CONCEPT',
        resolvedConcept: 'gdp',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
    if (norm.includes('monetary policy') || norm.includes('rbi') || norm.includes('repo')) {
      return {
        category: 'COURSE_RELATED',
        intent: 'Monetary policy',
        intentType: 'DEFINITION_CONCEPT',
        resolvedConcept: 'monetary_policy',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
    if (norm.includes('demand') || norm.includes('supply') || norm.includes('मांग')) {
      return {
        category: 'COURSE_RELATED',
        intent: 'Demand and supply',
        intentType: 'DEFINITION_CONCEPT',
        resolvedConcept: 'demand_supply',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
  }

  // Personality Development Concepts
  if (course.id === 'personality-development') {
    if (norm.includes('confidence') || norm.includes('आत्मविश्वास') || norm.includes('dar')) {
      return {
        category: 'EXACT_LESSON',
        intent: 'Confidence improvement',
        intentType: 'HOW_TO_IMPROVE',
        resolvedConcept: 'confidence',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
    if (norm.includes('body language') || norm.includes('posture') || norm.includes('eye contact')) {
      return {
        category: 'COURSE_RELATED',
        intent: 'Body language tips',
        intentType: 'HOW_TO_IMPROVE',
        resolvedConcept: 'body_language',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
    if (norm.includes('stage fear') || norm.includes('public speaking') || norm.includes('भाषण')) {
      return {
        category: 'COURSE_RELATED',
        intent: 'Overcoming stage fear',
        intentType: 'HOW_TO_IMPROVE',
        resolvedConcept: 'stage_fear',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
  }

  // Dressing Sense Concepts
  if (course.id === 'dressing-sense') {
    if (norm.includes('interview') || norm.includes('formal') || norm.includes('office')) {
      return {
        category: 'EXACT_LESSON',
        intent: 'Interview formal dressing',
        intentType: 'HOW_TO_IMPROVE',
        resolvedConcept: 'dressing_interview',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
    if (norm.includes('color') || norm.includes('contrast') || norm.includes('रंग')) {
      return {
        category: 'COURSE_RELATED',
        intent: 'Color coordination in dressing',
        intentType: 'HOW_TO_IMPROVE',
        resolvedConcept: 'color_coordination',
        course,
        isFunnyRequest,
        isExampleRequest,
        isWhyRequest,
        isQuizRequest,
      };
    }
  }

  // Generic keyword match against course allowed keywords
  const matchesKeyword = course.allowedKeywords.some((kw) => {
    const regex = new RegExp(`\\b${kw}\\b`, 'i');
    return regex.test(norm);
  });

  if (matchesKeyword) {
    return {
      category: 'COURSE_RELATED',
      intent: `General course inquiry in ${course.name}`,
      intentType,
      resolvedConcept: 'general_course_concept',
      course,
      isFunnyRequest,
      isExampleRequest,
      isWhyRequest,
      isQuizRequest,
    };
  }

  // Out of Scope for current course
  return {
    category: 'OUT_OF_SCOPE',
    intent: `Out of scope for ${course.name}`,
    intentType: 'GENERAL',
    resolvedConcept: 'out_of_scope',
    course,
    isFunnyRequest,
    isExampleRequest,
    isWhyRequest,
    isQuizRequest,
  };
}

/**
 * Curated knowledge base for core courses adhering strictly to:
 * 1. Direct answer to the user's specific question
 * 2. Separate displayText (for UI) and speechText (in pure Devanagari Hindi for TTS)
 * 3. Simple, non-jargon explanation
 * 4. Real-world example
 * 5. Tasteful, witty humor
 */
export interface KnowledgeEntry {
  displayText: { hi: string; en: string };
  speechText: { hi: string; en: string };
  whyItHappens?: {
    displayText: { hi: string; en: string };
    speechText: { hi: string; en: string };
  };
  disadvantages?: {
    displayText: { hi: string; en: string };
    speechText: { hi: string; en: string };
  };
  growth?: {
    displayText: { hi: string; en: string };
    speechText: { hi: string; en: string };
  };
  quickActions: { hi: string[]; en: string[] };
}

const MULTI_COURSE_KNOWLEDGE_BASE: Record<string, KnowledgeEntry> = {
  // CASE STUDIES: AIRBNB NET WORTH / VALUATION
  airbnb_networth: {
    displayText: {
      hi: `Airbnb की वित्तीय स्थिति और Net Worth को दो मुख्य हिस्सों में समझना सबसे सही तरीका है:

1. **Market Capitalization (कंपनी की कुल बाज़ार वैल्यू)**: NASDAQ पर लिस्टेड Airbnb (ABNB) का पब्लिक मार्केट कैप आमतौर पर **$80 से $90+ बिलियन डॉलर** (लगभग ₹6.5 से ₹7.5 लाख करोड़ रुपये) के आसपास रहता है।
2. **Co-Founders की Personal Net Worth**: इसके तीनों संस्थापकों—Brian Chesky, Joe Gebbia, और Nathan Blecharczyk—में से प्रत्येक की व्यक्तिगत संपत्ति लगभग **$8 से $10 बिलियन डॉलर** आंकी जाती है, जो मुख्यतः उनके Airbnb शेयरों पर आधारित है।

📌 **मुख्य बिंदु**: कंपनी की कुल मार्केट कैपिटलाइज़ेशन और संस्थापकों की निजी नेट वर्थ दो अलग बातें हैं। शेयर बाज़ार के उतार-चढ़ाव के साथ यह आंकड़ा दैनिक रूप से बदलता रहता है!`,
      en: `To understand Airbnb's financial worth, it's essential to distinguish between overall company valuation and founder wealth:

1. **Market Capitalization (Company Worth)**: Publicly traded on NASDAQ (ABNB), Airbnb's market cap currently trades around **$80 Billion to $90+ Billion USD** (roughly ₹6.5 to ₹7.5 Trillion INR).
2. **Co-Founders' Net Worth**: The three co-founders—Brian Chesky, Joe Gebbia, and Nathan Blecharczyk—each hold an estimated personal net worth of roughly **$8 Billion to $10 Billion USD**, tied to their equity.

💡 **Key Takeaway**: Company market capitalization reflects total share value on public markets, whereas founder wealth represents individual holdings, both fluctuating daily with trading.`,
    },
    speechText: {
      hi: `Airbnb की नेटवर्थ को समझने के लिए कंपनी के मार्केट कैपिटलाइज़ेशन और संस्थापकों की व्यक्तिगत संपत्ति में अंतर जानना ज़रूरी है। Airbnb का कुल मार्केट कैप लगभग 80 से 90 बिलियन डॉलर यानी करीब 7 लाख करोड़ रुपये के आसपास रहता है। वहीं इसके तीनों को-फाउंडर्स Brian Chesky, Joe Gebbia और Nathan Blecharczyk में से प्रत्येक की व्यक्तिगत नेटवर्थ लगभग 8 से 10 बिलियन डॉलर है। शेयर बाज़ार के दैनिक भाव के अनुसार इसमें बदलाव होता रहता है।`,
      en: `To understand Airbnb's net worth, we look at both market capitalization and founder wealth. Airbnb's public market cap is approximately 80 to 90 billion dollars. Meanwhile, its three co-founders, Brian Chesky, Joe Gebbia, and Nathan Blecharczyk, each hold an estimated personal net worth of 8 to 10 billion dollars.`,
    },
    quickActions: {
      hi: [
        'Airbnb पैसे कैसे कमाता है?',
        'Airbnb का फाउंडर कौन है?',
        'Airbnb को शुरुआत में क्या दिक्कत आई?',
        '🎯 क्विज़ पूछो',
      ],
      en: [
        'How does Airbnb make money?',
        'Who founded Airbnb?',
        'What were Airbnb early challenges?',
        '🎯 Quiz me',
      ],
    },
  },

  // CASE STUDIES: AIRBNB REVENUE MODEL
  airbnb_revenue: {
    displayText: {
      hi: `Airbnb का मुख्य Revenue Model दो-तरफा सर्विस फीस और कमीशन पर काम करता है:

1. **Guest Service Fee (12% - 14.2%)**: जब कोई यात्री कमरा बुक करता है, तो Airbnb कुल बुकिंग राशि पर सर्विस फीस जोड़ता है।
2. **Host Processing Fee (~3%)**: जब बुकिंग पूरी होती है, तो Airbnb मेज़बान (Host) से भुगतान प्रोसेसिंग के लिए लगभग 3% काटता है।
3. **Experiences & Tours**: स्थानीय एक्टिविटीज़ और टूरिस्ट अनुभवों पर भी 20% तक कमीशन कमाता है।

मज़ेदार बात यह है कि Airbnb के पास खुद का एक भी होटल कमरा नहीं है, फिर भी वह हर रात लाखों बुकिंग्स से भारी कमीशन कमाता है! 😂`,
      en: `Airbnb generates revenue through a two-sided transaction fee model on every stay:

1. **Guest Service Fee (12% - 14.2%)**: Added to the reservation subtotal paid by the traveler.
2. **Host Commission (~3%)**: Automatically deducted from host payouts to cover payment processing.
3. **Airbnb Experiences**: Takes up to 20% commission on booked local tours and guided activities.

Fascinatingly, Airbnb owns zero real estate, yet captures huge cash flow simply by facilitating transactions! 😂`,
    },
    speechText: {
      hi: `Airbnb का मुख्य रेवेन्यू मॉडल दो-तरफा सर्विस फीस और कमीशन पर आधारित है। Airbnb मेहमानों से बुकिंग राशि पर लगभग 12 से 14 प्रतिशत सर्विस फीस लेता है, और मेज़बानों से लगभग 3 प्रतिशत प्रोसेसिंग फीस लेता है। बिना किसी होटल का मालिक बने, Airbnb सिर्फ इस प्लेटफॉर्म फीस से भारी कमाई करता है।`,
      en: `Airbnb makes money by charging transaction fees on both sides of every booking. It charges guests a 12 to 14 percent service fee and deducts around 3 percent from host payouts. Without owning any hotels, it generates massive revenue through platform commissions.`,
    },
    quickActions: {
      hi: [
        'Airbnb की नेटवर्थ कितनी है?',
        'Airbnb का बिज़नेस मॉडल क्या है?',
        'इसके नुकसान क्या हैं?',
        '🎯 क्विज़ पूछो',
      ],
      en: [
        'What is Airbnb net worth?',
        'Explain Airbnb business model',
        'What are the disadvantages?',
        '🎯 Quiz me',
      ],
    },
  },

  // CASE STUDIES: AIRBNB BUSINESS MODEL
  airbnb_business_model: {
    displayText: {
      hi: `Airbnb का बिज़नेस मॉडल एक **Asset-Light Two-Sided Marketplace** है:

1. **दो तरफ के यूज़र्स**: एक तरफ Hosts (जिनके पास खाली कमरे हैं) और दूसरी तरफ Guests (जिन्हें रहने के लिए जगह चाहिए)।
2. **बिना प्रॉपर्टी का मालिक बने कमाई**: मैरियट या ताज की तरह होटल की ज़मीन और इमारत खरीदे बिना यह सिर्फ एक डिजिटल प्लेटफॉर्म उपलब्ध कराता है।
3. **Trust & Escrow Platform**: आईडी वेरिफिकेशन, दोनों तरफ के रिव्यूज़, और एस्क्रो भुगतान (चेक-इन के 24 घंटे बाद होस्ट को पैसे ट्रांसफर) से अजनबियों के बीच गहरा भरोसा कायम होता है।`,
      en: `Airbnb operates on an **Asset-Light Two-Sided Marketplace** business model:

1. **Two-Sided Platform**: Connects homeowners who have excess room space with travelers looking for authentic, affordable stays.
2. **Zero Real Estate Ownership**: Unlike traditional hotel chains that spend billions constructing buildings, Airbnb purely maintains software and customer trust.
3. **Trust Architecture**: Two-way verified reviews, photo ID screening, and escrow payments (releasing funds 24 hours after check-in) solve the core trust barrier.`,
    },
    speechText: {
      hi: `Airbnb का बिज़नेस मॉडल एक एसेट-लाइट टू-साइडेड मार्केटप्लेस है। Airbnb खुद कोई होटल बिल्डिंग नहीं खरीदता। यह उन लोगों को जोड़ता है जिनके पास खाली कमरे हैं और उन यात्रियों को जिन्हें ठहरने की जगह चाहिए। दोनों तरफ के रिव्यूज़ और एस्क्रो पेमेंट के ज़रिए यह अनजान लोगों के बीच भरोसा बनाता है।`,
      en: `Airbnb operates an asset-light, two-sided marketplace. Instead of owning real estate, it connects homeowners who have spare rooms with travelers looking for stays. It builds trust between strangers using two-way reviews, identity verification, and escrow payments.`,
    },
    quickActions: {
      hi: [
        'Airbnb की नेटवर्थ कितनी है?',
        'Airbnb पैसे कैसे कमाता है?',
        'Airbnb के नुकसान क्या हैं?',
        '🎯 क्विज़ पूछो',
      ],
      en: [
        'What is Airbnb net worth?',
        'How does Airbnb make money?',
        'What are the disadvantages?',
        '🎯 Quiz me',
      ],
    },
  },

  // CASE STUDIES: AIRBNB FOUNDERS
  airbnb_founders: {
    displayText: {
      hi: `Airbnb की शुरुआत साल **2008** में सैन फ्रांसिस्को में तीन दोस्तों ने की थी:

1. **Brian Chesky** (वर्तमान CEO)
2. **Joe Gebbia**
3. **Nathan Blecharczyk** (Chief Strategy Officer)

दिलचस्प कहानी: 2007 में ब्रायन चेस्की और जो गेबिया के पास सैन फ्रांसिस्को में अपने फ्लैट का किराया देने के पैसे नहीं थे। जब शहर में एक डिज़ाइन कॉन्फ्रेंस के दौरान सारे होटल भर गए, तो उन्होंने अपने लिविंग रूम में 3 एयर गद्दे (Air Mattresses) बिछाए और मेहमानों को ब्रेकफास्ट दिया। यहीं से नाम पड़ा: **AirBed & Breakfast** यानी Airbnb! 😂`,
      en: `Airbnb was founded in **2008** in San Francisco by three founders:

1. **Brian Chesky** (Current CEO)
2. **Joe Gebbia**
3. **Nathan Blecharczyk** (Chief Strategy Officer)

Origin story: In late 2007, Chesky and Gebbia couldn't afford their apartment rent. When a major industrial design conference booked up all local hotels, they inflated 3 air mattresses in their living room and offered guests pop-tart breakfasts—calling it **'AirBed & Breakfast'**! 😂`,
    },
    speechText: {
      hi: `Airbnb की शुरुआत साल 2008 में सैन फ्रांसिस्को में तीन दोस्तों—Brian Chesky, Joe Gebbia और Nathan Blecharczyk ने मिलकर की थी। Brian Chesky आज भी इस कंपनी के सीईओ हैं। 2007 में अपने फ्लैट का किराया देने के लिए उन्होंने अपने लिविंग रूम में एयर गद्दे बिछाए थे, जहाँ से AirBed and Breakfast का जन्म हुआ।`,
      en: `Airbnb was founded in 2008 by Brian Chesky, Joe Gebbia, and Nathan Blecharczyk. Brian Chesky currently serves as CEO. The idea started in 2007 when they rented out air mattresses in their living room to pay their rent during a sold-out conference.`,
    },
    quickActions: {
      hi: [
        'Airbnb की नेटवर्थ कितनी है?',
        'Airbnb को शुरुआत में क्या दिक्कत आई?',
        'Airbnb पैसे कैसे कमाता है?',
        '🎯 क्विज़ पूछो',
      ],
      en: [
        'What is Airbnb net worth?',
        'What were Airbnb early challenges?',
        'How does Airbnb make money?',
        '🎯 Quiz me',
      ],
    },
  },

  // CASE STUDIES: AIRBNB EARLY CHALLENGES
  airbnb_challenges: {
    displayText: {
      hi: `Airbnb को शुरुआत में बेहद कठिन चुनौतियों और लगातार अस्वीकृतियों (Rejections) का सामना करना पड़ा:

1. **किराए के लाले और क्रेडिट कार्ड कर्ज़**: संस्थापकों के पास पैसे खत्म हो गए थे और वे हज़ारों डॉलर के क्रेडिट कार्ड कर्ज़ में डूब चुके थे।
2. **इन्वेस्टर्स का मज़ाक उड़ाना**: 2008 में सिलिकॉन वैली के बड़े-बड़े वीसी (Venture Capitalists) ने उन्हें यह कहकर मना कर दिया: 'अजनबियों के घर में ज़मीन पर गद्दे पर कौन सोएगा? यह पागलपन है!'
3. **खाली लिस्टिंग्स (Chicken & Egg Problem)**: जब तक गेस्ट नहीं थे, होस्ट नहीं आते थे; और जब तक होस्ट नहीं थे, गेस्ट नहीं मिलते थे।
4. **अनाज के डिब्बे बेचकर गुज़ारा (Obama O's)**: 2008 के अमेरिकी चुनाव के दौरान कंपनी को दिवालिया होने से बचाने के लिए उन्होंने 'Obama O's' और 'Cap'n McCain's' नाम के नाश्ते के अनाज के डिब्बे $40 प्रति डिब्बा बेचकर $30,000 जुटाए थे! 😂

सीख: महान कंपनियाँ बिना थके मुश्किलों से लड़कर ही बनती हैं!`,
      en: `Airbnb faced brutal early challenges and relentless rejections before breaking through:

1. **Massive Credit Card Debt**: The founders were completely broke, racking up tens of thousands of dollars in personal credit card debt.
2. **Silicon Valley VC Rejections**: Top investors rejected them, arguing: 'Who in their right mind would sleep on an air mattress in a stranger's house? That sounds dangerous and absurd!'
3. **The Chicken-or-Egg Marketplace Dilemma**: Without guests, hosts wouldn't list homes; without homes, guests wouldn't visit.
4. **Selling Breakfast Cereal to Survive (Obama O's)**: During the 2008 election, they hand-glued 1,000 boxes of political cereal ('Obama O's' and 'Cap'n McCains') selling them at $40 a box to raise $30,000 to keep the company alive! 😂

Lesson: Hustle and persistence matter when nobody believes in your vision!`,
    },
    speechText: {
      hi: `Airbnb को शुरुआत में बहुत बड़ी चुनौतियों का सामना करना पड़ा। सैन फ्रांसिस्को में अपने अपार्टमेंट का किराया देने के पैसे नहीं थे और संस्थापकों पर क्रेडिट कार्ड का भारी कर्ज़ हो गया था। उस समय निवेशकों ने यह कहकर मना कर दिया कि अजनबियों के घरों में गद्दों पर कोई नहीं सोएगा। खर्च चलाने के लिए संस्थापकों ने ओबामा ओज़ नाम के नाश्ते के डिब्बे बेचकर तीस हज़ार डॉलर जुटाए थे।`,
      en: `Airbnb faced extreme early hurdles. The founders were drowning in credit card debt and multiple prominent venture capitalists rejected them, calling the idea crazy. To survive bankruptcy in 2008, they famously designed and sold custom Obama O's cereal boxes to raise thirty thousand dollars in emergency funding.`,
    },
    quickActions: {
      hi: [
        'Airbnb ने शुरुआत में कैसे ग्रो किया?',
        'Airbnb की नेटवर्थ कितनी है?',
        'Airbnb पैसे कैसे कमाता है?',
        '🎯 क्विज़ पूछो',
      ],
      en: [
        'How did Airbnb grow early on?',
        'What is Airbnb net worth?',
        'How does Airbnb make money?',
        '🎯 Quiz me',
      ],
    },
  },

  // CASE STUDIES: AIRBNB GROWTH & TRACTION
  airbnb_growth: {
    displayText: {
      hi: `Airbnb की शुरुआती ग्रोथ का सबसे बड़ा रहस्य था: **'Do things that don't scale'** (पॉल ग्राहम की प्रसिद्ध सलाह):

1. **घर-घर जाकर पेशेवर फोटोग्राफी**: 2009 में जब बुकिंग्स ठप थीं, संस्थापक खुद न्यूयॉर्क गए और हर होस्ट के घर जाकर मुफ्त में हाई-क्वालिटी डीएसएलआर तस्वीरें खींचीं। अच्छी तस्वीरों से बुकिंग्स तुरंत 3 गुना बढ़ गईं!
2. **Craigslist Cross-Posting Hack**: उन्होंने एक आसान कोड बनाया जिससे होस्ट्स एक क्लिक में अपनी लिस्टिंग Craigslist पर मुफ्त में पोस्ट कर सकते थे। इससे उन्हें बिना किसी विज्ञापन खर्च के लाखों किरायेदार मिल गए।
3. **अतिथियों के साथ व्यक्तिगत बातचीत**: पहले 50 यूज़र्स से सीधा मिलकर उनकी समस्याओं को तुरंत ऐप में सुधारा गया।`,
      en: `Airbnb's early growth breakthrough followed Paul Graham's iconic advice: **'Do things that don't scale'**:

1. **Door-to-Door Professional Photography**: In 2009, struggling at $200/week revenue, the founders flew to NYC, knocked on hosts' doors, and took crisp, professional DSLR photos for free. High-quality imagery instantly tripled revenue!
2. **Craigslist Integration Hack**: They engineered a one-click tool allowing hosts to cross-post their listings to Craigslist, capturing immense free search traffic.
3. **Relentless Customer Feedback**: They stayed in early hosts' apartments to fix bugs and build community intimacy.`,
    },
    speechText: {
      hi: `Airbnb की शुरुआती ग्रोथ का राज़ था ऐसे काम करना जो शुरू में बड़े पैमाने पर न हो सकें। 2009 में संस्थापक खुद न्यूयॉर्क गए और मेज़बानों के कमरों की पेशेवर तस्वीरें खींचीं, जिससे बुकिंग्स तीन गुना बढ़ गईं। साथ ही Craigslist पर लिस्टिंग शेयर करने की सुविधा से उन्हें बिना विज्ञापन खर्च लाखों यूज़र्स मिले।`,
      en: `Airbnb grew early on by doing things that don't scale. In 2009, the founders personally visited New York hosts to take professional photos of their rooms, which immediately tripled bookings. They also integrated with Craigslist to reach millions of travelers with zero advertising spend.`,
    },
    quickActions: {
      hi: [
        'Airbnb की नेटवर्थ कितनी है?',
        'Airbnb के नुकसान क्या हैं?',
        'Airbnb पैसे कैसे कमाता है?',
        '🎯 क्विज़ पूछो',
      ],
      en: [
        'What is Airbnb net worth?',
        'What are the disadvantages?',
        'How does Airbnb make money?',
        '🎯 Quiz me',
      ],
    },
  },

  // CASE STUDIES: AIRBNB DISADVANTAGES
  airbnb_disadvantages: {
    displayText: {
      hi: `Airbnb के बिज़नेस मॉडल के 3 बड़े नुकसान और चुनौतियाँ हैं:

1. **नगर निगम नियम व प्रतिबंध (City Regulations)**: न्यूयॉर्क, पेरिस और बार्सिलोना जैसे शहरों में स्थानीय लोगों के लिए घर महंगे हो गए, इसलिए सरकारों ने शॉर्ट-टर्म रेंटल्स पर कड़े नियम और भारी टैक्स लगा दिए।
2. **क्वालिटी और सुरक्षा में अंतर**: हर होस्ट होटल मैनेजर जैसा पेशेवर नहीं होता। कभी-कभार गंदे कमरे या अवैध पार्टियों से ब्रांड की साख को नुकसान पहुंचता है।
3. **पर्यटन पर अत्यधिक निर्भरता**: 2020 में कोरोना महामारी आते ही अंतरराष्ट्रीय यात्रा रुकने से 6 हफ्तों में 80% रेवेन्यू गिर गया था (हालाँकि उन्होंने घरेलू यात्रा पर ध्यान देकर शानदार वापसी की)।`,
      en: `Airbnb faces three major structural disadvantages and risks:

1. **Municipal Bans & Housing Regulations**: Cities like New York, Paris, and Barcelona enforce severe limits and taxes because short-term rentals squeeze residential housing affordability.
2. **Inconsistent Quality & Safety**: Unlike standardized hotel rooms, properties vary widely, creating customer service disputes, noise complaints, and safety risks.
3. **Extreme Travel Sensitivity**: When pandemics or travel freezes occur, global booking revenue can drop precipitously overnight.`,
    },
    speechText: {
      hi: `Airbnb के बिज़नेस मॉडल में तीन मुख्य चुनौतियाँ हैं। पहली, कई बड़े शहरों में कड़े नियम और शॉर्ट-टर्म रेंटल्स पर पाबंदियाँ। दूसरी, होटलों की तुलना में कमरों की क्वालिटी और सुरक्षा में एकरूपता की कमी। और तीसरी, वैश्विक संकट या महामारी के समय पर्यटन ठप होने का जोखिम।`,
      en: `Airbnb faces three key challenges: strict municipal regulations and rental caps in major cities, inconsistency in property quality and safety compared to standard hotels, and vulnerability to global travel disruptions.`,
    },
    quickActions: {
      hi: [
        'Airbnb की नेटवर्थ कितनी है?',
        'Airbnb ने शुरुआत में कैसे ग्रो किया?',
        '🎯 क्विज़ पूछो',
      ],
      en: [
        'What is Airbnb net worth?',
        'How did Airbnb grow initially?',
        '🎯 Quiz me',
      ],
    },
  },

  // CASE STUDIES: GENERAL BUSINESS MODEL CONCEPT
  business_model: {
    displayText: {
      hi: `बिजनेस केस स्टडी में **Business Model का मतलब है कि कोई कंपनी अपने ग्राहकों के लिए क्या वैल्यू बनाती है, उस तक कैसे पहुँचाती है और बदले में मुनाफा कैसे कमाती है।**

सीधी भाषा में: 'कंपनी का पैसे कमाने का असल ब्लूप्रिंट क्या है?' 😂

इसके 3 मुख्य स्तंभ होते हैं:
1. **Value Proposition**: आप ग्राहक की कौन सी परेशानी हल कर रहे हैं? (जैसे स्विगी 30 मिनट में खाना पहुँचाता है)।
2. **Target Customer**: आपका उत्पाद कौन खरीद रहा है?
3. **Revenue vs Cost Structure**: पैसा कहाँ से आएगा (कमीशन, सब्सक्रिप्शन, प्रत्यक्ष बिक्री) और इसे चलाने का खर्च कितना है।`,
      en: `In a business case study, a **Business Model describes how a company creates value, delivers that value to customers, and captures economic revenue in return.**

In simple words: 'What is the company's real blueprint to make money?' 😂

Every viable business model has three core pillars:
1. **Value Proposition**: What painful problem do you solve for the customer?
2. **Target Customer**: Exactly who is willing to pay for this solution?
3. **Revenue Streams vs Cost Structure**: How money flows in (commission, subscription, retail markup) versus operational costs to run it.`,
    },
    speechText: {
      hi: `बिज़नेस मॉडल का मतलब है कि कोई कंपनी अपने ग्राहकों को क्या वैल्यू देती है, उस तक कैसे पहुँचती है और मुनाफ़ा कैसे कमाती है। इसमें मुख्य रूप से वैल्यू प्रपोज़िशन, लक्षित ग्राहक, रेवेन्यू मॉडल और लागत संरचना शामिल होते हैं।`,
      en: `A business model is a company's blueprint for creating, delivering, and capturing value. It defines the core value proposition, the target customer, revenue streams, and cost structures.`,
    },
    quickActions: {
      hi: [
        'केस स्टडी का उद्देश्य क्या है?',
        'Competitive Advantage क्या होता है?',
        'Airbnb का मॉडल बताओ',
      ],
      en: [
        'What is the purpose of Case Studies?',
        'What is Competitive Advantage?',
        'Explain Airbnb model',
      ],
    },
  },

  // CASE STUDIES: PURPOSE OF CASE STUDIES
  case_study_purpose: {
    displayText: {
      hi: `बिजनेस केस स्टडी पढ़ने का सबसे बड़ा मकसद है: **दूसरी कंपनियों की सफलताओं और महंगी गलतियों से व्यावहारिक निर्णय लेना सीखना—बिना खुद करोड़ों का नुकसान किए!** 😂

इसके मुख्य फायदे:
1. **Real-World Decision Making**: किताबी थ्योरी के बजाय यह दिखाता है कि बाज़ार के दबाव और संकट में संस्थापकों ने क्या ठोस फैसले लिए।
2. **Trade-offs समझना**: हर आकर्षक रणनीति के साथ कोई न कोई छुपा हुआ जोखिम होता है।
3. **Pattern Recognition**: विभिन्न उद्योगों के मॉडल देखकर आप अपने करियर या व्यवसाय में बेहतर योजनाएँ बना सकते हैं।`,
      en: `The core purpose of studying business case studies is to **master real-world decision-making from other companies' wins and costly mistakes—without having to lose millions yourself!** 😂

Three major benefits:
1. **Practical Reality over Theory**: It shows how founders and managers actually act under fierce competition, regulatory threats, and market crashes.
2. **Understanding Trade-offs**: Every strategic upside comes with hidden risks (like speed vs quality control).
3. **Pattern Recognition**: Analyzing different revenue and operational models helps you solve problems in your own business or career.`,
    },
    speechText: {
      hi: `केस स्टडी का मुख्य उद्देश्य किसी कंपनी के असल फैसलों, सफलताओं और गलतियों से व्यावहारिक सीख लेना है ताकि हम अपने करियर और बिज़नेस में वही गलतियाँ न दोहराएँ।`,
      en: `The purpose of studying case studies is to learn practical strategic decision-making from real corporate successes and failures without making expensive mistakes yourself.`,
    },
    quickActions: {
      hi: ['बिज़नेस मॉडल क्या होता है?', 'Airbnb केस स्टडी समझाइए', '🎯 क्विज़'],
      en: ['What is a Business Model?', 'Explain Airbnb Case Study', '🎯 Quiz'],
    },
  },

  // CASE STUDIES: COMPETITIVE ADVANTAGE / MOAT
  competitive_advantage: {
    displayText: {
      hi: `Competitive Advantage (जिसे वॉरेन बफेट **'Economic Moat'** कहते हैं) किसी कंपनी की वह विशेषता है जिसे प्रतिद्वंद्वी आसानी से कॉपी नहीं कर सकते।

जैसे किले के चारों तरफ बनी गहरी खाई दुश्मनों को रोकती है, वैसे ही Moat बिज़नेस को सुरक्षित रखता है 😂।

मुख्य प्रकार:
1. **Network Effects**: जितने ज़्यादा लोग जुड़ेंगे, प्लेटफॉर्म उतना ही ताकतवर होगा (जैसे व्हाट्सएप, Airbnb)।
2. **Cost Advantage**: बाज़ार में सबसे कम लागत पर उत्पाद तैयार करने की क्षमता (जैसे DMart)।
3. **Brand Trust**: ब्रांड पर ग्राहकों का गहरा विश्वास (जैसे Amul, Apple)।
4. **Switching Cost**: ग्राहक के लिए दूसरी कंपनी पर शिफ्ट होना महंगा या मुश्किल होना।`,
      en: `A Competitive Advantage (what Warren Buffett calls an **Economic Moat**) is a unique strength that competitors cannot easily duplicate or overcome.

Four classic types:
1. **Network Effects**: The product gets more valuable as more users join (e.g. WhatsApp, Airbnb).
2. **Cost Advantage**: Structural ability to deliver goods cheaper (e.g. DMart, Walmart).
3. **Brand Trust**: Customers default to your name because of perceived quality (e.g. Amul, Apple).
4. **High Switching Costs**: Leaving your service is too painful or expensive for the client.`,
    },
    speechText: {
      hi: `कम्पेटिटिव एडवांटेज यानी इकोनॉमिक मोट कंपनी की वह खास ताकत है जिसकी नकल प्रतिद्वंद्वी आसानी से नहीं कर सकते। इसमें नेटवर्क इफेक्ट्स, कम लागत का फायदा, ब्रांड ट्रस्ट और हाई स्विचिंग कॉस्ट शामिल हैं।`,
      en: `A competitive advantage or economic moat is a structural advantage that protects a company from competitors, such as network effects, low-cost operations, brand trust, and high switching costs.`,
    },
    quickActions: {
      hi: ['बिज़नेस मॉडल क्या है?', 'Airbnb का उदाहरण दो', '🎯 क्विज़'],
      en: ['What is a Business Model?', 'Give Airbnb example', '🎯 Quiz'],
    },
  },

  // ECONOMICS: INFLATION
  inflation: {
    displayText: {
      hi: `महंगाई यानी **Inflation का मतलब है समय के साथ बाज़ार में वस्तुओं और सेवाओं की सामान्य कीमतों में लगातार बढ़ोतरी और पैसे की क्रय-शक्ति (Purchasing Power) में गिरावट।**

उदाहरण: सोचिए पहले ₹10 में 2 समोसे मिलते थे, आज उसी ₹10 में सिर्फ 1 समोसा मिलता है 😂। नोट वही ₹10 का है, लेकिन उसकी खरीदने की ताकत आधी हो गई!

मुख्य कारण:
1. **Demand-Pull**: जब मांग उत्पादन क्षमता से अधिक तेज़ी से बढ़ती है।
2. **Cost-Push**: जब कच्चा माल, पेट्रोल-डीज़ल या ट्रांसपोर्ट महंगा हो जाता है।

इसे नियंत्रित करने के लिए रिज़र्व बैंक (RBI) रेपो रेट बढ़ाता है।`,
      en: `Inflation is the **sustained, broad increase in the general price level of goods and services over time, eroding the purchasing power of money.**

For example: If ₹10 bought two samosas five years ago, but today that exact same ₹10 only buys one samosa 😂. The ₹10 note stayed identical, but its buying muscle weakened!

Main drivers:
1. **Demand-Pull**: Too much money chasing too few goods.
2. **Cost-Push**: Spikes in raw material, energy, or freight expenses passed onto buyers.

Central banks hike interest rates (Repo Rate) to tame inflation.`,
    },
    speechText: {
      hi: `महंगाई यानी मुद्रास्फीति का मतलब है समय के साथ बाज़ार में चीज़ों और सेवाओं के दामों का लगातार बढ़ना, जिससे आपके पैसे की क्रय शक्ति कम हो जाती है। जब मांग बढ़ती है या उत्पादन लागत बढ़ जाती है, तब महंगाई बढ़ती है। रिजर्व बैंक रेपो रेट बढ़ाकर इसे नियंत्रित करने की कोशिश करता है।`,
      en: `Inflation is the sustained increase in the general price level of goods and services over time, which reduces the purchasing power of money. When demand rises or production costs surge, prices climb, and central banks typically raise interest rates to control it.`,
    },
    quickActions: {
      hi: ['CPI क्या होता है?', 'GDP क्या है?', 'मांग और आपूर्ति समझाओ', '🎯 क्विज़'],
      en: ['What is CPI?', 'What is GDP?', 'Explain Demand and Supply', '🎯 Quiz'],
    },
  },

  // ECONOMICS: GDP
  gdp: {
    displayText: {
      hi: `GDP यानी **Gross Domestic Product (सकल घरेलू उत्पाद) एक वित्तीय वर्ष में किसी देश की भौगोलिक सीमा के भीतर उत्पादित सभी अंतिम वस्तुओं और सेवाओं का कुल बाज़ार मूल्य है।**

सीधी भाषा में: 'पूरे देश ने 1 साल में कितने रुपये का माल और सेवाएँ तैयार कीं!' 😂

सूत्र: **GDP = C + I + G + (X - M)**
(खपत + निजी निवेश + सरकारी खर्च + शुद्ध निर्यात)।

बढ़ती GDP का अर्थ है व्यापार का विस्तार, नए रोज़गार और देश की बढ़ती आर्थिक संपन्नता।`,
      en: `GDP stands for **Gross Domestic Product—the total monetary value of all finished goods and services produced within a country's borders during a specific period (usually one year).**

Formula: **GDP = C + I + G + (X - M)**
(Consumption + Investment + Government Spending + Net Exports).

When GDP grows, businesses expand, jobs increase, and national income rises.`,
    },
    speechText: {
      hi: `जीडीपी यानी सकल घरेलू उत्पाद एक निश्चित समय में किसी देश की सीमाओं के भीतर उत्पादित सभी अंतिम वस्तुओं और सेवाओं का कुल बाज़ार मूल्य होता है। यह देश की आर्थिक वृद्धि का सबसे बड़ा पैमाना है।`,
      en: `GDP or Gross Domestic Product is the total monetary value of all finished goods and services produced within a country's borders over a specific period. It is the primary score of economic performance and national output.`,
    },
    quickActions: {
      hi: ['महंगाई क्या है?', 'मौद्रिक नीति क्या है?', '🎯 क्विज़'],
      en: ['What is Inflation?', 'What is Monetary Policy?', '🎯 Quiz'],
    },
  },

  // PERSONALITY DEVELOPMENT: CONFIDENCE
  confidence: {
    displayText: {
      hi: `आत्मविश्वास (Confidence) कोई जन्मजात जादू नहीं है, बल्कि **यह तैयारी, स्पष्ट शारीरिक भाषा (Body Language) और सकारात्मक आत्म-संवाद (Self-Talk) का परिणाम है।**

तुरंत सुधारने के 3 नियम:
1. **7-Second Rule**: किसी भी कमरे में प्रवेश करते समय अपनी रीढ़ सीधी रखें, कंधे पीछे और नज़रें सीधी रखें।
2. **Intentional Pausing**: हड़बड़ाने के बजाय बोलने से पहले 2 सेकंड का विराम लें। ठहराव आत्मविश्वास और नियंत्रण दर्शाता है।
3. **Web-to-Web Handshake**: हाथ मिलाते समय हथेली से हथेली मिलाकर दृढ़ता से हाथ मिलाएँ—न ढीला और न ही बहुत कड़ा! 😂`,
      en: `Confidence is not an inborn mystery; it is a **skill built through preparation, purposeful body posture, and controlled vocal delivery.**

Three actionable daily habits:
1. **The 7-Second Rule**: Enter rooms with an upright spine, shoulders pulled gently back, and gaze level.
2. **Intentional Pausing**: Instead of rushing or using fillers ('um/like'), take a deliberate 2-second pause before answering.
3. **Web-to-Web Handshake**: Firm, eye-to-eye, with palms touching cleanly—neither limp like a dead fish 😂 nor a bone-crusher!`,
    },
    speechText: {
      hi: `आत्मविश्वास बढ़ाने के लिए रोज़मर्रा की छोटी आदतों से शुरुआत करें। बात करते समय आँखों का संपर्क बनाए रखें, अपनी पीठ सीधी रखें और बोलने से पहले दो सेकंड का विराम लें। नकारात्मक आत्म-चर्चा से बचें और खुद पर भरोसा रखें।`,
      en: `Confidence is built through daily physical and mental habits. Maintain steady eye contact, keep your posture upright, take intentional pauses before speaking, and practice positive self-talk.`,
    },
    quickActions: {
      hi: ['Body Language के टिप्स', 'Stage Fear कैसे दूर करें?', 'दृढ़ता से "ना" कैसे कहें?'],
      en: ['Body Language tips', 'Overcome stage fright', 'How to say No assertively'],
    },
  },

  // DRESSING SENSE: INTERVIEW & FORMAL
  dressing_interview: {
    displayText: {
      hi: `इंटरव्यू या औपचारिक अवसर के लिए सही परिधान (Formal Wear) का सुनहरा नियम है: **सादगी, सही फिटिंग और रंगों का तालमेल।**

3 बुनियादी नियम:
1. **The Navy/Charcoal Rule**: इंटरव्यू में गहरा नीला (Navy Blue) या चारकोल ग्रे ब्लेजर पहनें। यह गंभीरता और विश्वसनीयता दिखाता है।
2. **Matching Leathers**: आपके जूते का लेदर और बेल्ट का लेदर एक ही रंग का होना चाहिए (काला जूता = काली बेल्ट)।
3. **Socks Rule**: मोज़े हमेशा पैंट के रंग से मैच करें, और इतने लंबे हों कि बैठने पर पैर की त्वचा न दिखे 😂.`,
      en: `The golden rule for formal interview attire is: **clean fit, classic neutral colors, and subtle attention to grooming details.**

Three essential rules:
1. **Navy/Charcoal Anchor**: A well-fitted navy blue or charcoal jacket communicates competence and calm professionalism.
2. **Matching Leathers**: Your belt leather and shoe leather must always match in color and finish (black shoes with black belt).
3. **Calf-Length Socks**: Match your sock color to your trouser fabric, making sure no bare leg shows when sitting down! 😂`,
    },
    speechText: {
      hi: `इंटरव्यू के लिए फॉर्मल कपड़ों का सबसे बड़ा नियम है सही फिटिंग और रंगों का संतुलन। गहरा नीला या चारकोल ग्रे ब्लेजर सबसे सुरक्षित और प्रभावशाली माना जाता है। बेल्ट और जूतों का लेदर एक ही रंग का रखें और हमेशा साफ कपड़े पहनें।`,
      en: `For job interviews, stick to well-fitted classic attire. Navy blue or charcoal suits convey authority and trust. Always match the color of your belt and shoes, and ensure garments are neatly pressed.`,
    },
    quickActions: {
      hi: ['Color Coordination के नियम', 'Smart Casual क्या है?', 'Capsule Wardrobe समझाइए'],
      en: ['Color Coordination rules', 'What is Smart Casual?', 'Explain Capsule Wardrobe'],
    },
  },
};

/**
 * Generates an educational response providing both UI displayText and clean Devanagari speechText
 */
export function generateKnowledgeResponse(
  classification: ClassificationResult,
  currentLanguage: AppLanguage = 'en',
  context?: TiaLessonContext
): KnowledgeResponseResult {
  const isHindi = currentLanguage === 'hi';
  const { category, course, resolvedConcept, isFunnyRequest, isExampleRequest, isWhyRequest } =
    classification;

  // 1. OUT OF SCOPE: Dynamic course-based polite rejection
  if (category === 'OUT_OF_SCOPE') {
    const defaultQuickActions = isHindi
      ? [
          `💡 ${course.name} के बारे में बताएं`,
          `🎯 ${course.name} का क्विज़`,
          `इस कोर्स के मुख्य विषय क्या हैं?`,
        ]
      : [
          `💡 Tell me about ${course.name}`,
          `🎯 Quiz on ${course.name}`,
          `What are the core topics?`,
        ];

    const displayOut = isHindi ? course.outOfScopeResponse.hi : course.outOfScopeResponse.en;
    const speechOut = isHindi
      ? `यह विषय मेरे वर्तमान कोर्स का हिस्सा नहीं है। मैं अभी आपको ${course.name} से जुड़े सवालों में मदद कर सकती हूँ।`
      : `That topic is not part of my current course. I can help you with questions related to ${course.name}.`;

    return {
      text: displayOut,
      displayText: displayOut,
      speechText: speechOut,
      quickActions: defaultQuickActions,
    };
  }

  // 2. Greeting: Greet as tutor for current course
  if (resolvedConcept === 'greeting') {
    const greetingDisplay = isHindi
      ? `नमस्ते! मैं टिया हूँ, आपकी **${course.name}** लर्निंग गाइड 😊. आज आप क्या समझना चाहते हैं? मुझसे कुछ भी पूछिए!`
      : `Hey! I'm Tia, your **${course.name}** learning companion 😊. What would you like to explore today in ${course.name}? Ask me anything!`;

    const greetingSpeech = isHindi
      ? `नमस्ते! मैं टिया हूँ, आपकी ${course.name} लर्निंग गाइड। आज आप क्या समझना चाहते हैं? मुझसे कुछ भी पूछिए!`
      : `Hey! I'm Tia, your ${course.name} learning companion. What would you like to explore today? Ask me anything!`;

    return {
      text: greetingDisplay,
      displayText: greetingDisplay,
      speechText: greetingSpeech,
      quickActions: isHindi
        ? [`💡 यह पाठ समझाइए`, `😂 मज़ाकिया अंदाज़ में बताओ`, `🎯 झटपट क्विज़`]
        : [`💡 Explain this lesson`, `😂 Make it funny`, `🎯 Quick Quiz`],
    };
  }

  // 3. Curated knowledge entry
  const entry = MULTI_COURSE_KNOWLEDGE_BASE[resolvedConcept];
  if (entry) {
    let disp = isHindi ? entry.displayText.hi : entry.displayText.en;
    let speech = isHindi ? entry.speechText.hi : entry.speechText.en;

    if (isWhyRequest && entry.whyItHappens) {
      disp = isHindi ? entry.whyItHappens.displayText.hi : entry.whyItHappens.displayText.en;
      speech = isHindi ? entry.whyItHappens.speechText.hi : entry.whyItHappens.speechText.en;
    } else if (isFunnyRequest) {
      const funnyAddHi = `\n\nसीधी बात: कॉन्सेप्ट समझना आसान है, बस सही उदाहरण मिलना चाहिए! 😂`;
      const funnyAddEn = `\n\nBottom line: Every great concept is simple once you see the real-world pattern! 😂`;
      disp += isHindi ? funnyAddHi : funnyAddEn;
    }

    return {
      text: disp,
      displayText: disp,
      speechText: cleanTiaSpeechText(speech, isHindi),
      quickActions: isHindi ? entry.quickActions.hi : entry.quickActions.en,
    };
  }

  // 4. Dynamic Lesson Content Synthesizer
  if (context?.sections && context.sections.length > 0) {
    const firstSection = context.sections[0];
    const secContent = isHindi
      ? firstSection.content_hi || firstSection.content
      : firstSection.content;
    const practical = context.practicalExample;

    const dynamicDisplay = isHindi
      ? `**${context.lessonTitle}** के संदर्भ में:\n\n${secContent.slice(0, 350)}...\n\n${
          practical
            ? `**व्यावहारिक उदाहरण:** ${practical.scenario_hi || practical.scenario}\n${
                practical.analysis_hi || practical.analysis
              }`
            : ''
        }\n\nसीधी सीख: थ्योरी को असल ज़िंदगी से जोड़कर देखना ही सीखने का सबसे तेज़ तरीका है! 😂`
      : `In the context of **${context.lessonTitle}**:\n\n${secContent.slice(0, 350)}...\n\n${
          practical
            ? `**Real-World Example:** ${practical.scenario}\n${practical.analysis}`
            : ''
        }\n\nKey Takeaway: Real mastery comes from testing the principle in daily life! 😂`;

    const dynamicSpeech = isHindi
      ? cleanTiaSpeechText(
          `${context.lessonTitle} के संदर्भ में। ${secContent.slice(0, 200)}। व्यावहारिक उदाहरण के साथ समझना ही सबसे आसान तरीका है।`,
          true
        )
      : cleanTiaSpeechText(
          `In the context of ${context.lessonTitle}. ${secContent.slice(0, 200)}. Testing the principle in daily life is the best way to master it.`,
          false
        );

    return {
      text: dynamicDisplay,
      displayText: dynamicDisplay,
      speechText: dynamicSpeech,
      quickActions: isHindi
        ? ['💡 आसान उदाहरण दो', '😂 मज़ाकिया बनाओ', '🎯 क्विज़ पूछो']
        : ['💡 Give simple example', '😂 Make it funny', '🎯 Quiz me'],
    };
  }

  // 5. Generic Course Overview Fallback
  const defaultDisplay = isHindi
    ? `**${course.name}** में यह विषय सीधा व्यावहारिक समझ और व्यावहारिक निर्णयों से जुड़ा है!\n\n${course.description}\n\nआप इस विषय को किस नज़रिए से समझना चाहते हैं—एक आसान उदाहरण से, या मज़ाकिया अंदाज़ में? 💡`
    : `This is a fundamental inquiry within **${course.name}**!\n\n${course.description}\n\nWould you like to explore this through a concrete real-life example, or should we break it down with light humor? 💡`;

  const defaultSpeech = isHindi
    ? `${course.name} में यह विषय सीधा व्यावहारिक समझ से जुड़ा है। आप इसे उदाहरण से समझना चाहते हैं या मज़ाकिया अंदाज़ में?`
    : `In ${course.name}, this topic connects directly with practical decision making. Would you like a simple example?`;

  return {
    text: defaultDisplay,
    displayText: defaultDisplay,
    speechText: defaultSpeech,
    quickActions: isHindi
      ? ['💡 आसान उदाहरण दो', '😂 मज़ाकिया बनाओ', '🎯 क्विज़ पूछो']
      : ['💡 Give simple example', '😂 Make it funny', '🎯 Quiz me'],
  };
}

/**
 * RESPONSE RELEVANCE CHECK
 * Verifies that the candidate response directly answers the user's latest question.
 * Rejects responses that fail to address the specific intent or default to canned lesson intros.
 */
export function checkResponseRelevance(
  response: string,
  userQuestion: string,
  intentType?: UserIntentType,
  currentLessonTitle?: string,
  courseName?: string
): { isRelevant: boolean; reason?: string } {
  const cleanResp = (response || '').toLowerCase();
  const cleanQ = normalizeText(userQuestion);
  const cleanLesson = (currentLessonTitle || '').toLowerCase();

  // Failure Pattern 1: Response begins with canned lesson introduction without answering question
  if (
    cleanResp.startsWith('today we are learning') ||
    cleanResp.startsWith('आज हम पढ़ रहे हैं') ||
    cleanResp.startsWith('in this lesson') ||
    cleanResp.startsWith('इस पाठ में')
  ) {
    if (!cleanQ.includes('today') && !cleanQ.includes('lesson') && !cleanQ.includes('पाठ')) {
      return {
        isRelevant: false,
        reason: 'Response began with generic canned lesson introduction instead of answering question',
      };
    }
  }

  // Failure Pattern 2: User asks about Net Worth / Valuation, but response only talks about business model or does not mention worth
  if (intentType === 'NET_WORTH_VALUATION') {
    const hasFinancialWorth =
      cleanResp.includes('billion') ||
      cleanResp.includes('market cap') ||
      cleanResp.includes('net worth') ||
      cleanResp.includes('valuation') ||
      cleanResp.includes('dollar') ||
      cleanResp.includes('करोड़') ||
      cleanResp.includes('दौलत') ||
      cleanResp.includes('संपत्ति') ||
      cleanResp.includes('वैल्यू') ||
      cleanResp.includes('मूल्य') ||
      cleanResp.includes('$') ||
      cleanResp.includes('₹');

    if (!hasFinancialWorth) {
      return {
        isRelevant: false,
        reason: "User asked for net worth/valuation, but response contained no valuation or financial worth figures",
      };
    }
  }

  // Failure Pattern 3: User asks about Founders, but response does not name any founders
  if (intentType === 'FOUNDERS') {
    const hasFounders =
      cleanResp.includes('chesky') ||
      cleanResp.includes('gebbia') ||
      cleanResp.includes('blecharczyk') ||
      cleanResp.includes('founder') ||
      cleanResp.includes('संस्थापक') ||
      cleanResp.includes('शुरू किया') ||
      cleanResp.includes('kamath') ||
      cleanResp.includes('kurien');

    if (!hasFounders) {
      return {
        isRelevant: false,
        reason: "User asked about founders, but response did not identify company founders",
      };
    }
  }

  // Failure Pattern 4: Response simply mirrors lesson title when user asked specific question
  if (
    cleanLesson &&
    cleanResp.includes(`**${cleanLesson}**`) &&
    (cleanResp.includes('में सबसे बड़ी गलती') || cleanResp.includes('को गाड़ी चलाने जैसा समझिए'))
  ) {
    return {
      isRelevant: false,
      reason: 'Response defaulted to canned lesson title template instead of answering question',
    };
  }

  return { isRelevant: true };
}
