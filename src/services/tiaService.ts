import {
  AppLanguage,
  TiaLessonContext,
  TiaMessage,
  TiaMode,
  TiaQuizEvaluation,
} from '../types';
import { getTiaLanguageConfig, cleanTiaSpeechText } from './tiaLanguageConfig';
import {
  classifyUserQuestion,
  generateKnowledgeResponse,
  checkResponseRelevance,
} from './tiaSemanticEngine';
import { getCourseScope } from './tiaCourseRegistry';

export { getTiaLanguageConfig, cleanTiaSpeechText };

/**
 * Tia AI Voice Learning Assistant Service
 *
 * Strictly adheres to:
 * Current User Selected Language -> Tia Response Language + Tia Voice Language
 *
 * If selected language is Hindi:
 * - Tia responds in Hindi / Hinglish.
 * - Tia voice speaks hi-IN.
 * - Understands user inquiries even if asked in English, but ALWAYS responds in Hindi.
 *
 * If selected language is English:
 * - Tia responds in natural English.
 * - Tia voice speaks en-IN.
 * - Understands user inquiries even if asked in Hindi, but ALWAYS responds in English.
 */

const generateId = () => `tia-msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

/**
 * 1. Get Lesson Explanation
 */
export async function getLessonExplanation(
  context?: TiaLessonContext,
  simpler = false,
  currentLanguage: AppLanguage = 'en'
): Promise<TiaMessage> {
  const isHindi = currentLanguage === 'hi';
  const lessonTitle = isHindi
    ? context?.lessonTitle_hi || context?.lessonTitle || 'यह पाठ'
    : context?.lessonTitle || 'this topic';

  const hook = isHindi
    ? context?.lessonHook_hi || context?.lessonHook || ''
    : context?.lessonHook || '';

  const firstSection = context?.sections?.[0];
  const sectionContent = isHindi
    ? firstSection?.content_hi || firstSection?.content
    : firstSection?.content;

  const exampleScenario = isHindi
    ? context?.practicalExample?.scenario_hi || context?.practicalExample?.scenario
    : context?.practicalExample?.scenario;

  let explanationText = '';
  let quickActions: string[] = [];

  if (isHindi) {
    if (simpler) {
      explanationText = `अरे टेंशन मत लो! 😂 चलो **${lessonTitle}** को बिल्कुल आसान और सीधे शब्दों में समझते हैं।\n\nकिताबी मुश्किल परिभाषाओं को छोड़िए, मुख्य बात सिर्फ इतनी सी है:\n${
        sectionContent
          ? sectionContent.slice(0, 200) + '...'
          : 'उन छोटे-छोटे व्यावहारिक कदमों पर ध्यान दें जो आपको बड़ा फायदा और मानसिक शांति देते हैं।'
      }\n\n**सीधा नियम:** इसे एक बार सही से समझ लिया, तो आगे कभी किसी से पूछने की ज़रूरत नहीं पड़ेगी! क्या 1 मिनट का छोटा सा क्विज़ खेलें? 🎯`;
    } else {
      explanationText = `चलो, **${lessonTitle}** को ऐसे समझते हैं जैसे दो दोस्त चाय की चुस्की लेते हुए बात कर रहे हों! ☕\n\n${
        hook ? `*${hook}*\n\n` : ''
      }**मुख्य विचार (Core Concept):**\n${
        sectionContent
          ? sectionContent.slice(0, 280) + '...'
          : 'हर समझदारी भरा फैसला नियम और बुनियादी बातों को समझकर ही लिया जाता है।'
      }\n\n**असल ज़िंदगी का उदाहरण:**\n${
        exampleScenario ||
        'सोचिए आप ऑनलाइन फोन खरीद रहे हैं। अगर आपको उपभोक्ता कानून पता हैं, तो कस्टमर केयर वाले आपको "रिफंड नहीं मिलेगा" कहकर नहीं टरका सकते!'
      }\n\nदोस्त, बात समझ आई या दिमाग थोड़ा चकरा गया? 😂 बोलो तो इसे और मज़ाकिया बनाऊँ या एक झटपट क्विज़ पूछूँ? 🚀`;
    }

    quickActions = [
      '😂 मज़ाकिया अंदाज़ में बताओ',
      '🎯 मुझसे क्विज़ पूछो',
      '💡 एक और उदाहरण दो',
      '🗣️ मैं बोलकर समझाता हूँ',
    ];
  } else {
    if (simpler) {
      explanationText = `Don't worry, let's break **"${lessonTitle}"** down into bite-sized pieces! 🐣\n\nThink of it this way: instead of heavy textbook jargon, the core idea is super simple:\n${
        sectionContent
          ? sectionContent.slice(0, 200) + '...'
          : 'Focusing on high-leverage practical principles that protect your time and money.'
      }\n\n**Simple rule:** Understand it once with logic, and you'll never stress about memorizing it! Should we test this with a super quick 1-minute quiz? 🎯`;
    } else {
      explanationText = `Alright, let's understand **${lessonTitle}** like friends having chai together! ☕\n\n${
        hook ? `Here's the core question: *${hook}*\n\n` : ''
      }**The Big Idea:**\n${
        sectionContent
          ? sectionContent.slice(0, 280) + '...'
          : 'Every smart decision starts with knowing the underlying rules before jumping in.'
      }\n\n**Real-Life Example:**\n${
        exampleScenario ||
        'Imagine buying an appliance. If you understand basic warranty rights, the store cannot wave away valid claims with a vague excuse!'
      }\n\nDid that click or did your brain take a detour? 😂 Say the word and I can make it funny or throw a quick quiz question at you! 🚀`;
    }

    quickActions = [
      '😂 Make it funny',
      '🎯 Ask me a quiz question',
      '💡 Another example please',
      '🗣️ Let me explain it back to you',
    ];
  }

  return {
    id: generateId(),
    sender: 'tia',
    text: explanationText,
    mode: 'explain',
    timestamp: Date.now(),
    quickActions,
  };
}

/**
 * 2. Generate Funny Explanation ("😂 Make It Funny")
 */
export async function generateFunnyExplanation(
  context?: TiaLessonContext,
  currentLanguage: AppLanguage = 'en'
): Promise<TiaMessage> {
  const isHindi = currentLanguage === 'hi';
  const lessonTitle = isHindi
    ? context?.lessonTitle_hi || context?.lessonTitle || 'यह कॉन्सेप्ट'
    : context?.lessonTitle || 'this concept';
  const subjectId = context?.subjectId;

  let funnyBody = '';
  let fullText = '';
  let quickActions: string[] = [];

  if (isHindi) {
    if (subjectId === 'economics' || lessonTitle.toLowerCase().includes('inflation') || lessonTitle.includes('महंगाई')) {
      funnyBody = `महंगाई (Inflation) समझनी है? चलो चाय और समोसे से शुरू करते हैं! ☕\n\nमहंगाई का मतलब है आपके 100 रुपये के नोट का जादू से गायब होना! कल ₹100 में पूरी गैंग चाय-समोसा खा लेती थी, आज ₹100 में सिर्फ टिशू पेपर और कप मिलता है! 😂\n\nचीजें सोने जैसी कीमती नहीं हुईं, बल्कि पैसे की खरीदने की ताकत कमजोर हो गई है। अगर आपका पैसा 3% ब्याज वाले बचत खाते में पड़ा है, तो महंगाई 6% की स्पीड से उसे कोने में बैठकर चट कर रही है!`;
    } else if (subjectId === 'money-finance') {
      funnyBody = `फाइनेंशियल समझदारी नियम #1: रिश्तेदारों को इम्प्रेस करने के लिए EMI पर नया आईफोन लेना कोई "लाइफस्टाइल इन्वेस्टमेंट" नहीं, बल्कि अपनी मर्ज़ी से खुद को किडनैप करवाना है! 📱💸\n\nएसेट (Asset) वह है जो आपकी जेब में पैसा डाले (जैसे म्यूचुअल फंड या बिज़नेस), और लायबिलिटी (Liability) वो है जो जेब से पैसा निकाले (जैसे वो जिम की मेंबरशिप जो जनवरी में सिर्फ 2 दिन इस्तेमाल की थी)! इंस्टाग्राम पर अमीर दिखना और ऑफलाइन मैगी पर जीना बंद करो!`;
    } else if (subjectId === 'law-rights') {
      funnyBody = `उपभोक्ता अधिकार (Consumer Rights) का सीधा मतलब है: दुकानदार भैया सामान खराब निकलने पर "मुझे क्या पता" नहीं बोल सकते! ⚖️\n\nजब भी कोई दुकान कहे "बिका हुआ माल वापस नहीं होगा", तो मुस्कुरा कर कहिए—"भैया, Consumer Protection Act धारा 2(47) पढ़ लो।" कानून इसीलिए है ताकि आपको हाथ जोड़कर मिन्नतें न करनी पड़ें!`;
    } else if (subjectId === 'time-management') {
      funnyBody = `टाइम मैनेजमेंट का मतलब यह नहीं कि सुबह 5:00 बजे का अलार्म लगाओ और 5:03 पर कंबल ओढ़कर सो जाओ! ⏰😴\n\nज़्यादातर लोग 8 घंटे का टाइट शेड्यूल बनाते हैं जिसमें 1 मिनट का भी बफर नहीं होता। फिर एक 10 मिनट का फोन आता है और पूरा दिन ताश के पत्तों की तरह ढह जाता है! टिया का नियम: हमेशा बफर टाइम रखो। अगर कुछ गलत नहीं हुआ, तो बिना गिल्ट के रील देख लेना!`;
    } else if (subjectId === 'dressing-sense') {
      funnyBody = `ड्रेसिंग सेंस का फंडा: फॉर्मल पैंट के साथ नियॉन ग्रीन स्नीकर्स पहनना आपको "कूल" नहीं, बल्कि चलता-फिरता ट्रैफिक सिग्नल बनाता है! 🚦👔\n\nबेस कलर्स हमेशा न्यूट्रल रखो—नेवी ब्लू, चारकोल ग्रे, या क्रिस्प व्हाइट। ताकि लोग आपकी बात सुनें, न कि यह सोचें कि आपके जूते रात में चमकते हैं या नहीं!`;
    } else {
      funnyBody = `**${lessonTitle}** को ऐसे देखो: ज़िंदगी 10% वो है जो होती है, और 90% वो है कि आप बिना घबराए कैसे रिएक्ट करते हैं! 😂\n\nलोग इसे रॉकेट साइंस समझते हैं, पर यह बस फॉर्मल जूतों में लिपटा हुआ कॉमन सेंस है। इस एक नियम को समझ लो और आप उन सब से 5 कदम आगे हो जाओगे जो सिर्फ रट्टा मारते हैं!`;
    }

    fullText = `अरे सुनो, **${lessonTitle}** को एकदम मज़ाकिया अंदाज़ में याद करते हैं! 😂\n\n${funnyBody}\n\nसमझ आया? अब बताओ, क्या इस पर एक छोटा क्विज़ लें ताकि देखें दिमाग में बात बैठी या नहीं? 🧠✨`;

    quickActions = [
      '🎯 इस पर क्विज़ लो!',
      '💡 एक और असली उदाहरण दो',
      'आसान शब्दों में समझाओ',
      '🗣️ बोलने का अभ्यास कराओ',
    ];
  } else {
    if (subjectId === 'economics' || lessonTitle.toLowerCase().includes('inflation')) {
      funnyBody = `Want to understand Inflation? Let's start with a humble cup of chai! ☕\n\nInflation is literally your 100-rupee note performing a disappearing magic trick. Yesterday ₹100 bought chai and samosas for the entire crew; today ₹100 barely gets you the paper cup and a tissue! 😂\n\nThings didn't suddenly turn into rare diamonds; your currency simply went on an unintended crash diet and lost purchasing muscle!`;
    } else if (subjectId === 'money-finance') {
      funnyBody = `Financial wisdom rule #1: Buying an iPhone on EMI to show off to relatives who don't even like you isn't "investing in lifestyle", it's voluntary financial kidnap! 📱💸\n\nAssets put money INTO your pocket (like mutual funds or productive businesses), liabilities suck money OUT (like that gym membership used twice in January). Never look rich on Instagram while surviving on instant noodles offline!`;
    } else if (subjectId === 'law-rights') {
      funnyBody = `Your consumer rights basically mean: "The shopkeeper cannot play dumb when a product stops functioning in 48 hours!" ⚖️\n\nWhenever a receipt prints "Goods once sold will not be exchanged", remember that the Consumer Protection Act chuckles and says: "Check Section 2(47)." The law exists so you don't have to plead customer support with folded hands!`;
    } else if (subjectId === 'time-management') {
      funnyBody = `Time management isn't about setting an aggressive 5:00 AM alarm that gets hit with snooze at 5:02 AM! ⏰😴\n\nMost people schedule 8 packed hours with zero buffer. Then one random 10-minute family phone call strikes, and the entire day collapses like a house of cards! Tia's golden rule: Always keep buffer blocks.`;
    } else if (subjectId === 'dressing-sense') {
      funnyBody = `Dressing sense decoded: Wearing neon green sneakers with formal trousers doesn't make you "edgy", it makes you look like a traffic signal with strong opinions! 🚦👔\n\nKeep foundational colors neutral—navy, charcoal, crisp white. That way people listen to what you say instead of wondering if your sneakers glow in the dark!`;
    } else {
      funnyBody = `Look at **${lessonTitle}** like this: Life is 10% what happens and 90% how you react without panicking! 😂\n\nMost people treat this like rocket science, but it's really just common sense dressed up in sharp shoes. Master this one rule and you're miles ahead of everyone who just memorizes definitions!`;
    }

    fullText = `Listen up, let's make **${lessonTitle}** genuinely memorable! 😂\n\n${funnyBody}\n\nDid that stick? Tell me: should I quiz you right now to verify that your brain registered it? 🧠✨`;

    quickActions = [
      '🎯 Quiz me on this!',
      '💡 Give another real example',
      'Explain in simple English',
      '🗣️ Give me a speaking drill',
    ];
  }

  return {
    id: generateId(),
    sender: 'tia',
    text: fullText,
    mode: 'funny',
    timestamp: Date.now(),
    quickActions,
  };
}

