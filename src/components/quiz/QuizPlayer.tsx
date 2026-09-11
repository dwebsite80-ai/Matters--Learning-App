import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Flame,
  Brain,
  Award,
  RotateCcw,
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
        <h2 className="text-2xl font-serif italic text-[#1A1A1A]">
          {language === 'hi' ? 'कोई प्रश्न उपलब्ध नहीं है' : 'No Quiz Questions Available'}
        </h2>
        <p className="text-xs text-gray-500">
          {language === 'hi'
            ? 'इस पाठ के लिए अभी अभ्यास प्रश्न उपलब्ध नहीं हैं।'
            : 'This lesson does not have interactive quiz questions attached.'}
        </p>
        <button
          onClick={onFinish}
          className="px-6 py-3 bg-[#1A1A1A] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all cursor-pointer"
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
        <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-black/5 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#E6F4EA] text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-[#E6F4EA] px-3.5 py-1 rounded-full border border-emerald-200">
              {language === 'hi' ? 'पाठ पूर्ण हुआ' : 'Lesson Complete'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A] mt-3 tracking-tight">
              {lessonTitle}
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-light">
              {language === 'hi'
                ? 'आपने आज एक महत्वपूर्ण व्यावहारिक दक्षता हासिल कर ली है!'
                : 'You’ve built another essential practical competency today!'}
            </p>
          </div>

          {/* Score & XP Rewards Banner */}
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-black/5">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {language === 'hi' ? 'अंक (स्कोर)' : 'Score'}
              </span>
              <p className="text-2xl font-serif italic text-[#1A1A1A] mt-0.5">
                {correctCount} / {totalQuestions}
              </p>
              <span className="text-[10px] font-mono font-medium text-gray-500">({scorePct}%)</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#E0F2FE] border border-[#A1D7F5] text-[#1A5E8C]">
              <span className="text-[10px] font-bold text-[#1A5E8C] uppercase tracking-widest">
                {language === 'hi' ? 'अर्जित XP' : 'Earned'}
              </span>
              <p className="text-2xl font-serif italic text-[#1A5E8C] mt-0.5">
                +{xpResult?.xpGained || 25} XP
              </p>
              <span className="text-[10px] font-medium text-[#1A5E8C]">
                {language === 'hi' ? 'ज्ञान संवर्धन' : 'Knowledge Boost'}
              </span>
            </div>
          </div>

          {/* Streak Boost Note */}
          <div className="p-4 rounded-2xl bg-[#FEF2E0] border border-[#F5D7A1] text-[#8C5E1A] flex items-center justify-center gap-2 text-xs font-bold">
            <span className="text-base">🔥</span>
            <span>
              {language === 'hi'
                ? 'दैनिक अध्ययन स्ट्रीक बरकरार रही!'
                : 'Daily Learning Streak Maintained!'}
            </span>
          </div>

          <button
            onClick={onFinish}
            id="quiz-finish-btn"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black active:scale-95 transition-all shadow-md cursor-pointer"
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
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="text-[#1A1A1A] font-bold uppercase tracking-widest text-[10px]">
            {language === 'hi'
              ? `प्रश्नोत्तरी · प्रश्न ${currentIndex + 1} / ${totalQuestions}`
              : `Quiz · Question ${currentIndex + 1} of ${totalQuestions}`}
          </span>
          <span className="font-mono text-[11px]">
            {language === 'hi' ? '+5 XP प्रति प्रश्न' : '+5 XP per question'}
          </span>
        </div>

        <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#1A1A1A] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-black/5 p-6 sm:p-9 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-serif italic text-[#1A1A1A] leading-snug">
          {qText}
        </h2>

        {/* 4 Options */}
        <div className="space-y-3">
          {[
            { key: 'A' as const, text: optA },
            { key: 'B' as const, text: optB },
            { key: 'C' as const, text: optC },
            { key: 'D' as const, text: optD },
          ].map((opt) => {
            const isSelected = selectedOption === opt.key;
            const isCorrectAnswer = opt.key === currentQ.correct_answer;

            let optionStyle = 'border-black/5 bg-[#FDFCFB] hover:border-black/20 hover:bg-[#F5F5F0] text-[#1A1A1A]';

            if (isSubmitted) {
              if (isCorrectAnswer) {
                optionStyle = 'border-emerald-500 bg-[#E6F4EA] text-emerald-950 font-medium';
              } else if (isSelected && !isCorrectAnswer) {
                optionStyle = 'border-rose-400 bg-rose-50 text-rose-950';
              } else {
                optionStyle = 'border-black/5 bg-[#F5F5F0] text-gray-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'border-[#1A1A1A] bg-[#F5F5F0] text-[#1A1A1A] font-semibold shadow-xs';
            }

            return (
              <div
                key={opt.key}
                onClick={() => handleSelectOption(opt.key)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${optionStyle}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isSubmitted
                      ? isCorrectAnswer
                        ? 'bg-emerald-600 text-white'
                        : isSelected
                        ? 'bg-rose-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                      : isSelected
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white border border-black/10 text-gray-700'
                  }`}
                >
                  {opt.key}
                </div>

                <div className="flex-1 text-xs sm:text-sm leading-relaxed font-light">
                  {opt.text}
                </div>

                {isSubmitted && (
                  <div className="flex-shrink-0 mt-0.5">
                    {isCorrectAnswer ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-600" />
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
            className={`p-5 rounded-2xl border animate-fadeIn ${
              selectedOption === currentQ.correct_answer
                ? 'bg-[#E6F4EA] border-emerald-200 text-emerald-950'
                : 'bg-[#FEF2E0] border-[#F5D7A1] text-[#8C5E1A]'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs mb-1">
              {selectedOption === currentQ.correct_answer ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span className="text-emerald-800">
                    {language === 'hi' ? 'सही उत्तर! +5 XP' : 'Correct! +5 XP'}
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-amber-700" />
                  <span className="text-[#8C5E1A]">
                    {language === 'hi' ? 'महत्वपूर्ण सीख:' : 'Key Learning Takeaway:'}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-light">
              {explanationText}
            </p>
            {onOpenTia && (
              <div className="mt-3 pt-2.5 border-t border-black/5 flex items-center justify-between">
                <span className="text-[11px] opacity-75">
                  {language === 'hi' ? 'संदेह है या और विस्तार से समझना है?' : 'Confused why this is the answer?'}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenTia('chat')}
                  className="text-xs font-bold underline hover:opacity-80 flex items-center gap-1 cursor-pointer"
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
            className="text-xs text-gray-500 hover:text-black font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
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
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black disabled:opacity-40 transition-all shadow-md cursor-pointer"
          >
            <span>{language === 'hi' ? 'उत्तर जमा करें' : 'Submit Answer'}</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            disabled={savingProgress}
            id="quiz-next-btn"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black active:scale-95 transition-all shadow-md cursor-pointer"
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
