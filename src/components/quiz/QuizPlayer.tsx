import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Award,
  Sparkles,
  Flame,
} from 'lucide-react';
import { Question, Lesson, TiaMode } from '../../types';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { triggerConfetti, triggerStreakCelebration } from '../../lib/confetti';
import { scrollToTop, useScrollToTop } from '../../lib/scrollHelper';

interface QuizPlayerProps {
  lesson: Lesson;
  questions: Question[];
  onFinish: () => void;
  onOpenTia?: (mode?: TiaMode) => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  lesson,
  questions,
  onFinish,
  onOpenTia,
}) => {
  const { completeLesson } = useLearning();
  const { language } = useLanguage();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<
    { questionId: string; selected: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean }[]
  >([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [savingProgress, setSavingProgress] = useState<boolean>(false);
  const [xpResult, setXpResult] = useState<{ xpGained: number; streakIncreased: boolean } | null>(
    null
  );

  // Automatically scroll to top on question transition, quiz open, or completion screen
  useScrollToTop([currentIndex, isCompleted, lesson.id], { behavior: 'instant' });

  const safeQuestions = questions || [];
  const totalQuestions = safeQuestions.length;
  const currentQ = safeQuestions[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  if (totalQuestions === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4 animate-fadeIn">
        <h2 className="text-2xl font-serif italic text-[#121212]">
          {language === 'hi' ? 'कोई प्रश्न उपलब्ध नहीं है' : 'No Quiz Questions Available'}
        </h2>
        <p className="text-xs text-black/60">
          {language === 'hi'
            ? 'इस पाठ के लिए अभी अभ्यास प्रश्न उपलब्ध नहीं हैं।'
            : 'This lesson does not have interactive quiz questions attached.'}
        </p>
        <button
          onClick={onFinish}
          className="px-6 py-3 bg-[#121212] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all cursor-pointer shadow-md"
        >
          {language === 'hi' ? 'अध्ययन पर वापस लौटें' : 'Return to Learning'}
        </button>
      </div>
    );
  }

  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentQ) return;
    const isCorrect = selectedOption === currentQ.correct_answer;
    setIsSubmitted(true);

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        selected: selectedOption,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = async () => {
    if (!isLastQuestion) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      scrollToTop({ behavior: 'instant' });
    } else {
      // Finish Quiz
      const finalAnswers = [
        ...userAnswers,
        ...(isSubmitted
          ? []
          : [
              {
                questionId: currentQ.id,
                selected: selectedOption!,
                isCorrect: selectedOption === currentQ.correct_answer,
              },
            ]),
      ];

      const correctCount = finalAnswers.filter((a) => a.isCorrect).length;
      const scorePct = Math.round((correctCount / totalQuestions) * 100);

      setSavingProgress(true);
      try {
        const result = await completeLesson(
          lesson.id,
          scorePct,
          correctCount,
          totalQuestions
        );
        setXpResult(result);
        setIsCompleted(true);
        scrollToTop({ behavior: 'instant' });
        triggerConfetti();
        if (result.streakIncreased) {
          setTimeout(() => triggerStreakCelebration(), 400);
        }
      } catch (err) {
        console.error('Error saving quiz result', err);
        setIsCompleted(true);
        scrollToTop({ behavior: 'instant' });
      } finally {
        setSavingProgress(false);
      }
    }
  };

  // 1. Completion Screen
  if (isCompleted) {
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    const scorePct = Math.round((correctCount / totalQuestions) * 100);
    const lessonTitle = language === 'hi' && lesson.title_hi ? lesson.title_hi : lesson.title;

    return (
      <div className="max-w-xl mx-auto px-4 py-8 space-y-6 text-center animate-fadeIn">
        <div className="bg-white dark:bg-[#131926] rounded-[36px] sm:rounded-[44px] border border-black/[0.06] dark:border-white/[0.08] p-8 sm:p-12 shadow-[0_16px_50px_-12px_rgba(9,13,22,0.1)] dark:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.5)] space-y-6 transition-colors">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/90 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-2xs group hover:scale-105 transition-transform">
            <Award className="w-10 h-10 text-emerald-600 dark:text-emerald-400 animate-bounce" />
          </div>

          <div>
            <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-700/50 font-mono shadow-2xs">
              {language === 'hi' ? 'पाठ पूर्ण हुआ' : 'Lesson Complete'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif italic text-[#090D16] dark:text-[#F8FAFC] mt-4 tracking-tight font-medium leading-tight">
              {lessonTitle}
            </h1>
            <p className="text-xs sm:text-sm text-black/60 dark:text-slate-400 mt-2 font-light leading-relaxed max-w-sm mx-auto">
              {language === 'hi'
                ? 'आपने आज एक महत्वपूर्ण व्यावहारिक दक्षता हासिल कर ली है!'
                : 'You’ve built another essential practical competency today!'}
            </p>
          </div>

          {/* Score & XP Rewards Banner */}
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="p-5 sm:p-6 rounded-3xl bg-[#FAFAF8] dark:bg-[#161D2E] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs">
              <span className="text-[10px] font-bold text-black/50 dark:text-slate-400 uppercase tracking-widest font-mono">
                {language === 'hi' ? 'अंक (स्कोर)' : 'Score'}
              </span>
              <p className="text-2xl sm:text-4xl font-serif italic text-[#090D16] dark:text-[#F8FAFC] mt-1 font-medium">
                {correctCount} / {totalQuestions}
              </p>
              <span className="text-[11px] font-mono font-semibold text-black/50 dark:text-slate-400">({scorePct}%)</span>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200/90 dark:border-violet-700/50 text-violet-900 dark:text-violet-200 shadow-2xs">
              <span className="text-[10px] font-bold text-violet-800 dark:text-violet-300 uppercase tracking-widest font-mono">
                {language === 'hi' ? 'अर्जित XP' : 'Earned'}
              </span>
              <p className="text-2xl sm:text-4xl font-serif italic text-violet-950 dark:text-violet-100 mt-1 font-medium">
                +{xpResult?.xpGained || 25} XP
              </p>
              <span className="text-[11px] font-medium text-violet-700 dark:text-violet-300">
                {language === 'hi' ? 'ज्ञान संवर्धन' : 'Knowledge Boost'}
              </span>
            </div>
          </div>

          {/* Streak Boost Note */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-700/50 text-amber-900 dark:text-amber-200 flex items-center justify-center gap-2.5 text-xs font-semibold shadow-2xs">
            <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>
              {language === 'hi'
                ? 'दैनिक अध्ययन स्ट्रीक बरकरार रही!'
                : 'Daily Learning Streak Maintained!'}
            </span>
          </div>

          <button
            onClick={onFinish}
            id="quiz-finish-btn"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#090D16] dark:bg-violet-600 hover:bg-black dark:hover:bg-violet-500 active:scale-95 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.2)] cursor-pointer"
          >
            <span>{language === 'hi' ? 'पाठ पूरा करें व वापस जाएं' : 'Complete Lesson & Return'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  const qText = language === 'hi' && currentQ.question_hi ? currentQ.question_hi : currentQ.question;
  const optA = language === 'hi' && currentQ.option_a_hi ? currentQ.option_a_hi : currentQ.option_a;
  const optB = language === 'hi' && currentQ.option_b_hi ? currentQ.option_b_hi : currentQ.option_b;
  const optC = language === 'hi' && currentQ.option_c_hi ? currentQ.option_c_hi : currentQ.option_c;
  const optD = language === 'hi' && currentQ.option_d_hi ? currentQ.option_d_hi : currentQ.option_d;
  const explanationText =
    language === 'hi' && currentQ.explanation_hi ? currentQ.explanation_hi : currentQ.explanation;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Header with Question Counter & Progress */}
      <div className="space-y-3 bg-white/80 dark:bg-[#131926]/90 p-4 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xl shadow-2xs transition-colors">
        <div className="flex items-center justify-between text-xs text-black/60 dark:text-slate-400">
          <span className="text-[#090D16] dark:text-[#F8FAFC] font-bold uppercase tracking-widest text-[10px] font-mono bg-black/[0.03] dark:bg-white/[0.06] px-3 py-1 rounded-full border border-black/[0.04] dark:border-white/[0.08]">
            {language === 'hi'
              ? `प्रश्नोत्तरी · प्रश्न ${currentIndex + 1} / ${totalQuestions}`
              : `Quiz · Question ${currentIndex + 1} of ${totalQuestions}`}
          </span>
          <span className="font-mono text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50/90 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200/90 dark:border-amber-700/50 shadow-2xs">
            {language === 'hi' ? '+5 XP प्रति प्रश्न' : '+5 XP per question'}
          </span>
        </div>

        <div className="w-full bg-black/[0.04] dark:bg-white/10 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-violet-600 via-indigo-600 to-amber-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-[#131926] rounded-[32px] sm:rounded-[40px] border border-black/[0.06] dark:border-white/[0.08] p-7 sm:p-10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] space-y-6 transition-colors">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#090D16] dark:text-[#F8FAFC] leading-snug font-medium">
          {qText}
        </h2>

        {/* 4 Options */}
        <div className="space-y-3.5">
          {[
            { key: 'A' as const, text: optA },
            { key: 'B' as const, text: optB },
            { key: 'C' as const, text: optC },
            { key: 'D' as const, text: optD },
          ].map((opt) => {
            const isSelected = selectedOption === opt.key;
            const isCorrectAnswer = opt.key === currentQ.correct_answer;

            let optionStyle = 'border-black/[0.08] dark:border-white/[0.08] bg-[#FAFAF8] dark:bg-[#161D2E] hover:border-black/25 dark:hover:border-white/25 hover:bg-white dark:hover:bg-[#192236] text-[#090D16] dark:text-[#F8FAFC] shadow-2xs';

            if (isSubmitted) {
              if (isCorrectAnswer) {
                optionStyle = 'border-emerald-500 dark:border-emerald-600 bg-emerald-50/90 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-medium shadow-xs';
              } else if (isSelected && !isCorrectAnswer) {
                optionStyle = 'border-rose-400 dark:border-rose-600 bg-rose-50/90 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 shadow-xs';
              } else {
                optionStyle = 'border-black/[0.05] dark:border-white/[0.04] bg-black/[0.02] dark:bg-white/[0.02] text-black/40 dark:text-slate-500 opacity-55';
              }
            } else if (isSelected) {
              optionStyle = 'border-[#090D16] dark:border-violet-500 bg-white dark:bg-[#1A2234] text-[#090D16] dark:text-white font-semibold shadow-xs ring-2 ring-black/5 dark:ring-violet-500/20';
            }

            return (
              <div
                key={opt.key}
                onClick={() => handleSelectOption(opt.key)}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-3.5 ${optionStyle}`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5 shadow-2xs transition-all ${
                    isSubmitted
                      ? isCorrectAnswer
                        ? 'bg-emerald-600 text-white'
                        : isSelected
                        ? 'bg-rose-600 text-white'
                        : 'bg-black/[0.08] dark:bg-white/10 text-black/60 dark:text-slate-400'
                      : isSelected
                      ? 'bg-[#090D16] dark:bg-violet-600 text-white'
                      : 'bg-white dark:bg-[#1A2234] border border-black/[0.1] dark:border-white/[0.15] text-black/70 dark:text-slate-300'
                  }`}
                >
                  {opt.key}
                </div>

                <div className="flex-1 text-xs sm:text-sm leading-relaxed font-light mt-0.5">
                  {opt.text}
                </div>

                {isSubmitted && (
                  <div className="flex-shrink-0 mt-0.5">
                    {isCorrectAnswer ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Immediate Feedback & Explanation Card */}
        {isSubmitted && (
          <div
            className={`p-5 sm:p-6 rounded-3xl border animate-fadeIn ${
              selectedOption === currentQ.correct_answer
                ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-200/90 dark:border-emerald-700/50 text-emerald-950 dark:text-emerald-100 shadow-2xs'
                : 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-200/90 dark:border-amber-700/50 text-amber-950 dark:text-amber-100 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs mb-2 font-mono">
              {selectedOption === currentQ.correct_answer ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span className="text-emerald-800 dark:text-emerald-300">
                    {language === 'hi' ? 'सही उत्तर! +5 XP' : 'Correct! +5 XP'}
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span className="text-amber-900 dark:text-amber-300">
                    {language === 'hi' ? 'महत्वपूर्ण सीख:' : 'Key Learning Takeaway:'}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-light">
              {explanationText}
            </p>
            {onOpenTia && (
              <div className="mt-4 pt-3.5 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] text-black/60 dark:text-slate-400">
                  {language === 'hi' ? 'संदेह है या और विस्तार से समझना है?' : 'Want a deeper breakdown?'}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenTia('chat')}
                  className="text-xs font-bold text-[#090D16] dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 underline flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>🎙️ {language === 'hi' ? 'टिया से पूछें' : 'Ask Tia'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tia Hint Trigger if not submitted */}
      {!isSubmitted && onOpenTia && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onOpenTia('chat')}
            className="text-xs text-black/60 dark:text-slate-400 hover:text-black dark:hover:text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>💡 {language === 'hi' ? 'संकेत चाहिए? टिया से पूछें' : 'Need a hint? Ask Tia'}</span>
          </button>
        </div>
      )}

      {/* Action CTA Button */}
      <div>
        {!isSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedOption}
            id="quiz-submit-answer-btn"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#090D16] dark:bg-violet-600 hover:bg-black dark:hover:bg-violet-500 disabled:opacity-40 transition-all shadow-md cursor-pointer"
          >
            <span>{language === 'hi' ? 'उत्तर जमा करें' : 'Submit Answer'}</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            disabled={savingProgress}
            id="quiz-next-btn"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#090D16] dark:bg-violet-600 hover:bg-black dark:hover:bg-violet-500 active:scale-95 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.2)] cursor-pointer"
          >
            {savingProgress ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>
                  {isLastQuestion
                    ? (language === 'hi' ? 'परिणाम देखें व पूर्ण करें' : 'View Results & Complete')
                    : (language === 'hi' ? 'अगला प्रश्न →' : 'Next Question →')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
