import React, { useState } from 'react';
import {
  Scale,
  Coins,
  TrendingUp,
  Clock,
  Sun,
  Sunset,
  Moon,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Languages,
  MapPin,
  Landmark,
  ScrollText,
  Shirt,
  Lightbulb,
} from 'lucide-react';
import { SubjectId, LearningLevel, DailyMinutes, PreferredTime, LearningGoal } from '../../types';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { triggerConfetti } from '../../lib/confetti';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { savePreferences } = useLearning();
  const { language, setLanguage, t } = useLanguage();

  const [step, setStep] = useState<number>(1);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>([
    'law-rights',
    'money-finance',
    'economics',
    'bihar-gk',
    'polity-constitution',
    'history-movement',
    'personality-development',
    'dressing-sense',
    'case-studies',
    'time-management',
  ]);
  const [level, setLevel] = useState<LearningLevel>('Beginner');
  const [dailyMinutes, setDailyMinutes] = useState<DailyMinutes>(10);
  const [preferredTime, setPreferredTime] = useState<PreferredTime>('Morning');
  const [learningGoal, setLearningGoal] = useState<LearningGoal>(
    'Improve my practical knowledge'
  );
  const [saving, setSaving] = useState<boolean>(false);

  const toggleSubject = (id: SubjectId) => {
    if (selectedSubjects.includes(id)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== id));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, id]);
    }
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      await savePreferences({
        selected_subjects: selectedSubjects,
        level,
        daily_minutes: dailyMinutes,
        preferred_time: preferredTime,
        learning_goal: learningGoal,
        onboarding_completed: true,
      });
      triggerConfetti();
      onComplete();
    } catch (e) {
      console.error('Error saving onboarding preferences:', e);
      onComplete();
    } finally {
      setSaving(false);
    }
  };

  const SUBJECTS_LIST = [
    {
      id: 'law-rights' as SubjectId,
      icon: Scale,
      iconBg: 'bg-[#E0F2FE]',
      iconColor: 'text-[#1A5E8C]',
      title_en: '⚖️ Law & Rights',
      title_hi: '⚖️ कानून एवं अधिकार',
      desc_en: 'FIR rules, arrest rights, cybercrime helpline 1930, consumer claims & tenancy.',
      desc_hi: 'एफआईआर, गिरफ्तारी के अधिकार, साइबर अपराध 1930, उपभोक्ता शिकायत व किरायेदारी।',
    },
    {
      id: 'money-finance' as SubjectId,
      icon: Coins,
      iconBg: 'bg-[#E6F4EA]',
      iconColor: 'text-emerald-800',
      title_en: '💰 Money & Finance',
      title_hi: '💰 धन और वित्त',
      desc_en: '50/30/20 budgeting, compound interest, EMI calculations, credit scores & SIPs.',
      desc_hi: 'बजट नियम, चक्रवृद्धि ब्याज, ईएमआई, क्रेडिट स्कोर व म्यूचुअल फंड एसआईपी।',
    },
    {
      id: 'economics' as SubjectId,
      icon: TrendingUp,
      iconBg: 'bg-[#FEF2E0]',
      iconColor: 'text-[#8C5E1A]',
      title_en: '📊 Economics',
      title_hi: '📊 अर्थशास्त्र',
      desc_en: 'Supply and demand, inflation mechanics, GDP, central bank repo rates & recessions.',
      desc_hi: 'मांग-आपूर्ति, मुद्रास्फीति, जीडीपी, आरबीआई रेपो दर एवं आर्थिक मंदी चक्र।',
    },
    {
      id: 'bihar-gk' as SubjectId,
      icon: MapPin,
      iconBg: 'bg-[#FDF2F8]',
      iconColor: 'text-[#9D174D]',
      title_en: '🏛️ Bihar Special GK',
      title_hi: '🏛️ बिहार सामान्य ज्ञान',
      desc_en: 'Ancient Bihar, 2011 Census, climate, rivers, minerals, tourism & administrative structure.',
      desc_hi: 'प्राचीन बिहार, 2011 जनगणना, नदियाँ, खनिज, पर्यटन व प्रशासनिक ढांचा।',
    },
    {
      id: 'polity-constitution' as SubjectId,
      icon: Landmark,
      iconBg: 'bg-[#F5F3FF]',
      iconColor: 'text-[#5B21B6]',
      title_en: '📜 Indian Polity & Constitution',
      title_hi: '📜 भारतीय राजव्यवस्था एवं संविधान',
      desc_en: 'Preamble, Fundamental Rights & Duties, Parliament, Supreme Court & Amendments.',
      desc_hi: 'प्रस्तावना, मौलिक अधिकार व कर्तव्य, संसद, सर्वोच्च न्यायालय व महत्वपूर्ण संशोधन।',
    },
    {
      id: 'history-movement' as SubjectId,
      icon: ScrollText,
      iconBg: 'bg-[#FFFBEB]',
      iconColor: 'text-[#92400E]',
      title_en: '🏺 Indian History & National Movement',
      title_hi: '🏺 भारतीय इतिहास एवं राष्ट्रीय आंदोलन',
      desc_en: 'Indus Valley, Maurya & Gupta, 1857 Revolt, Champaran Satyagraha & 1947 Freedom.',
      desc_hi: 'सिंधु सभ्यता, मौर्य व गुप्त साम्राज्य, 1857 क्रांति, चंपारण सत्याग्रह व स्वतंत्रता।',
    },
    {
      id: 'personality-development' as SubjectId,
      icon: Sparkles,
      iconBg: 'bg-[#E6FFFA]',
      iconColor: 'text-[#0D9488]',
      title_en: '✨ Personality Development',
      title_hi: '✨ व्यक्तित्व विकास',
      desc_en: 'Body language, public speaking, assertiveness, emotional intelligence & leadership.',
      desc_hi: 'शारीरिक भाषा, मंच पर वक्तृत्व, आत्मविश्वास, भावनात्मक बुद्धिमत्ता एवं नेतृत्व।',
    },
    {
      id: 'dressing-sense' as SubjectId,
      icon: Shirt,
      iconBg: 'bg-[#EDE9FE]',
      iconColor: 'text-[#7C3AED]',
      title_en: '👔 Dressing Sense',
      title_hi: '👔 ड्रेसिंग सेंस एवं सलीका',
      desc_en: 'Body proportions, color coordination, 12-piece capsule wardrobe & formal elegance.',
      desc_hi: 'शारीरिक अनुपात, सही नाप, रंगों का मेल, 12-वस्त्र कैप्सूल वॉर्डरोब और फॉर्मल गरिमा।',
    },
    {
      id: 'case-studies' as SubjectId,
      icon: Lightbulb,
      iconBg: 'bg-[#FEF3C7]',
      iconColor: 'text-amber-800',
      title_en: '💡 Case Studies: Real-World Business Stories',
      title_hi: '💡 केस स्टडीज़: बिज़नेस और सफलता की कहानियां',
      desc_en: 'Airbnb, Zerodha, Amul, Canva, OYO, Dhirubhai Ambani, Spanx & Patagonia.',
      desc_hi: 'Airbnb, Zerodha, Amul, Canva, OYO, धीरूभाई अंबानी, Spanx व Patagonia।',
    },
    {
      id: 'time-management' as SubjectId,
      icon: Clock,
      iconBg: 'bg-[#CCFBF1]',
      iconColor: 'text-teal-800',
      title_en: '⏱️ Time Management',
      title_hi: '⏱️ समय प्रबंधन एवं कार्यकुशलता',
      desc_en: 'Eisenhower matrix, Pomodoro, calendar blocking, saying no & GTD weekly review.',
      desc_hi: 'आइजनहावर मैट्रिक्स, पोमोडोरो, टाइम-ब्लॉकिंग, ना कहने की कला व GTD वीकली रिव्यू।',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col justify-center py-8 px-4 sm:px-6 animate-fadeIn">
      <div className="max-w-md mx-auto w-full">
        {/* Top Language Bar */}
        <div className="flex items-center justify-between mb-4 bg-white px-4 py-2.5 rounded-full border border-black/5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <Languages className="w-4 h-4 text-[#1A1A1A]" />
            <span>{language === 'hi' ? 'भाषा चुनें:' : 'Language:'}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                language === 'hi'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest font-semibold">
            <span>{language === 'hi' ? `चरण ${step} / 5` : `Step ${step} of 5`}</span>
            <span>{Math.round((step / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#1A1A1A] h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Subjects Selection */}
        {step === 1 && (
          <div className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[36px] border border-black/5 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest block mb-1">
                {language === 'hi' ? 'पाठ्यक्रम चयन' : 'Domain Curriculum'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A]">
                {language === 'hi' ? 'आप क्या सीखना चाहते हैं?' : 'What do you want to learn?'}
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-light">
                {language === 'hi'
                  ? 'अपने दैनिक अध्ययन के लिए विषय चुनें (सभी 6 विषय उपलब्ध हैं):'
                  : 'Select one or more essential domains to customize your daily microlearning missions.'}
              </p>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {SUBJECTS_LIST.map((subj) => {
                const isSelected = selectedSubjects.includes(subj.id);
                const IconComponent = subj.icon;
                return (
                  <div
                    key={subj.id}
                    onClick={() => toggleSubject(subj.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#1A1A1A] bg-[#F5F5F0] text-[#1A1A1A]'
                        : 'border-black/5 hover:border-black/20 bg-white text-gray-700'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${subj.iconBg} flex items-center justify-center ${subj.iconColor} flex-shrink-0`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif italic font-bold text-sm text-[#1A1A1A]">
                          {language === 'hi' ? subj.title_hi : subj.title_en}
                        </h3>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed font-light">
                        {language === 'hi' ? subj.desc_hi : subj.desc_en}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              id="onboarding-next-1"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black transition-all shadow-md cursor-pointer"
            >
              <span>{language === 'hi' ? 'आगे बढ़ें' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Level Selection */}
        {step === 2 && (
          <div className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[36px] border border-black/5 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest block mb-1">
                {language === 'hi' ? 'अध्ययन स्तर' : 'Experience'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A]">
                {language === 'hi' ? 'आपका वर्तमान स्तर क्या है?' : 'What is your current level?'}
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-light">
                {language === 'hi'
                  ? 'हम आपके स्तर के अनुसार भाषा की जटिलता और उदाहरणों का चयन करेंगे।'
                  : 'We will match lesson pacing and terminology to your baseline.'}
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'Beginner' as LearningLevel,
                  title: language === 'hi' ? 'आरंभिक (Beginner)' : 'Beginner',
                  desc: language === 'hi'
                    ? 'विषयों में नए हैं; सरल उदाहरण और बिना किसी कठिन शब्दावली के सीखना चाहते हैं।'
                    : 'New to these topics; prefer simple real-life analogies and zero jargon.',
                },
                {
                  id: 'Intermediate' as LearningLevel,
                  title: language === 'hi' ? 'मध्यम (Intermediate)' : 'Intermediate',
                  desc: language === 'hi'
                    ? 'बुनियादी जानकारी है; व्यावहारिक नियम, कानून और सटीक तथ्य जानना चाहते हैं।'
                    : 'Have basic general awareness; want practical rules, laws, and calculations.',
                },
                {
                  id: 'Advanced' as LearningLevel,
                  title: language === 'hi' ? 'उन्नत (Advanced)' : 'Advanced',
                  desc: language === 'hi'
                    ? 'अवधारणाएं स्पष्ट हैं; परीक्षा स्तर की बारीकियां और केस स्टडीज समझना चाहते हैं।'
                    : 'Comfortable with concepts; seeking deep technical nuances and edge cases.',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLevel(item.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    level === item.id
                      ? 'border-[#1A1A1A] bg-[#F5F5F0] text-[#1A1A1A]'
                      : 'border-black/5 hover:border-black/20 bg-white text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif italic font-bold text-base text-[#1A1A1A]">{item.title}</h3>
                    {level === item.id && <CheckCircle2 className="w-4 h-4 text-[#1A1A1A]" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-gray-500 hover:text-black border border-black/10 transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'पीछे' : 'Back'}
              </button>
              <button
                onClick={() => setStep(3)}
                id="onboarding-next-2"
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black transition-all shadow-md cursor-pointer"
              >
                <span>{language === 'hi' ? 'आगे बढ़ें' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Daily Learning Time */}
        {step === 3 && (
          <div className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[36px] border border-black/5 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest block mb-1">
                {language === 'hi' ? 'दैनिक प्रतिबद्धता' : 'Daily Habit'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A]">
                {language === 'hi' ? 'आप रोज़ कितना समय दे सकते हैं?' : 'How much time can you commit?'}
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-light">
                {language === 'hi'
                  ? 'लगातार 10 मिनट का अभ्यास लंबे सत्रों से कहीं अधिक फलदायी होता है।'
                  : 'Consistent short bursts form lasting neural retention.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setDailyMinutes(10)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all text-center ${
                  dailyMinutes === 10
                    ? 'border-[#1A1A1A] bg-[#F5F5F0] text-[#1A1A1A]'
                    : 'border-black/5 hover:border-black/20 bg-white text-gray-700'
                }`}
              >
                <Clock className="w-6 h-6 mx-auto text-[#1A1A1A] mb-2" />
                <h3 className="font-serif italic font-bold text-lg text-[#1A1A1A]">
                  10 {language === 'hi' ? 'मिनट' : 'Minutes'}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 font-light">
                  {language === 'hi' ? '1 पाठ + 1 प्रश्नोत्तरी' : '1 lesson + 1 quiz'}
                </p>
                <span className="inline-block mt-3 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1A1A1A] text-white">
                  {language === 'hi' ? 'अनुशंसित' : 'Recommended'}
                </span>
              </div>

              <div
                onClick={() => setDailyMinutes(20)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all text-center ${
                  dailyMinutes === 20
                    ? 'border-[#1A1A1A] bg-[#F5F5F0] text-[#1A1A1A]'
                    : 'border-black/5 hover:border-black/20 bg-white text-gray-700'
                }`}
              >
                <Sparkles className="w-6 h-6 mx-auto text-[#1A1A1A] mb-2" />
                <h3 className="font-serif italic font-bold text-lg text-[#1A1A1A]">
                  20 {language === 'hi' ? 'मिनट' : 'Minutes'}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 font-light">
                  {language === 'hi' ? '2 पाठ + दोहराव' : '2 lessons + revision'}
                </p>
                <span className="inline-block mt-3 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-700">
                  {language === 'hi' ? 'त्वरित' : 'Accelerated'}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-gray-500 hover:text-black border border-black/10 transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'पीछे' : 'Back'}
              </button>
              <button
                onClick={() => setStep(4)}
                id="onboarding-next-3"
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black transition-all shadow-md cursor-pointer"
              >
                <span>{language === 'hi' ? 'आगे बढ़ें' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Preferred Learning Time */}
        {step === 4 && (
          <div className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[36px] border border-black/5 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest block mb-1">
                {language === 'hi' ? 'समय निर्धारण' : 'Routine'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A]">
                {language === 'hi' ? 'आप कब पढ़ना पसंद करते हैं?' : 'When do you prefer to learn?'}
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-light">
                {language === 'hi'
                  ? 'हम आपके अनुसार समय पर अभ्यास का ध्यान रखेंगे।'
                  : 'We will optimize your daily mission prompt for your rhythm.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  id: 'Morning' as PreferredTime,
                  title: language === 'hi' ? 'सुबह' : 'Morning',
                  icon: Sun,
                  time: language === 'hi' ? 'सुबह 7 - 11 बजे' : '7 AM - 11 AM',
                },
                {
                  id: 'Afternoon' as PreferredTime,
                  title: language === 'hi' ? 'दोपहर' : 'Afternoon',
                  icon: Clock,
                  time: language === 'hi' ? 'दोपहर 12 - 4 बजे' : '12 PM - 4 PM',
                },
                {
                  id: 'Evening' as PreferredTime,
                  title: language === 'hi' ? 'शाम' : 'Evening',
                  icon: Sunset,
                  time: language === 'hi' ? 'शाम 5 - 9 बजे' : '5 PM - 9 PM',
                },
                {
                  id: 'Custom' as PreferredTime,
                  title: language === 'hi' ? 'लचीला समय' : 'Night / Flexible',
                  icon: Moon,
                  time: language === 'hi' ? 'जब भी समय मिले' : 'Whenever free',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => setPreferredTime(item.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      preferredTime === item.id
                        ? 'border-[#1A1A1A] bg-[#F5F5F0] text-[#1A1A1A]'
                        : 'border-black/5 hover:border-black/20 bg-white text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-[#1A1A1A] mb-1.5" />
                    <h3 className="font-serif italic font-bold text-sm text-[#1A1A1A]">{item.title}</h3>
                    <p className="text-[10px] text-gray-400 font-mono">{item.time}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-gray-500 hover:text-black border border-black/10 transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'पीछे' : 'Back'}
              </button>
              <button
                onClick={() => setStep(5)}
                id="onboarding-next-4"
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black transition-all shadow-md cursor-pointer"
              >
                <span>{language === 'hi' ? 'आगे बढ़ें' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Learning Goal & Ready Confirmation */}
        {step === 5 && (
          <div className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[36px] border border-black/5 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest block mb-1">
                {language === 'hi' ? 'अंतिम लक्ष्य' : 'Objective'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A]">
                {language === 'hi' ? 'आपका प्राथमिक लक्ष्य क्या है?' : 'What is your primary goal?'}
              </h2>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 'Improve my practical knowledge' as LearningGoal,
                  title: language === 'hi' ? 'व्यावहारिक जीवन का ज्ञान बढ़ाना' : 'Improve my practical knowledge',
                },
                {
                  id: 'Build strong fundamentals' as LearningGoal,
                  title: language === 'hi' ? 'मजबूत बुनियादी समझ विकसित करना' : 'Build strong fundamentals',
                },
                {
                  id: 'Prepare for future exams' as LearningGoal,
                  title: language === 'hi' ? 'प्रतियोगी परीक्षाओं की तैयारी' : 'Prepare for future exams',
                },
                {
                  id: 'Become better at everyday decision-making' as LearningGoal,
                  title: language === 'hi' ? 'दैनिक वित्तीय और विधिक निर्णयों में सक्षम बनना' : 'Become better at everyday decision-making',
                },
              ].map((goalItem) => (
                <div
                  key={goalItem.id}
                  onClick={() => setLearningGoal(goalItem.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    learningGoal === goalItem.id
                      ? 'border-[#1A1A1A] bg-[#F5F5F0] text-[#1A1A1A]'
                      : 'border-black/5 hover:border-black/20 bg-white text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-[#1A1A1A]" />
                    <span className="text-xs font-serif italic text-[#1A1A1A] font-semibold">{goalItem.title}</span>
                  </div>
                  {learningGoal === goalItem.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#1A1A1A]" />
                  )}
                </div>
              ))}
            </div>

            {/* Ready Card Box */}
            <div className="p-5 rounded-2xl bg-[#1A1A1A] text-white">
              <div className="flex items-center gap-2 text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'प्रारंभ करने के लिए तैयार' : 'Ready to Launch'}</span>
              </div>
              <p className="text-base font-serif italic text-white">
                {language === 'hi'
                  ? '“आपकी व्यक्तिगत अध्ययन यात्रा तैयार हो गई है।”'
                  : '“Your personalized learning journey is ready.”'}
              </p>
              <p className="text-xs text-white/70 mt-1 font-light">
                {dailyMinutes} {language === 'hi' ? 'मिनट/दिन' : 'mins/day'} · {level} · {selectedSubjects.length} {language === 'hi' ? 'विषय' : 'subjects'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(4)}
                className="py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-gray-500 hover:text-black border border-black/10 transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'पीछे' : 'Back'}
              </button>
              <button
                onClick={handleFinish}
                disabled={saving}
                id="start-learning-btn"
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    <span>{language === 'hi' ? 'अध्ययन प्रारंभ करें' : 'Start Learning'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
