import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Brain,
  Award,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { Question, UserProgress } from '../../types';
import { triggerConfetti } from '../../lib/confetti';
import { scrollToTop, useScrollToTop } from '../../lib/scrollHelper';

interface RevisionViewProps {
  onStartFirstLesson: () => void;
}

export const RevisionView: React.FC<RevisionViewProps> = ({ onStartFirstLesson }) => {
  const { getRevisionQuestions, completeRevision, progressMap, stats } = useLearning();
  const { language } = useLanguage();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ isCorrect: boolean }[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [gainedXp, setGainedXp] = useState<number>(0);

  // Automatically scroll to top when starting session, advancing questions, or finishing
  useScrollToTop([sessionActive, currentIndex, isCompleted], { behavior: 'instant' });

  const completedLessonCount = (Object.values(progressMap) as UserProgress[]).filter((p) => p.completed).length;

  useEffect(() => {
    // Generate revision set
    const qSet = getRevisionQuestions(5);
    setQuestions(qSet);
  }, [progressMap]);

  const handleStartSession = () => {
    const qSet = getRevisionQuestions(5);
    setQuestions(qSet);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setUserAnswers([]);
    setIsCompleted(false);
    setSessionActive(true);
  };

  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmit = () => {
    if (!selectedOption || !questions[currentIndex]) return;
    const isCorrect = selectedOption === questions[currentIndex].correct_answer;
    setIsSubmitted(true);
    setUserAnswers((prev) => [...prev, { isCorrect }]);
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      scrollToTop({ behavior: 'instant' });
    } else {
      // Finish Revision
      const correctCount = userAnswers.filter((a) => a.isCorrect).length;
      setSaving(true);
      try {
        const res = await completeRevision(correctCount, questions.length);
        setGainedXp(res.xpGained);
        setIsCompleted(true);
        scrollToTop({ behavior: 'instant' });
        triggerConfetti();
      } catch (e) {
        console.error('Error saving revision', e);
        setIsCompleted(true);
        scrollToTop({ behavior: 'instant' });
      } finally {
        setSaving(false);
      }
    }
  };

  // Empty State if no lessons done yet
  if (completedLessonCount === 0 && !sessionActive) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-[#F5F5F0] text-gray-400 flex items-center justify-center mx-auto border border-black/5">
          <RotateCcw className="w-8 h-8" />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#888] font-bold block mb-1">
            {language === 'hi' ? 'पुनरावलोकन केंद्र' : 'Retention Hub'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A]">
            {language === 'hi' ? 'अभी कोई पुनरावलोकन प्रश्न नहीं हैं' : 'No Revision Questions Yet'}
          </h2>
          <p className="text-xs text-gray-500 mt-1.5 max-w-sm mx-auto font-light leading-relaxed">
            {language === 'hi'
              ? 'पहले एक पाठ पूरा करें और स्मृति को पक्का करने के लिए स्वतः स्मार्ट पुनरावलोकन प्रश्न यहाँ आ जाएंगे।'
              : 'Complete a lesson first and your smart revision questions will automatically appear here to reinforce practical recall.'}
          </p>
        </div>
        <button
          onClick={onStartFirstLesson}
          id="start-first-lesson-revision-btn"
          className="inline-flex items-center gap-2 py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black transition-all shadow-md cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>{language === 'hi' ? 'पहला पाठ शुरू करें' : 'Start Your First Lesson'}</span>
        </button>
      </div>
    );
  }

  // Revision Completion Screen
  if (isCompleted) {
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    const scorePct = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="max-w-xl mx-auto px-4 py-8 space-y-6 text-center animate-fadeIn">
        <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-black/5 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#E6F4EA] text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-[#E6F4EA] px-3.5 py-1 rounded-full border border-emerald-200">
              {language === 'hi' ? 'पुनरावलोकन पूर्ण' : 'Revision Complete'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A] mt-3 tracking-tight">
              {language === 'hi' ? 'स्मृति और ज्ञान सशक्त हुआ!' : 'Memory Reinforced!'}
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-light">
              {language === 'hi'
                ? 'नियमित अंतराल पर अभ्यास करने से व्यावहारिक ज्ञान मस्तिष्क में दृढ़ता से सुरक्षित होता है।'
                : 'Spaced revision locks practical knowledge into long-term recall.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-black/5">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {language === 'hi' ? 'स्कोर' : 'Score'}
              </span>
              <p className="text-2xl font-serif italic text-[#1A1A1A] mt-0.5">
                {correctCount} / {questions.length}
              </p>
              <span className="text-[10px] font-mono font-medium text-gray-500">({scorePct}%)</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#E0F2FE] border border-[#A1D7F5] text-[#1A5E8C]">
              <span className="text-[10px] font-bold text-[#1A5E8C] uppercase tracking-widest">
                {language === 'hi' ? 'पुरस्कार' : 'Reward'}
              </span>
              <p className="text-2xl font-serif italic text-[#1A5E8C] mt-0.5">
                +{gainedXp || 20} XP
              </p>
              <span className="text-[10px] font-medium text-[#1A5E8C]">
                {language === 'hi' ? 'स्ट्रीक सक्रिय' : 'Streak Maintained'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setSessionActive(false)}
            id="revision-done-btn"
            className="w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black transition-all shadow-md cursor-pointer"
          >
            {language === 'hi' ? 'पुनरावलोकन केंद्र पर वापस लौटें' : 'Back to Revision Hub'}
          </button>
        </div>
      </div>
    );
  }

  // Active Revision Quiz Player
  if (sessionActive && questions.length > 0) {
    const currentQ = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    const qText = language === 'hi' && currentQ.question_hi ? currentQ.question_hi : currentQ.question;
    const optA = language === 'hi' && currentQ.option_a_hi ? currentQ.option_a_hi : currentQ.option_a;
    const optB = language === 'hi' && currentQ.option_b_hi ? currentQ.option_b_hi : currentQ.option_b;
    const optC = language === 'hi' && currentQ.option_c_hi ? currentQ.option_c_hi : currentQ.option_c;
    const optD = language === 'hi' && currentQ.option_d_hi ? currentQ.option_d_hi : currentQ.option_d;
    const explanationText =
      language === 'hi' && currentQ.explanation_hi ? currentQ.explanation_hi : currentQ.explanation;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-fadeIn">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="text-[#1A1A1A] font-bold uppercase tracking-widest text-[10px] flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" />
              {language === 'hi'
                ? `पुनरावलोकन · प्रश्न ${currentIndex + 1} / ${questions.length}`
                : `Revision · ${currentIndex + 1} of ${questions.length}`}
            </span>
            <span className="font-mono text-[11px]">
              {language === 'hi' ? '+10 XP आधार पुरस्कार' : '+10 XP Base Reward'}
            </span>
          </div>

          <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#1A1A1A] h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-black/5 p-6 sm:p-9 shadow-sm space-y-6">
          <h2 className="text-xl sm:text-2xl font-serif italic text-[#1A1A1A] leading-snug">
            {qText}
          </h2>

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
                  <div className="flex-1 text-xs sm:text-sm leading-relaxed font-light">{opt.text}</div>
                </div>
              );
            })}
          </div>

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
                      {language === 'hi' ? 'सही उत्तर!' : 'Correct!'}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-amber-700" />
                    <span className="text-[#8C5E1A]">
                      {language === 'hi' ? 'स्पष्टीकरण:' : 'Explanation:'}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-light">{explanationText}</p>
            </div>
          )}
        </div>

        <div>
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              id="revision-submit-btn"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black disabled:opacity-40 transition-all shadow-md cursor-pointer"
            >
              <span>{language === 'hi' ? 'उत्तर जमा करें' : 'Submit Answer'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={saving}
              id="revision-next-btn"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black active:scale-95 transition-all shadow-md cursor-pointer"
            >
              {saving ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>
                    {isLast
                      ? (language === 'hi' ? 'पुनरावलोकन पूर्ण करें' : 'Complete Revision')
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
  }

  // Revision Landing Hub
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      <div className="border-b border-black/5 pb-5">
        <span className="text-[10px] uppercase tracking-widest text-[#888] font-semibold block mb-1">
          {language === 'hi' ? 'स्मृति प्रतिधारण प्रणाली' : 'Memory Retention System'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif italic text-[#1A1A1A] tracking-tight">
          {language === 'hi' ? 'दैनिक पुनरावलोकन' : 'Spaced Revision'}
        </h1>
        <p className="text-xs text-gray-500 mt-1 max-w-xl font-light">
          {language === 'hi'
            ? 'बिना रटे या दबाव के, पिछले पाठों के ज्ञान को स्थायी स्मृति में बदलें।'
            : 'Lock in what you’ve learned through high-yield recall sessions without cramming.'}
        </p>
      </div>

      {/* Featured Revision Card */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-black/5 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-2xl bg-[#FEF2E0] text-[#8C5E1A] flex items-center justify-center">
            <RotateCcw className="w-7 h-7" />
          </div>
          <span className="text-xs font-mono font-medium px-3.5 py-1 rounded-full bg-[#FEF2E0] text-[#8C5E1A] border border-[#F5D7A1]">
            {language === 'hi' ? '5 प्रश्न · 5 मिनट' : '5 Questions · 5 Minutes'}
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-serif italic text-[#1A1A1A]">
            {language === 'hi' ? 'दैनिक त्वरित अभ्यास' : 'Daily Retention Workout'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed font-light">
            {language === 'hi'
              ? 'हमारा एल्गोरिदम आपके पूर्ण किए गए पाठों में से 5 प्रासंगिक प्रश्न चुनता है ताकि आप सीखी हुई बातें कभी न भूलें।'
              : 'Our algorithm selects 5 smart questions across your completed lessons to prevent the natural forgetting curve.'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-black/5 flex items-center justify-between text-xs text-gray-600 font-light">
          <span>{language === 'hi' ? 'पूल में पूर्ण पाठ:' : 'Completed Lessons in Pool:'}</span>
          <strong className="text-[#1A1A1A] font-mono font-bold text-sm">
            {completedLessonCount} {language === 'hi' ? 'पाठ' : 'lessons'}
          </strong>
        </div>

        <button
          onClick={handleStartSession}
          id="start-revision-session-btn"
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-black transition-all shadow-md cursor-pointer"
        >
          <span>
            {language === 'hi'
              ? 'पुनरावलोकन सत्र शुरू करें (+10 XP)'
              : 'Start Revision Session (+10 XP)'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* How Spaced Repetition Works */}
      <div className="bg-[#FAF8F5] rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 border border-black/5 text-xs text-gray-600 space-y-2 font-light">
        <div className="flex items-center gap-2 font-serif italic text-base text-[#1A1A1A]">
          <Brain className="w-4 h-4 text-black" />
          <span>{language === 'hi' ? 'दैनिक सूक्ष्म-पुनरावलोकन क्यों आवश्यक है?' : 'Why Daily Micro-Revision Matters'}</span>
        </div>
        <p className="leading-relaxed text-xs">
          {language === 'hi'
            ? 'सक्रिय पुनरावलोकन के बिना, मानव मस्तिष्क 48 घंटों में 70% तक नई जानकारी भूल जाता है। 5 त्वरित प्रश्नों का अभ्यास बिना मानसिक थकान के आपकी स्मृति को 100% पर बनाए रखता है।'
            : 'Without active review, human memory loses up to 70% of new information within 48 hours. Quick 5-question revisions reset your recall to 100% with zero cognitive strain.'}
        </p>
      </div>
    </div>
  );
};