/**
 * 3. Generate Voice/Interactive Quiz Question
 */
export async function generateQuizQuestion(
  context?: TiaLessonContext,
  currentLanguage: AppLanguage = 'en'
): Promise<TiaMessage> {
  const isHindi = currentLanguage === 'hi';
  const currentQ = context?.currentQuizQuestion;
  const lessonTitle = isHindi
    ? context?.lessonTitle_hi || context?.lessonTitle || 'आज का पाठ'
    : context?.lessonTitle || "today's lesson";

  if (currentQ) {
    const qText = isHindi ? currentQ.question_hi || currentQ.question : currentQ.question;
    const optA = isHindi ? currentQ.option_a_hi || currentQ.option_a : currentQ.option_a;
    const optB = isHindi ? currentQ.option_b_hi || currentQ.option_b : currentQ.option_b;
    const optC = isHindi ? currentQ.option_c_hi || currentQ.option_c : currentQ.option_c;
    const optD = isHindi ? currentQ.option_d_hi || currentQ.option_d : currentQ.option_d;

    const tiaPrompt = isHindi
      ? `चलो विद्वान जी, देखते हैं **${lessonTitle}** आपको कितना याद रहा! 🎯\n\n**${qText}**\n\nआराम से सोचिए। आप माइक दबाकर बोल सकते हैं या नीचे दिए विकल्प पर टैप कर सकते हैं!`
      : `Alright scholar, let's test your memory on **${lessonTitle}**! 🎯\n\n**${qText}**\n\nTake your time. Speak your answer using the mic or tap an option below!`;

    const hintText = isHindi
      ? `संकेत: ${lessonTitle} के मुख्य निष्कर्ष को याद कीजिए!`
      : `Hint: Recall the core takeaway about ${lessonTitle.toLowerCase()}!`;

    return {
      id: generateId(),
      sender: 'tia',
      text: tiaPrompt,
      mode: 'quiz',
      timestamp: Date.now(),
      quizData: {
        question: qText,
        options: [
          `A) ${optA}`,
          `B) ${optB}`,
          `C) ${optC}`,
          `D) ${optD}`,
        ],
        hint: hintText,
        correctAnswer: currentQ.correct_answer,
      },
      quickActions: [
        `A) ${optA.slice(0, 28)}...`,
        `B) ${optB.slice(0, 28)}...`,
        isHindi ? '💡 टिया, संकेत दो' : '💡 Give me a hint, Tia',
      ],
    };
  }

  // Conceptual fallback question
  const subjectId = context?.subjectId;
  let qText = '';
  let hint = '';

  if (isHindi) {
    if (subjectId === 'economics') {
      qText = 'यदि गर्मियों में बाज़ार में ताज़े आमों की मांग अचानक बहुत बढ़ जाए पर कुल आपूर्ति स्थिर रहे, तो आम की कीमत पर क्या असर पड़ेगा?';
      hint = 'सोचिए: उतने ही आमों के लिए ज़्यादा ग्राहक लड़ रहे हैं!';
    } else if (subjectId === 'law-rights') {
      qText = 'क्या भारतीय उपभोक्ता कानून के तहत कोई दुकानदार पानी की बोतल पर छपे MRP से ज़्यादा दाम कानूनी रूप से ले सकता है?';
      hint = 'MRP का मतलब ही Maximum Retail Price (अधिकतम खुदरा मूल्य) होता है!';
    } else if (subjectId === 'money-finance') {
      qText = 'सच्चा वित्तीय एसेट क्या है: 15% सालाना गिरने वाली नई कार, या लगातार डिविडेंड देने वाला बेहतरीन स्टॉक?';
      hint = 'रॉबर्ट कियोसाकी की परिभाषा याद रखें: जो जेब में पैसा डाले वही एसेट है!';
    } else {
      qText = `हमारे **${lessonTitle}** के पाठ से, कोई भी बड़ा कदम उठाने से पहले सबसे पहला कदम क्या होना चाहिए?`;
      hint = 'हस्ताक्षर या भुगतान करने से पहले तथ्यों की जाँच करना!';
    }

    return {
      id: generateId(),
      sender: 'tia',
      text: `चलो विद्वान जी, आपके लिए एक झटपट सवाल! 🧠\n\n**${qText}**\n\nमाइक दबाकर बोलिए या टाइप कीजिए। कोई दबाव नहीं, कोई मार्क्स नहीं कटेंगे! 😄`,
      mode: 'quiz',
      timestamp: Date.now(),
      quizData: {
        question: qText,
        hint,
      },
      quickActions: [
        'कीमत बढ़ जाएगी',
        'कीमत वही रहेगी',
        '💡 मुझे संकेत दो',
        'मुझे नहीं पता, समझाइए!',
      ],
    };
  } else {
    if (subjectId === 'economics') {
      qText = 'If market demand for fresh mangoes suddenly skyrockets in summer while supply remains fixed, what generally happens to mango prices?';
      hint = 'Think: more buyers competing for the exact same crate of mangoes!';
    } else if (subjectId === 'law-rights') {
      qText = 'Under Indian consumer laws, can a retail store legally charge higher than the printed MRP for cold bottled water?';
      hint = 'MRP literally stands for Maximum Retail Price!';
    } else if (subjectId === 'money-finance') {
      qText = 'Which is a true financial asset: A new car that depreciates 15% every year, or a high-quality dividend-paying stock?';
      hint = 'Remember: true assets consistently put money INTO your pocket!';
    } else {
      qText = `From our lesson on **${lessonTitle}**, what is the very first step before taking high-stakes action?`;
      hint = 'Verify rights and check the facts before signing or paying!';
    }

    return {
      id: generateId(),
      sender: 'tia',
      text: `Alright scholar, one quick question for you! 🧠\n\n**${qText}**\n\nSpeak your thought or type below. No pressure, no marks deducted! 😄`,
      mode: 'quiz',
      timestamp: Date.now(),
      quizData: {
        question: qText,
        hint,
      },
      quickActions: [
        'Price will increase',
        'Price stays same',
        '💡 Give me a hint',
        'Not sure, teach me!',
      ],
    };
  }
}

