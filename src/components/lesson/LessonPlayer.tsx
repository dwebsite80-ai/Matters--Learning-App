import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Award,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Volume2,
} from 'lucide-react';
import { Lesson, SubjectId, TiaMode } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { scrollToTop, useScrollToTop } from '../../lib/scrollHelper';
import { ALL_LESSONS } from '../../data/initialContent';
import { getLessonImage } from '../../data/courseImages';

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

  // Find next lesson teaser in current subject
  const subjectLessons = ALL_LESSONS.filter((l) => l.subject_id === lesson.subject_id);
  const currentLessonIndex = subjectLessons.findIndex((l) => l.id === lesson.id);
  const lessonNumber = currentLessonIndex >= 0 ? currentLessonIndex + 1 : 1;
  const totalSubjectLessons = subjectLessons.length || 10;

  // Steps: 0 = Hook & Intro, 1..N = Concept Sections, N+1 = Real-life Example, (N+2 = Activity if present), last = Key Takeaways
  const sections = lesson?.sections || [];
  const totalSections = sections.length;
  const hasActivity = Boolean(lesson?.practical_activity);
  const totalSteps = totalSections + (hasActivity ? 4 : 3);
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

  const getSubjectName = (id: SubjectId) => {
    if (language === 'hi') {
      switch (id) {
        case 'law-rights':
          return 'विधि एवं नागरिक अधिकार';
        case 'money-finance':
          return 'धन एवं वित्त';
        case 'economics':
          return 'अर्थशास्त्र';
        case 'bihar-gk':
          return 'बिहार सामान्य ज्ञान';
        case 'polity-constitution':
          return 'राजव्यवस्था व संविधान';
        case 'history-movement':
          return 'इतिहास व आंदोलन';
        case 'personality-development':
          return 'व्यक्तित्व विकास';
        case 'dressing-sense':
          return 'ड्रेसिंग सेंस व सलीका';
        case 'case-studies':
          return 'केस स्टडीज़';
        case 'time-management':
          return 'समय प्रबंधन';
        case 'first-aid':
          return 'प्राथमिक चिकित्सा';
        case 'survival-skills':
          return 'उत्तरजीविता कौशल';
        case 'modern-farming':
          return 'आधुनिक कृषि';
        case 'philosophy':
          return 'दर्शनशास्त्र';
        case 'paradoxes':
          return 'विरोधाभास';
        default:
          return 'पाठ्यक्रम';
      }
    }
    switch (id) {
      case 'law-rights':
        return 'Law & Rights';
      case 'money-finance':
        return 'Money & Finance';
      case 'economics':
        return 'Economics';
      case 'bihar-gk':
        return 'Bihar Special GK';
      case 'polity-constitution':
        return 'Indian Polity & Constitution';
      case 'history-movement':
        return 'History & Movement';
      case 'personality-development':
        return 'Personality Development';
      case 'dressing-sense':
        return 'Dressing Sense';
      case 'case-studies':
        return 'Case Studies';
      case 'time-management':
        return 'Time Management';
      case 'first-aid':
        return 'First Aid & Emergency';
      case 'survival-skills':
        return 'Survival Skills';
      case 'modern-farming':
        return 'Modern Farming';
      case 'philosophy':
        return 'Philosophy';
      case 'paradoxes':
        return 'Paradoxes';
      default:
        return 'Curriculum';
    }
  };

  const getSubjectEmoji = (id: SubjectId) => {
    switch (id) {
      case 'law-rights':
        return '⚖️';
      case 'money-finance':
        return '💰';
      case 'economics':
        return '📊';
      case 'bihar-gk':
        return '🏛️';
      case 'polity-constitution':
        return '📜';
      case 'history-movement':
        return '🏺';
      case 'personality-development':
        return '✨';
      case 'dressing-sense':
        return '👔';
      case 'case-studies':
        return '💡';
      case 'time-management':
        return '⏱️';
      case 'first-aid':
        return '🩹';
      case 'survival-skills':
        return '🔥';
      case 'modern-farming':
        return '🌱';
      case 'philosophy':
        return '🧭';
      case 'paradoxes':
        return '🌀';
      default:
        return '📚';
    }
  };

  const lessonTitle = language === 'hi' && lesson.title_hi ? lesson.title_hi : lesson.title;
  const lessonSubtitle =
    language === 'hi' && lesson.subtitle_hi ? lesson.subtitle_hi : lesson.subtitle;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5 animate-fadeIn pb-32">
      {/* 1. TOP HEADER & PROGRESS */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-black/[0.06] shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-black transition-colors cursor-pointer active:scale-95 shrink-0"
            aria-label="Back to topics"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">{getSubjectName(lesson.subject_id)}</span>
          </button>

          {/* Progress: Lesson X / Y & Percentage */}
          <div className="flex items-center gap-2 font-mono text-xs font-bold shrink-0">
            <span className="text-slate-500 text-[11px]">
              {language === 'hi'
                ? `पाठ ${lessonNumber} / ${totalSubjectLessons}`
                : `Lesson ${lessonNumber} / ${totalSubjectLessons}`}
            </span>
            <span className="text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200/60 text-[10px]">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-violet-600 to-amber-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. LARGE EDUCATIONAL IMAGE / BANNER (MATCHING SPECIFICATION) */}
      <div className="relative h-36 sm:h-48 w-full rounded-3xl overflow-hidden shadow-sm border border-black/10">
        <img
          src={getLessonImage(lesson, lesson.subject_id, lessonTitle)}
          alt={lessonTitle}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-5">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 w-fit">
            <span>{getSubjectEmoji(lesson.subject_id)}</span>
            <span>{getSubjectName(lesson.subject_id)}</span>
            <span>·</span>
            <span>Step {currentStep + 1} of {totalSteps}</span>
          </span>
        </div>
      </div>

      {/* 3. LESSON TITLE & METADATA */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#090D16] font-medium leading-tight tracking-tight">
          {lessonTitle}
        </h1>
        {lessonSubtitle && (
          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
            {lessonSubtitle}
          </p>
        )}

        {/* Metadata: Duration, Difficulty, XP */}
        <div className="flex items-center gap-3 pt-1 text-xs text-slate-500 flex-wrap">
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{lesson.estimated_minutes} {language === 'hi' ? 'मिनट' : 'mins'}</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {language === 'hi'
                ? (lesson.difficulty === 'Beginner' ? 'सरल' : lesson.difficulty === 'Intermediate' ? 'मध्यम' : 'उन्नत')
                : lesson.difficulty}
            </span>
          </span>
          <span>·</span>
          <span className="font-mono font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200/60 text-[11px]">
            +20 XP
          </span>
        </div>
      </div>

      {/* 4. LEARNING CONTENT (THE MAIN FOCUS) */}
      <div className="space-y-5">
        {/* Step 0: Hook & Real-world Introduction */}
        {currentStep === 0 && (
          <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-2xs space-y-5">
            {/* 💡 मुख्य विचार / Key Idea Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 font-mono">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>{language === 'hi' ? 'मुख्य विचार' : 'Core Concept'}</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                {language === 'hi' && lesson.hook_hi ? lesson.hook_hi : lesson.hook}
              </p>
            </div>

            {/* Why This Matters Section */}
            <div className="space-y-2">
              <h3 className="font-serif italic font-bold text-base sm:text-lg text-[#090D16]">
                {language === 'hi' ? 'यह जानना आपके लिए क्यों आवश्यक है?' : 'Why This Matters In Everyday Life'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line">
                {language === 'hi' && lesson.why_it_matters_hi
                  ? lesson.why_it_matters_hi
                  : lesson.why_it_matters}
              </p>
            </div>

            {/* Quote or Core Axiom */}
            {lesson.quote && (
              <div className="border-l-2 border-violet-500 pl-4 py-1 italic text-xs sm:text-sm text-slate-600 font-serif">
                "{lesson.quote}"
              </div>
            )}
          </div>
        )}

        {/* Steps 1..N: Concept Sections */}
        {currentStep >= 1 && currentStep <= totalSections && (
          <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-2xs space-y-5">
            {(() => {
              const sec = sections[currentStep - 1];
              const secTitle = language === 'hi' && sec.title_hi ? sec.title_hi : sec.title;
              const secContent = language === 'hi' && sec.content_hi ? sec.content_hi : sec.content;
              const secHighlight =
                language === 'hi' && sec.highlight_box_hi
                  ? sec.highlight_box_hi
                  : sec.highlight_box;

              return (
                <>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-200/60">
                      {language === 'hi' ? `बिंदु ${currentStep}` : `Part ${currentStep}`}
                    </span>
                    <h2 className="text-lg sm:text-xl font-serif italic text-[#090D16] font-bold mt-1">
                      {secTitle}
                    </h2>
                  </div>

                  {/* Paragraph Spacing & Clean Text */}
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light whitespace-pre-line space-y-3">
                    {secContent}
                  </div>

                  {/* Highlight Block / Important Information */}
                  {secHighlight && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                        {language === 'hi' ? 'विशेष ध्यान दें' : 'Pro Tip / Note'}
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {secHighlight}
                      </p>
                    </div>
                  )}

                  {/* Micro check-in if present */}
                  {sec.check_in_question && (
                    <div className="p-4 rounded-2xl bg-violet-50/70 border border-violet-200/70 space-y-2">
                      <p className="text-xs font-bold text-violet-950 flex items-center gap-1.5 font-mono">
                        <HelpCircle className="w-4 h-4 text-violet-700" />
                        <span>{language === 'hi' ? 'त्वरित विचार' : 'Quick Reflection'}</span>
                      </p>
                      <p className="text-xs text-violet-900 font-light leading-relaxed">
                        {language === 'hi' && sec.check_in_question_hi
                          ? sec.check_in_question_hi
                          : sec.check_in_question}
                      </p>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* Step N+1: Practical Scenario & Analysis */}
        {currentStep === totalSections + 1 && (
          <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-2xs space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/70">
                {language === 'hi' ? 'वास्तविक जीवन केस' : 'Real-World Scenario'}
              </span>
              <h2 className="text-lg sm:text-xl font-serif italic text-[#090D16] font-bold mt-1">
                {language === 'hi'
                  ? (lesson.practical_scenario?.title_hi || 'व्यावहारिक स्थिति एवं विश्लेषण')
                  : (lesson.practical_scenario?.title || 'Practical Application')}
              </h2>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs sm:text-sm text-amber-950 font-light leading-relaxed whitespace-pre-line">
              {language === 'hi' && lesson.practical_scenario?.scenario_hi
                ? lesson.practical_scenario.scenario_hi
                : (lesson.practical_scenario?.scenario || 'Scenario details')}
            </div>

            {lesson.practical_scenario?.analysis && (
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-bold text-[#090D16] uppercase font-mono tracking-wider">
                  {language === 'hi' ? 'विशेषज्ञ विश्लेषण:' : 'Expert Analysis:'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 font-light leading-relaxed">
                  {language === 'hi' && lesson.practical_scenario?.analysis_hi
                    ? lesson.practical_scenario.analysis_hi
                    : lesson.practical_scenario.analysis}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step N+2: Practical Activity (if present) */}
        {hasActivity && currentStep === totalSections + 2 && (
          <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-2xs space-y-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
              {language === 'hi' ? 'करके सीखें' : 'Interactive Drill'}
            </span>
            <h2 className="text-lg sm:text-xl font-serif italic text-[#090D16] font-bold">
              {language === 'hi'
                ? (lesson.practical_activity?.title_hi || 'व्यावहारिक अभ्यास')
                : (lesson.practical_activity?.title || 'Hands-on Activity')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light whitespace-pre-line">
              {language === 'hi' && lesson.practical_activity?.instructions_hi
                ? lesson.practical_activity.instructions_hi
                : lesson.practical_activity?.instructions}
            </p>
          </div>
        )}

        {/* Final Step: Key Takeaways & Quiz CTA */}
        {currentStep === totalSteps - 1 && (
          <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-2xs space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-violet-100 text-violet-800 flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  {language === 'hi' ? 'संक्षेप' : 'Summary'}
                </span>
                <h2 className="text-lg sm:text-xl font-serif italic text-[#090D16] font-bold">
                  {language === 'hi' ? 'मुख्य निष्कर्ष (Key Takeaways)' : 'Key Takeaways'}
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {(
                (language === 'hi' && lesson.key_takeaways_hi) ||
                lesson.key_takeaways ||
                []
              ).map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-light leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            {/* Prompt for Quiz */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 font-light flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                {language === 'hi'
                  ? 'ज्ञान को पक्का करने के लिए 3 त्वरित प्रश्नों की क्विज़ दें और +20 XP अर्जित करें!'
                  : 'Take a quick 3-question quiz to test your comprehension and earn +20 XP!'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 5. STICKY BOTTOM NAVIGATION ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-black/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] py-3 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            id="lesson-prev-btn"
            className="flex-1 sm:flex-initial py-3 px-4 rounded-2xl border border-black/[0.1] text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{currentStep === 0 ? (language === 'hi' ? 'विषय' : 'Topics') : (language === 'hi' ? 'पिछला' : 'Previous')}</span>
          </button>

          {/* Ask Tia Audio Assistance Button */}
          {onOpenTia && (
            <button
              onClick={() => onOpenTia('explain')}
              className="py-3 px-3.5 rounded-2xl bg-violet-50 text-violet-700 border border-violet-200/70 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-violet-100 transition-colors active:scale-95 shrink-0"
              title="Tia AI Explanation"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden xs:inline">Tia</span>
            </button>
          )}

          {/* Next Button / Start Quiz Button (Visually Stronger with warm yellow or obsidian) */}
          <button
            onClick={handleNext}
            id="lesson-next-btn"
            className={`flex-1 py-3 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 ${
              currentStep === totalSteps - 1
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-[0_4px_16px_rgba(251,191,36,0.4)]'
                : 'bg-[#090D16] hover:bg-black text-white'
            }`}
          >
            <span>
              {currentStep === totalSteps - 1
                ? (language === 'hi' ? 'क्विज़ शुरू करें →' : 'Start Quiz →')
                : (language === 'hi' ? 'अगला पाठ →' : 'Next Step →')}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
