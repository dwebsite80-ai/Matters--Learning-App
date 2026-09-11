import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppLanguage } from '../types';

interface LanguageContextType {
  language: AppLanguage;
  currentLanguage: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  toggleLanguage: () => void;
  localize: (enText?: string, hiText?: string) => string;
  t: (key: string, fallback?: string) => string;
}

const STORAGE_LANG_KEY = 'matters_app_language';

// Comprehensive UI Translations dictionary
const UI_TRANSLATIONS: Record<string, { en: string; hi: string }> = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.curriculum': { en: 'Curriculum', hi: 'पाठ्यक्रम' },
  'nav.revision': { en: 'Revision', hi: 'पुनरीक्षण' },
  'nav.analytics': { en: 'Analytics', hi: 'प्रगति' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफ़ाइल' },
  'nav.streak': { en: 'Streak', hi: 'दिन स्ट्रीक' },
  'nav.xp': { en: 'XP', hi: 'नॉलेज XP' },

  // Home Dashboard
  'home.badge': { en: 'Daily Knowledge Capsule', hi: 'दैनिक ज्ञान कैप्सूल' },
  'home.todays_mission': { en: "Today's Mission", hi: 'आज का मुख्य पाठ' },
  'home.mission_title': { en: "Today's Core Mission", hi: 'आज का मुख्य पाठ' },
  'home.mission_desc': { en: 'A curated 10-minute micro-lesson to upgrade your understanding.', hi: 'आपके ज्ञान और समझ को मजबूत बनाने के लिए 10 मिनट का सूक्ष्म पाठ।' },
  'home.start_mission': { en: 'Start Today’s Mission', hi: 'आज का पाठ शुरू करें' },
  'home.continue_mission': { en: 'Continue Mission', hi: 'पाठ जारी रखें' },
  'home.completed_mission': { en: 'Mission Completed Today', hi: 'आज का पाठ पूरा हुआ' },
  'home.quick_revision': { en: 'Spaced Recall Sprint', hi: 'त्वरित पुनरीक्षण' },
  'home.revision_card_title': { en: 'Spaced Recall Sprint', hi: 'दैनिक त्वरित पुनरीक्षण' },
  'home.revision_card_desc': { en: 'Strengthen memory with 5 rapid-fire questions from previous lessons.', hi: 'पिछले पाठों से 5 त्वरित प्रश्नों के साथ अपनी स्मरण शक्ति मजबूत करें।' },
  'home.start_sprint': { en: 'Start 3-Min Sprint', hi: '3-मिनट रिवीजन शुरू करें' },
  'home.courses_heading': { en: 'All 6 Courses & Roadmap', hi: 'सभी 6 पाठ्यक्रम एवं अध्ययन योजना' },
  'home.courses_subheading': { en: 'Structured modules for practical life & competitive exams.', hi: 'व्यावहारिक जीवन और प्रतियोगी परीक्षाओं के लिए विशेष संरचित मॉड्यूल।' },
  'home.lessons_count': { en: 'Lessons', hi: 'पाठ' },
  'home.view_all': { en: 'View All Courses', hi: 'सभी पाठ्यक्रम देखें' },

  // Lesson Player
  'lesson.back': { en: 'Back to Roadmap', hi: 'वापस पाठ्यक्रम पर जाएँ' },
  'lesson.hook': { en: 'Real-World Hook', hi: 'व्यावहारिक परिप्रेक्ष्य' },
  'lesson.key_takeaways': { en: 'Core Takeaways', hi: 'मुख्य निष्कर्ष' },
  'lesson.practical_case': { en: 'Real-Life Scenario & Exam Application', hi: 'वास्तविक उदाहरण एवं परीक्षा उपयोग' },
  'lesson.analysis': { en: 'Critical Analysis', hi: 'गहन विश्लेषण' },
  'lesson.actionable_tip': { en: 'Exam & Practical Tip', hi: 'परीक्षा एवं व्यावहारिक सुझाव' },
  'lesson.prev_step': { en: 'Previous Step', hi: 'पिछला चरण' },
  'lesson.next_step': { en: 'Next Step', hi: 'अगला चरण' },
  'lesson.take_quiz': { en: 'Take 5-Question Quiz', hi: '5-प्रश्नों की प्रश्नोत्तरी शुरू करें' },
  'lesson.step': { en: 'Step', hi: 'चरण' },
  'lesson.of': { en: 'of', hi: 'का' },

  // Quiz Player
  'quiz.title': { en: 'Knowledge Check', hi: 'ज्ञान परीक्षण' },
  'quiz.progress': { en: 'Question', hi: 'प्रश्न' },
  'quiz.submit': { en: 'Submit Answer', hi: 'उत्तर जमा करें' },
  'quiz.next': { en: 'Next Question', hi: 'अगला प्रश्न' },
  'quiz.finish': { en: 'Complete & Claim XP', hi: 'समाप्त करें और XP अर्जित करें' },
  'quiz.correct': { en: 'Well Done! Correct Answer', hi: 'शाबाश! बिल्कुल सही उत्तर' },
  'quiz.incorrect': { en: 'Incorrect', hi: 'गलत उत्तर' },
  'quiz.correct_is': { en: 'Correct answer was option', hi: 'सही उत्तर विकल्प है:' },
  'quiz.explanation': { en: 'Exam Explanation', hi: 'परीक्षा व्याख्या एवं विवरण' },
  'quiz.results_title': { en: 'Quiz Results', hi: 'प्रश्नोत्तरी परिणाम' },
  'quiz.congrats': { en: 'Congratulations! You completed the lesson quiz.', hi: 'बधाई हो! आपने इस पाठ का क्विज़ पूरा कर लिया है।' },
  'quiz.xp_earned': { en: 'XP Earned', hi: 'अर्जित XP' },
  'quiz.return': { en: 'Return to Learning', hi: 'पाठ्यक्रम पर वापस जाएँ' },

  // Profile & Language
  'profile.title': { en: 'Profile & Preferences', hi: 'प्रोफ़ाइल एवं प्राथमिकताएँ' },
  'profile.subtitle': { en: 'Customize your language, daily goals, and exam preparation subjects.', hi: 'अपनी भाषा, दैनिक लक्ष्य एवं अध्ययन विषयों को अनुकूलित करें।' },
  'profile.language_title': { en: 'Language Preference / भाषा चयन', hi: 'भाषा प्राथमिकता / Language Preference' },
  'profile.language_desc': { en: 'Toggle the application interface and lesson content between English and Hindi.', hi: 'ऐप इंटरफ़ेस और पाठ सामग्री को अंग्रेजी या हिन्दी में प्रदर्शित करें।' },
  'profile.save_btn': { en: 'Update Preferences', hi: 'सेटिंग्स सहेजें' },
  'profile.saved': { en: 'Saved!', hi: 'सहेज लिया गया!' },

  // Onboarding
  'onboarding.welcome': { en: 'Welcome to Matters', hi: 'Matters में आपका स्वागत है' },
  'onboarding.select_lang': { en: 'Select Your Learning Language', hi: 'अपनी अध्ययन भाषा चुनें' },
  'onboarding.lang_sub': { en: 'You can switch anytime in the header or profile settings.', hi: 'आप इसे कभी भी हेडर या प्रोफ़ाइल सेटिंग्स से बदल सकते हैं।' },
  'onboarding.continue': { en: 'Continue', hi: 'आगे बढ़ें' },
  'onboarding.start': { en: 'Start Learning Now', hi: 'अध्ययन प्रारंभ करें' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved === 'en' || saved === 'hi') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch (e) {
      console.error('Error saving language preference', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const localize = (enText?: string, hiText?: string): string => {
    if (language === 'hi' && hiText && hiText.trim().length > 0) {
      return hiText;
    }
    return enText || '';
  };

  const t = (key: string, fallback?: string): string => {
    const item = UI_TRANSLATIONS[key] || UI_TRANSLATIONS[key.toLowerCase()];
    if (!item) {
      if (fallback) return fallback;
      if (key.includes('.')) {
        const lastPart = key.split('.').pop() || key;
        return lastPart.replace(/_/g, ' ');
      }
      return key;
    }
    return language === 'hi' ? item.hi : item.en;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage: language,
        setLanguage,
        toggleLanguage,
        localize,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