/**
 * 4. Evaluate Quiz Answer
 */
export async function evaluateQuizAnswer(
  userAnswer: string,
  questionText: string,
  context?: TiaLessonContext,
  currentLanguage: AppLanguage = 'en'
): Promise<TiaQuizEvaluation> {
  const isHindi = currentLanguage === 'hi';
  const cleanAns = userAnswer.toLowerCase().trim();
  const currentQ = context?.currentQuizQuestion;

  if (currentQ) {
    const isLetterMatch =
      cleanAns === currentQ.correct_answer.toLowerCase() ||
      cleanAns.startsWith(`option ${currentQ.correct_answer.toLowerCase()}`) ||
      cleanAns.startsWith(`विकल्प ${currentQ.correct_answer.toLowerCase()}`) ||
      cleanAns.startsWith(currentQ.correct_answer.toLowerCase());

    const correctOptionTextEn =
      currentQ.correct_answer === 'A'
        ? currentQ.option_a
        : currentQ.correct_answer === 'B'
        ? currentQ.option_b
        : currentQ.correct_answer === 'C'
        ? currentQ.option_c
        : currentQ.option_d;

    const correctOptionTextHi =
      currentQ.correct_answer === 'A'
        ? currentQ.option_a_hi || currentQ.option_a
        : currentQ.correct_answer === 'B'
        ? currentQ.option_b_hi || currentQ.option_b
        : currentQ.correct_answer === 'C'
        ? currentQ.option_c_hi || currentQ.option_c
        : currentQ.option_d_hi || currentQ.option_d;

    const isTextMatch =
      (cleanAns.length > 3 && correctOptionTextEn.toLowerCase().includes(cleanAns)) ||
      (cleanAns.length > 3 && correctOptionTextHi.toLowerCase().includes(cleanAns));

    if (isLetterMatch || isTextMatch) {
      if (isHindi) {
        return {
          isCorrect: true,
          feedback: 'शाबाश! बिल्कुल सही उत्तर! 🎉 दिमाग ने आज 100% हाजिरी लगा दी!',
          explanation: currentQ.explanation_hi || currentQ.explanation,
          funnyRemark: 'एकदम सटीक जवाब, बिना किसी उबाऊ किताबी भाषण के!',
          nextPrompt: 'क्या अगला सवाल पूछूँ, या मुख्य निष्कर्ष दोहराना चाहेंगे?',
        };
      } else {
        return {
          isCorrect: true,
          feedback: 'Spot on! Correct answer! 🎉 Your brain logged 100% attendance today!',
          explanation: currentQ.explanation,
          funnyRemark: 'Textbook perfection without the boring lecture.',
          nextPrompt: 'Want to try another question, or revise the key takeaways?',
        };
      }
    } else {
      if (isHindi) {
        return {
          isCorrect: false,
          feedback: 'अरेरे! उत्तर ने थोड़ा सा गलत मोड़ ले लिया 😂 पर कोशिश बहुत अच्छी थी!',
          explanation: `सही उत्तर **विकल्प ${currentQ.correct_answer}: ${correctOptionTextHi}** था।\n\n${
            currentQ.explanation_hi || currentQ.explanation
          }`,
          funnyRemark: 'कोई बात नहीं, आइंस्टीन भी पहली बार में सब सही नहीं करते थे!',
          nextPrompt: 'क्या दूसरा सवाल खेलें या इस कॉन्सेप्ट को दोबारा समझें?',
        };
      } else {
        return {
          isCorrect: false,
          feedback: 'Answer took a slight wrong turn! 😂 But great attempt.',
          explanation: `The correct answer was **Option ${currentQ.correct_answer}: ${correctOptionTextEn}**.\n\n${currentQ.explanation}`,
          funnyRemark: "No worries, even Einstein didn't get everything right on the first try!",
          nextPrompt: 'Should we try another question or break down this concept once more?',
        };
      }
    }
  }

  // Open-ended evaluation
  const positiveKeywords = [
    'increase',
    'rise',
    'up',
    'no',
    'cannot',
    'dividend',
    'stock',
    'higher',
    'right',
    'verify',
    'protect',
    'बढ़',
    'नहीं',
    'स्टॉक',
    'जाँच',
    'सही',
  ];
  const isLikelyCorrect = positiveKeywords.some((k) => cleanAns.includes(k));

  if (isLikelyCorrect) {
    if (isHindi) {
      return {
        isCorrect: true,
        feedback: 'शानदार जवाब! बिल्कुल सही पकड़े हैं! 🎉',
        explanation: 'आपका तर्क बिल्कुल सटीक है। जब मूल सिद्धांत समझ आ जाए, तो जवाब अपने आप सही निकलते हैं।',
        funnyRemark: 'इतने सटीक जवाब के लिए तो आपको कंसल्टेंसी फीस चार्ज करनी चाहिए!',
        nextPrompt: 'क्या अगले पाठ पर चलें या बोलने का 1-मिनट का अभ्यास करें?',
      };
    } else {
      return {
        isCorrect: true,
        feedback: 'Spot on! That logic is totally sound! 🎉',
        explanation: 'When you grasp the foundational principle, applying it becomes second nature.',
        funnyRemark: 'You should start charging consulting fees for answers this crisp!',
        nextPrompt: 'Ready for the next concept or should we do a 1-minute speaking drill?',
      };
    }
  } else {
    if (isHindi) {
      return {
        isCorrect: false,
        feedback: 'अच्छा प्रयास था! बहुत करीब थे, पर थोड़ा सा फर्क रह गया। 😄',
        explanation: 'उस मुख्य नियम को याद रखिए जो हमने डिस्कस किया था: पहले अधिकार और प्रोत्साहन देखें।',
        funnyRemark: 'घबराइए मत, जीपीएस भी कभी-कभार री-रूटिंग करता है!',
        nextPrompt: 'क्या इसे एक मज़ेदार रोज़मर्रा के उदाहरण से समझना चाहेंगे?',
      };
    } else {
      return {
        isCorrect: false,
        feedback: 'Nice try! Close, but not quite there yet. 😄',
        explanation: 'Remember the core rule we discussed: look at who holds leverage and how incentives flow.',
        funnyRemark: "Don't worry, even GPS takes a recalculation detour sometimes!",
        nextPrompt: 'Would you like me to explain it using a funny daily-life analogy?',
      };
    }
  }
}

