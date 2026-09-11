import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Award,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { Lesson, SubjectId, TiaMode } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { scrollToTop, useScrollToTop } from '../../lib/scrollHelper';
import { TiaAvatar } from '../tia/TiaAvatar';

interface LessonPlayerProps {
  lesson: Lesson;
  onBack: () => void;
  onStartQuiz: () => void;
  onOpenTia?: (mode?: TiaMode) => void;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lesson,
  onBack,
  onStartQuiz,
  onOpenTia,
}) => {
  const { language } = useLanguage();

  // Steps: 0 = Hook & Intro, 1..N = Concept Sections, N+1 = Real-life Example, (N+2 = Activity if present), last = Key Takeaways
  const sections = lesson?.sections || [];
  const totalSections = sections.length;
  const hasActivity = Boolean(lesson?.practical_activity);
  const totalSteps = totalSections + (hasActivity ? 4 : 3);
  const activityStepIndex = hasActivity ? totalSections + 2 : -1;
  const takeawaysStepIndex = totalSteps - 1;
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Automatically scroll to top when lesson opens or currentStep changes
  useScrollToTop([lesson.id, currentStep], { behavior: 'instant' });

  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      scrollToTop({ behavior: 'instant' });
    } else {
      onStartQuiz();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToTop({ behavior: 'instant' });
    } else {
      onBack();
    }
  };

  const getSubjectBadge = (id: SubjectId) => {
    if (language === 'hi') {
      switch (id) {
        case 'law-rights':
          return '⚖️ विधि एवं अधिकार';
        case 'money-finance':
          return '💰 धन एवं वित्त';
        case 'economics':
          return '📊 अर्थशास्त्र';
        case 'bihar-gk':
          return '🏛️ बिहार सामान्य ज्ञान';
        case 'polity-constitution':
          return '📜 राजव्यवस्था व संविधान';
        case 'history-movement':
          return '🏺 इतिहास व आंदोलन';
        case 'personality-development':
          return '🌟 व्यक्तित्व विकास';
        case 'dressing-sense':
          return '👔 ड्रेसिंग सेंस';
        case 'case-studies':
          return '💼 केस स्टडीज़';
        case 'time-management':
          return '⏰ समय प्रबंधन';
        default:
          return '📚 पाठ्यक्रम';
      }
    }
    switch (id) {
      case 'law-rights':
        return '⚖️ Law & Rights';
      case 'money-finance':
        return '💰 Money & Finance';
      case 'economics':
        return '📊 Economics';
      case 'bihar-gk':
        return '🏛️ Bihar Special GK';
      case 'polity-constitution':
        return '📜 Indian Polity & Constitution';
      case 'history-movement':
        return '🏺 History & Movement';
      case 'personality-development':
        return '🌟 Personality Development';
      case 'dressing-sense':
        return '👔 Dressing Sense';
      case 'case-studies':
        return '💼 Case Studies';
      case 'time-management':
        return '⏰ Time Management';
      default:
        return '📚 Course';
    }
  };

  const lessonTitle = language === 'hi' && lesson.title_hi ? lesson.title_hi : (lesson.title_en || lesson.title);
  const lessonSubtitle = language === 'hi' && lesson.subtitle_hi ? lesson.subtitle_hi : (lesson.subtitle_en || lesson.subtitle);
  const lessonHook = language === 'hi' && lesson.hook_hi ? lesson.hook_hi : (lesson.hook_en || lesson.hook);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Header with Exit and Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black transition-colors px-3 py-1.5 rounded-full border border-black/5 bg-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'पाठ से बाहर आएं' : 'Exit Lesson'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono font-medium text-gray-500">
            <span>
              {language === 'hi'
                ? `चरण ${currentStep + 1} / ${totalSteps}`
                : `Step ${currentStep + 1} of ${totalSteps}`}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#1A1A1A] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Lesson Meta Banner */}
      <div className="flex items-center justify-between text-xs text-gray-500 border-b border-black/5 pb-3">
        <span className="font-bold text-[#1A1A1A] bg-[#F5F5F0] px-3 py-1 rounded-full border border-black/5">
          {getSubjectBadge(lesson.subject_id)}
        </span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {lesson.estimated_minutes} {language === 'hi' ? 'मिनट' : 'min read'}
          </span>
          <span className="flex items-center gap-1 font-mono">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            {language === 'hi'
              ? (lesson.difficulty === 'Beginner' ? 'सरल' : lesson.difficulty === 'Intermediate' ? 'मध्यम' : 'उन्नत')
              : lesson.difficulty}
          </span>
        </div>
      </div>

      {/* Tia AI Learning Companion Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#FFFBEB] via-[#FFF5F5] to-[#F0FDF4] border border-black/5 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <TiaAvatar state="idle" size="sm" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-[#1A1A1A]">Tia Learning Companion</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-200/50 text-[#8C5E1A]">AI Voice</span>
            </div>
            <span className="text-[11px] text-gray-600 block">
              {language === 'hi' ? 'कोई भी संदेह पूछें या मजेदार अंदाज में समझें' : 'Stuck or want a fun breakdown?'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenTia?.('explain')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/10 text-xs font-bold text-[#1A1A1A] transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'hi' ? 'टिया से समझें' : 'Explain with Tia'}</span>
          </button>
          <button
            onClick={() => onOpenTia?.('funny')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/10 text-xs font-bold text-[#1A1A1A] transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <span>😂</span>
            <span>{language === 'hi' ? 'मजेदार बनाएं' : 'Make It Funny'}</span>
          </button>
        </div>
      </div>

      {/* Step 0: The Relatable Hook */}
      {currentStep === 0 && (
        <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-black/5 p-6 sm:p-9 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <span className="text-[10px] font-bold text-[#8C5E1A] uppercase tracking-widest bg-[#FEF2E0] px-3 py-1 rounded-full border border-[#F5D7A1]">
              {language === 'hi' ? 'वास्तविक जीवन संदर्भ' : 'The Real-Life Hook'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif italic text-[#1A1A1A] tracking-tight mt-3 leading-tight">
              {lessonTitle}
            </h1>
            {lessonSubtitle && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-light">
                {lessonSubtitle}
              </p>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-[#F5F5F0] border-l-4 border-[#1A1A1A] text-[#1A1A1A] text-base font-serif italic leading-relaxed">
            <p>"{lessonHook}"</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-black/5 flex items-start gap-3.5">
            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700 leading-relaxed font-light">
              {language === 'hi'
                ? 'इस 10-मिनट के सूक्ष्म-पाठ में, आप इस विषय के व्यावहारिक नियम और निर्णय लेने के सही तरीके सीखेंगे।'
                : 'In this 10-minute micro-lesson, you will learn the exact practical mechanism behind this situation and how to protect yourself or make better decisions.'}
            </p>
          </div>
        </div>
      )}

      {/* Steps 1..N: Concept Sections */}
      {currentStep >= 1 && currentStep <= totalSections && (
        <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-black/5 p-6 sm:p-9 shadow-sm space-y-5 animate-fadeIn">
          {(() => {
            const section = lesson.sections[currentStep - 1];
            const secTitle = language === 'hi' && section.title_hi ? section.title_hi : section.title;
            const secContent = language === 'hi' && section.content_hi ? section.content_hi : section.content;
            const secHighlight = language === 'hi' && section.highlight_hi ? section.highlight_hi : section.highlight;

            return (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xs">
                    {currentStep}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif italic text-[#1A1A1A]">
                    {secTitle}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light whitespace-pre-line">
                  {secContent}
                </p>

                {secHighlight && (
                  <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-black/5 text-[#1A1A1A] text-xs font-semibold leading-relaxed flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{secHighlight}</span>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* Step N+1: Practical Scenario & Analysis */}
      {currentStep === totalSections + 1 && (
        <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-black/5 p-6 sm:p-9 shadow-sm space-y-5 animate-fadeIn">
          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>{language === 'hi' ? 'व्यावहारिक परिस्थिति विश्लेषण' : 'Practical Scenario Analysis'}</span>
          </div>

          <h2 className="text-2xl font-serif italic text-[#1A1A1A]">
            {language === 'hi' ? 'वास्तविक जीवन में अनुप्रयोग' : 'Real-World Application'}
          </h2>

          <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-black/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {language === 'hi' ? 'परिस्थिति' : 'The Scenario'}
            </span>
            <p className="text-xs sm:text-sm text-gray-800 mt-1 leading-relaxed font-light">
              {language === 'hi' && lesson.practical_example.scenario_hi
                ? lesson.practical_example.scenario_hi
                : lesson.practical_example.scenario}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#E6F4EA] border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
              {language === 'hi' ? 'विश्लेषण' : 'The Analysis'}
            </span>
            <p className="text-xs sm:text-sm text-emerald-950 mt-1 leading-relaxed font-light">
              {language === 'hi' && lesson.practical_example.analysis_hi
                ? lesson.practical_example.analysis_hi
                : lesson.practical_example.analysis}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FEF2E0] border border-[#F5D7A1] flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold text-[#8C5E1A] uppercase tracking-widest">
                {language === 'hi' ? 'कार्रवाई योग्य नियम' : 'Actionable Rule'}
              </span>
              <p className="text-xs sm:text-sm text-[#8C5E1A] mt-0.5 leading-relaxed font-medium">
                {language === 'hi' && lesson.practical_example.actionable_tip_hi
                  ? lesson.practical_example.actionable_tip_hi
                  : lesson.practical_example.actionable_tip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step N+2: Practical Activity (if present) */}
      {hasActivity && currentStep === activityStepIndex && lesson.practical_activity && (
        <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-black/5 p-6 sm:p-9 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <span className="text-[10px] font-bold text-[#1A5E8C] uppercase tracking-widest bg-[#E0F2FE] px-3 py-1 rounded-full border border-sky-200">
              {language === 'hi' ? 'व्यावहारिक अभ्यास (3-5 मिनट)' : `Practical Activity (${lesson.practical_activity.time_minutes || 5} mins)`}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A] mt-2">
              {language === 'hi' && lesson.practical_activity.title_hi
                ? lesson.practical_activity.title_hi
                : lesson.practical_activity.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-light leading-relaxed">
              {language === 'hi' && lesson.practical_activity.description_hi
                ? lesson.practical_activity.description_hi
                : lesson.practical_activity.description}
            </p>
          </div>

          {/* Action Steps */}
          {lesson.practical_activity.steps && lesson.practical_activity.steps.length > 0 && (
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                {language === 'hi' ? 'चरणबद्ध कार्यविधि:' : 'Step-by-Step Instructions:'}
              </span>
              {(language === 'hi' && lesson.practical_activity.steps_hi && lesson.practical_activity.steps_hi.length > 0
                ? lesson.practical_activity.steps_hi
                : lesson.practical_activity.steps
              ).map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF9F6] border border-black/5 hover:border-black/10 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {sIdx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-800 font-light leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="p-4 rounded-2xl bg-[#E6F4EA] border border-emerald-200 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            <p className="text-xs text-emerald-900 font-medium">
              {language === 'hi'
                ? 'इस गतिविधि को अभी करें। अभ्यास करने से सीखी गई बातें स्थायी स्मृति में परिवर्तित होती हैं।'
                : 'Complete this activity now before proceeding. Real-world practice anchors conceptual knowledge.'}
            </p>
          </div>
        </div>
      )}

      {/* Step: Key Takeaways & Summary */}
      {currentStep === takeawaysStepIndex && (
        <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-black/5 p-6 sm:p-9 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-[#E6F4EA] px-3 py-1 rounded-full border border-emerald-200">
              {language === 'hi' ? 'निष्कर्ष' : 'Summary'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A] mt-2">
              {language === 'hi' ? 'महत्वपूर्ण सीख' : 'Key Takeaways'}
            </h2>
            <p className="text-xs text-gray-500 mt-1 font-light">
              {language === 'hi'
                ? 'दैनिक जीवन और परीक्षा हेतु इन मुख्य बिंदुओं को स्मरण रखें:'
                : 'Remember these core practical principles for everyday decisions:'}
            </p>
          </div>

          <div className="space-y-3">
            {((language === 'hi' && lesson.key_takeaways_hi && lesson.key_takeaways_hi.length > 0)
              ? lesson.key_takeaways_hi
              : lesson.key_takeaways
            ).map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F5F5F0] border border-black/5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-800 font-light leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-white/60 uppercase tracking-widest">
                {language === 'hi' ? 'प्रश्नोत्तरी के लिए तैयार' : 'Ready for Quiz'}
              </span>
              <p className="text-sm font-bold text-white">
                {language === 'hi' ? 'प्रश्नों के उत्तर दें और +20 XP प्राप्त करें' : 'Answer questions to earn +20 XP'}
              </p>
            </div>
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
        </div>
      )}

      {/* Tia Helper Prompt */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 py-1">
        <span>{language === 'hi' ? 'कोई संदेह है?' : 'Confused about anything here?'}</span>
        <button
          onClick={() => onOpenTia?.('chat')}
          className="font-bold text-[#1A1A1A] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{language === 'hi' ? 'टिया से पूछें 🎙️' : 'Ask Tia 🎙️'}</span>
        </button>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handlePrev}
          className="py-3.5 px-6 rounded-full border border-black/10 bg-white hover:bg-[#F5F5F0] font-bold text-xs text-[#1A1A1A] transition-colors cursor-pointer"
        >
          {currentStep === 0
            ? (language === 'hi' ? 'बाहर आएं' : 'Exit')
            : (language === 'hi' ? '← पिछला' : '← Previous')}
        </button>

        <button
          onClick={handleNext}
          id="lesson-next-btn"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <span>
            {currentStep === totalSteps - 1
              ? (language === 'hi' ? 'प्रश्नोत्तरी दें →' : 'Take the Quiz →')
              : (language === 'hi' ? 'आगे बढ़ें →' : 'Continue →')}
          </span>
        </button>
      </div>
    </div>
  );
};