/**
 * 5. Generate Speaking Practice Prompt
 */
export async function getSpeakingPracticePrompt(
  context?: TiaLessonContext,
  currentLanguage: AppLanguage = 'en'
): Promise<TiaMessage> {
  const isHindi = currentLanguage === 'hi';
  const lessonTitle = isHindi
    ? context?.lessonTitle_hi || context?.lessonTitle || 'रोज़मर्रा की बातचीत'
    : context?.lessonTitle || 'everyday conversation';

  let selectedPrompt = '';
  let fullText = '';
  let quickActions: string[] = [];

  if (isHindi) {
    const promptsHi = [
      `कल्पना कीजिए कि आप चाय पीते हुए अपने सबसे अच्छे दोस्त को **${lessonTitle}** 30 सेकंड में समझा रहे हैं। माइक दबाकर मुझे बताइए: आप इसे आसान भाषा में कैसे समझाएँगे?`,
      `पूरे आत्मविश्वास के साथ बोलिए! अगर कोई आपसे इंटरव्यू में पूछे: *"असल ज़िंदगी में यह नियम क्यों महत्वपूर्ण है?"*, तो आप क्या कहेंगे? माइक टैप करें और बोलें!`,
      `सभ्य और मजबूत बातचीत का अभ्यास करते हैं! बोलकर कहिए: *"मैं आपकी बात समझता हूँ, लेकिन आइए असली कानूनी और व्यावहारिक तथ्यों को देखें।"* माइक टैप करें और बोलिए!`,
    ];
    selectedPrompt = promptsHi[Math.floor(Math.random() * promptsHi.length)];

    fullText = `🗣️ **टिया का स्पीकिंग जिम:**\n\n${selectedPrompt}\n\nगलती होने की चिंता मत कीजिए। पूरे विश्वास से बोलिए—मैं सुनकर आपको उत्साह बढ़ाने वाला और उपयोगी सुझाव दूँगी! 🎙️`;
    quickActions = [
      '🎙️ उत्तर देने के लिए माइक दबाएँ',
      'पहले मुझे एक उदाहरण उत्तर दो',
      'कोई आसान विषय दो',
      'वापस पाठ पर चलें',
    ];
  } else {
    const promptsEn = [
      `Imagine you're explaining **${lessonTitle}** to your best friend over chai in 30 seconds. Press the mic and tell me: how would you summarize it simply?`,
      `Speak with confidence! If an interviewer asks: *"Why does this concept matter in practical everyday life?"*, what would you say? Hit the mic and speak!`,
      `Let's practice polite objection! Say this clearly: *"I understand your perspective, but let's examine the actual legal and financial facts."* Tap mic and practice!`,
    ];
    selectedPrompt = promptsEn[Math.floor(Math.random() * promptsEn.length)];

    fullText = `🗣️ **Tia's Speaking Gym:**\n\n${selectedPrompt}\n\nDon't worry about being flawless. Speak naturally—I'll listen and give you constructive, encouraging feedback! 🎙️`;
    quickActions = [
      '🎙️ Tap Mic to Answer',
      'Give me an example answer first',
      'Give me a simpler topic',
      'Back to lesson chat',
    ];
  }

  return {
    id: generateId(),
    sender: 'tia',
    text: fullText,
    mode: 'speaking_practice',
    timestamp: Date.now(),
    quickActions,
  };
}

/**
 * 6. Evaluate Speaking Response
 */
export async function evaluateSpeakingAnswer(
  userSpeech: string,
  context?: TiaLessonContext,
  currentLanguage: AppLanguage = 'en'
): Promise<TiaMessage> {
  const isHindi = currentLanguage === 'hi';
  const words = userSpeech.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let feedback = '';
  let quickActions: string[] = [];

  if (isHindi) {
    if (wordCount < 4) {
      feedback = `अच्छी शुरुआत! लेकिन झिझकिए मत—एक पूरा वाक्य बोलिए ताकि बोलने का आत्मविश्वास बढ़े। वाक्य को आगे बढ़ाने के लिए *"क्योंकि..."* या *"उदाहरण के लिए..."* जोड़कर देखिए! 🎙️✨`;
    } else {
      feedback = `शानदार अंदाज़! 👏 आपने बहुत साफ और स्पष्ट बोला, बात सीधे समझ में आई।\n\n**टिया का प्रो टिप:**\nअपनी बात को और भी प्रभावशाली बनाने के लिए आप शुरुआत में: *"यहाँ मुख्य निष्कर्ष यह है कि..."* या *"व्यावहारिक रूप से..."* जोड़ सकते हैं।\n\nआपका बोलने का फ्लो बहुत स्वाभाविक था। ऐसे ही अभ्यास करते रहिए!`;
    }

    quickActions = [
      'एक और बोलने का अभ्यास',
      '😂 मज़ाकिया अंदाज़ में बताओ',
      'मुझसे क्विज़ पूछो',
      'वापस पाठ पर चलें',
    ];
  } else {
    if (wordCount < 4) {
      feedback = `Good start! But don't hold back—give me a fuller sentence so we can flex those speaking muscles. Try expanding with *"Because..."* or *"For example..."*! 🎙️✨`;
    } else {
      feedback = `Great delivery! 👏 You spoke clearly and conveyed the core message smoothly.\n\n**Tia's Polish Tip:**\nTo sound even more authoritative, begin with: *"The main takeaway here is..."* or *"From a practical standpoint..."*.\n\nYour cadence felt very natural. Keep this up!`;
    }

    quickActions = [
      'Try another speaking prompt',
      '😂 Make it funny',
      'Ask me a quiz question',
      'Back to lesson',
    ];
  }

  return {
    id: generateId(),
    sender: 'tia',
    text: feedback,
    mode: 'speaking_practice',
    timestamp: Date.now(),
    quickActions,
  };
}

/**
 * 7. Generate Revision Recap
 */
export async function generateRevisionQuestions(
  context?: TiaLessonContext,
  currentLanguage: AppLanguage = 'en'
): Promise<TiaMessage> {
  const isHindi = currentLanguage === 'hi';
  const lessonTitle = isHindi
    ? context?.lessonTitle_hi || context?.lessonTitle || 'हाल के पाठ'
    : context?.lessonTitle || 'recent lessons';

  const defaultTakeawaysHi = [
    'हस्ताक्षर या भुगतान करने से पहले हमेशा तथ्यों की पुष्टि करें।',
    'उन एसेट्स पर ध्यान दें जो समय के साथ कंपाउंड होते हैं।',
    'हर शेड्यूल में अनपेक्षित देरी के लिए बफर टाइम ज़रूर रखें।',
  ];

  const defaultTakeawaysEn = [
    'Always verify the facts and legal rights before agreeing.',
    'Focus on assets that compound and put cash flow in your pocket.',
    'Build buffer blocks into every daily schedule.',
  ];

  const takeaways = isHindi
    ? context?.keyTakeaways_hi || context?.keyTakeaways || defaultTakeawaysHi
    : context?.keyTakeaways || defaultTakeawaysEn;

  const bullets = takeaways.map((t, idx) => `${idx + 1}. ${t}`).join('\n');

  const text = isHindi
    ? `🔄 **${lessonTitle} का त्वरित पुनरीक्षण:**\n\n${bullets}\n\nक्या अपनी स्मरण शक्ति परखने के लिए 5 रैपिड-फायर सवालों का क्विज़ खेलें? ⚡`
    : `🔄 **Quick Memory Refresh for ${lessonTitle}:**\n\n${bullets}\n\nWant to do a rapid-fire sprint to test retention? 5 quick questions! ⚡`;

  const quickActions = isHindi
    ? [
        '🎯 रैपिड-फायर क्विज़ शुरू करें',
        '😂 मज़ाकिया अंदाज़ में समझाओ',
        'असली उदाहरण दो',
        'मैं आगे पढ़ने के लिए तैयार हूँ',
      ]
    : [
        '🎯 Start Rapid-Fire Quiz',
        '😂 Make it funny',
        'Give real-life scenario',
        "I'm ready to continue reading",
      ];

  return {
    id: generateId(),
    sender: 'tia',
    text,
    mode: 'revision',
    timestamp: Date.now(),
    quickActions,
  };
}

/**
 * 8. General Conversational Message Handler
 *
 * CRITICAL RULE:
 * Tia's output language is strictly determined by currentLanguage (Hindi vs English),
 * NOT simply by the language of the user's sentence.
 *
 * If currentLanguage === 'hi':
 * - Even if user asks "What is inflation?", Tia responds in Hindi.
 * If currentLanguage === 'en':
 * - Even if user asks "Inflation kya hota hai?", Tia responds in English.
 */
export async function sendTextMessage(
  userText: string,
  context?: TiaLessonContext,
  mode: TiaMode = 'chat',
  currentLanguage: AppLanguage = 'en',
  conversationHistory: TiaMessage[] = []
): Promise<TiaMessage> {
  const isHindi = currentLanguage === 'hi';
  const cleanInput = (userText || '').trim();

  // 1. Try Server-Side API first (Universal AI Learning Assistant Pipeline)
  try {
    const response = await fetch('/api/tia/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: cleanInput,
        context,
        mode,
        language: currentLanguage,
        conversationHistory: conversationHistory.slice(-6),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.ok && data?.message) {
        return data.message;
      }
    }
  } catch (apiErr) {
    console.warn('Tia chat API network issue:', apiErr);
  }

  // 2. Failure Fallback: NEVER show the current lesson as the answer for unrelated questions.
  // Return the friendly, graceful connection retry message requested by user.
  const courseName = context?.subjectName || (isHindi ? 'वर्तमान कोर्स' : 'current course');
  const fallbackText = isHindi
    ? 'Oops, Tia ka connection thoda slow ho gaya 😅. Ek baar phir try karo.'
    : "Oops, Tia's connection hit a slight bump 😅. Please try asking again!";
  const fallbackSpeech = isHindi
    ? 'Oops, Tia ka connection thoda slow ho gaya. Ek baar phir try karo.'
    : "Oops, Tia's connection hit a slight bump. Please try asking again!";

  return {
    id: generateId(),
    sender: 'tia',
    text: fallbackText,
    speechText: fallbackSpeech,
    mode: 'chat',
    timestamp: Date.now(),
    quickActions: isHindi
      ? ['फिर से पूछें', `💡 ${courseName} समझाइए`, '🎯 झटपट क्विज़']
      : ['Ask again', `💡 Explain ${courseName}`, '🎯 Quick quiz'],
  };
}

/**
 * 9. Send Voice Message
 */
export async function sendVoiceMessage(
  transcript: string,
  context?: TiaLessonContext,
  mode: TiaMode = 'chat',
  currentLanguage: AppLanguage = 'en',
  conversationHistory: TiaMessage[] = []
): Promise<TiaMessage> {
  const response = await sendTextMessage(
    transcript,
    context,
    mode,
    currentLanguage,
    conversationHistory
  );
  response.isVoice = true;
  return response;
}
