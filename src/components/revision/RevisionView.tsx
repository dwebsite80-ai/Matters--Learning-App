import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Brain,
  Award,
  BookOpen,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { Question, UserProgress, SubjectId } from '../../types';
import { triggerConfetti } from '../../lib/confetti';
import { scrollToTop, useScrollToTop } from '../../lib/scrollHelper';
import { ALL_LESSONS } from '../../data/initialContent';
import { getSubjectThumbnail, getLessonImage } from '../../data/courseImages';

interface RevisionViewProps {
  onStartFirstLesson: () => void;
}

export const RevisionView: React.FC<RevisionViewProps> = ({ onStartFirstLesson }) => {
  const { getRevisionQuestions, completeRevision, progressMap, subjects } = useLearning();
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
  const [filterMode, setFilterMode] = useState<'all' | 'priority' | 'mastered'>('all');

  // Automatically scroll to top when starting session, advancing questions, or finishing
  useScrollToTop([sessionActive, currentIndex, isCompleted], { behavior: 'instant' });

  const completedList = (Object.values(progressMap) as UserProgress[])
    .filter((p) => p.completed)
    .sort((a, b) => new Date(b.completed_at || 0).getTime() - new Date(a.completed_at || 0).getTime());

  const completedLessonCount = completedList.length;

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

  const getSubjectName = (id: SubjectId) => {
    const found = subjects.find((s) => s.id === id);
    if (language === 'hi' && found?.name_hi) return found.name_hi;
    return found?.name || id;
  };

  // 1. Empty State if no lessons done yet
  if (completedLessonCount === 0 && !sessionActive) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-5 animate-fadeIn pb-24">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center mx-auto shadow-2xs">
          <RotateCcw className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-[#090D16] font-medium">
            {language === 'hi' ? 'पुनरीक्षण' : 'Revision'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto font-light leading-relaxed">
            {language === 'hi'
              ? 'पहले एक पाठ पूरा करें और स्मृति को पक्का करने के लिए स्वतः स्मार्ट पुनरावलोकन प्रश्न यहाँ आ जाएंगे।'
              : 'Complete a lesson first to unlock smart spaced repetition drill cards.'}
          </p>
        </div>
        <button
          onClick={onStartFirstLesson}
          id="start-first-lesson-revision-btn"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md cursor-pointer active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          <span>{language === 'hi' ? 'पहला पाठ शुरू करें' : 'Start Your First Lesson'}</span>
        </button>
      </div>
    );
  }

  // 2. Revision Completion Screen
  if (isCompleted) {
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    const scorePct = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="max-w-xl mx-auto px-4 py-8 space-y-6 text-center animate-fadeIn pb-24">
        <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-10 shadow-md space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto shadow-2xs">
            <Award className="w-8 h-8 text-emerald-600 animate-bounce" />
          </div>

          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-mono">
              {language === 'hi' ? 'पुनरीक्षण पूर्ण' : 'Revision Complete'}
            </span>
            <h1 className="text-xl sm:text-3xl font-serif italic text-[#090D16] mt-3 font-medium">
              {language === 'hi' ? 'स्मृति और ज्ञान सशक्त हुआ!' : 'Memory Reinforced!'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-light leading-relaxed max-w-sm mx-auto">
              {language === 'hi'
                ? 'नियमित अंतराल पर अभ्यास करने से सीखा हुआ ज्ञान स्थायी स्मृति में सुरक्षित होता है।'
                : 'Spaced revision resets your retention to 100% effortless recall.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 py-1">
            <div className="p-4 rounded-2xl bg-slate-50 border border-black/[0.06]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                {language === 'hi' ? 'स्कोर' : 'Score'}
              </span>
              <p className="text-2xl font-serif italic text-[#090D16] mt-0.5 font-bold">
                {correctCount} / {questions.length}
              </p>
              <span className="text-[11px] font-mono text-slate-400">({scorePct}%)</span>
            </div>

            <div className="p-4 rounded-2xl bg-violet-50 text-violet-900 border border-violet-200/80">
              <span className="text-[10px] font-bold text-violet-700 uppercase tracking-wider font-mono">
                {language === 'hi' ? 'पुरस्कार' : 'Reward'}
              </span>
              <p className="text-2xl font-serif italic text-violet-950 mt-0.5 font-bold">
                +{gainedXp || 10} XP
              </p>
              <span className="text-[11px] text-violet-700 font-medium">
                {language === 'hi' ? 'सक्रिय स्ट्रीक' : 'Streak +1'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setSessionActive(false)}
            id="revision-done-btn"
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider text-white bg-[#090D16] hover:bg-black transition-all cursor-pointer active:scale-95"
          >
            {language === 'hi' ? 'पुनरीक्षण केंद्र पर वापस लौटें' : 'Back to Revision'}
          </button>
        </div>
      </div>
    );
  }

  // 3. Active Revision Quiz Player
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 animate-fadeIn pb-24">
        {/* Progress header */}
        <div className="bg-white rounded-2xl p-3.5 border border-black/[0.06] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono font-bold text-[11px] flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              {language === 'hi'
                ? `प्रश्न ${currentIndex + 1} / ${questions.length}`
                : `Question ${currentIndex + 1} of ${questions.length}`}
            </span>
            <span className="font-mono text-[10px] font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-200/60">
              +10 XP
            </span>
          </div>

          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-600 to-amber-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl border border-black/[0.06] p-5 sm:p-7 shadow-2xs space-y-5">
          <h2 className="text-base sm:text-xl font-serif italic text-[#090D16] leading-snug font-bold">
            {qText}
          </h2>

          <div className="space-y-2.5">
            {[
              { key: 'A' as const, text: optA },
              { key: 'B' as const, text: optB },
              { key: 'C' as const, text: optC },
              { key: 'D' as const, text: optD },
            ].map((opt) => {
              const isSelected = selectedOption === opt.key;
              const isCorrectAnswer = opt.key === currentQ.correct_answer;

              let optionStyle = 'border-black/[0.08] bg-slate-50 hover:bg-white text-[#090D16]';

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-medium';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'border-rose-400 bg-rose-50/90 text-rose-950';
                } else {
                  optionStyle = 'border-black/[0.04] bg-slate-50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-[#090D16] bg-white text-[#090D16] font-semibold ring-2 ring-black/5';
              }

              return (
                <div
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-3 active:scale-[0.99] ${optionStyle}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5 ${
                      isSubmitted
                        ? isCorrectAnswer
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                        : isSelected
                        ? 'bg-[#090D16] text-white'
                        : 'bg-white border border-slate-300 text-slate-700'
                    }`}
                  >
                    {opt.key}
                  </div>
                  <div className="flex-1 text-xs sm:text-sm leading-relaxed font-light mt-0.5">{opt.text}</div>
                </div>
              );
            })}
          </div>

          {isSubmitted && (
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed animate-fadeIn ${
                selectedOption === currentQ.correct_answer
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/90 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1 font-mono">
                {selectedOption === currentQ.correct_answer ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'hi' ? 'सही उत्तर!' : 'Correct!'}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-amber-600" />
                    <span>{language === 'hi' ? 'स्पष्टीकरण:' : 'Explanation:'}</span>
                  </>
                )}
              </div>
              <p className="font-light">{explanationText}</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div>
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              id="revision-submit-btn"
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 transition-all shadow-md cursor-pointer active:scale-95"
            >
              <span>{language === 'hi' ? 'उत्तर जमा करें' : 'Submit Answer'}</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={saving}
              id="revision-next-btn"
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider text-white bg-[#090D16] hover:bg-black active:scale-95 transition-all shadow-md cursor-pointer"
            >
              {saving ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <span>
                  {isLast
                    ? (language === 'hi' ? 'पुनरीक्षण पूर्ण करें' : 'Complete Revision')
                    : (language === 'hi' ? 'अगला प्रश्न →' : 'Next Question →')}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  // 4. Revision Landing Hub with Cards
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 animate-fadeIn pb-24">
      {/* 1. HEADER */}
      <div className="pt-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#090D16] tracking-tight font-medium">
          {language === 'hi' ? 'पुनरीक्षण' : 'Revision'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-light">
          {language === 'hi'
            ? 'दैनिक सक्रिय स्मरण और अंतराल पुनरावृत्ति से ज्ञान को स्थायी बनाएं।'
            : 'Spaced repetition to convert learned lessons into long-term practical recall.'}
        </p>
      </div>

      {/* 2. FEATURED 5-MINUTE RETENTION HERO CARD */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#090D16] via-indigo-950 to-violet-950 text-white shadow-[0_12px_36px_rgba(9,13,22,0.22)] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-300/30">
            {language === 'hi' ? 'दैनिक त्वरित अभ्यास' : 'Daily Retention Workout'}
          </span>
          <span className="text-xs font-mono text-slate-300">
            5 {language === 'hi' ? 'प्रश्न' : 'Q’s'} · 5 {language === 'hi' ? 'मिनट' : 'mins'}
          </span>
        </div>

        <div>
          <h2 className="text-lg sm:text-2xl font-serif italic text-white font-medium">
            {language === 'hi' ? 'स्मृति सुदृढ़ीकरण सत्र' : 'Memory Reinforcement Drill'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-light leading-relaxed">
            {language === 'hi'
              ? 'आपके पूर्ण किए गए पाठों में से 5 प्रासंगिक प्रश्न चुने गए हैं।'
              : '5 high-yield recall scenarios pulled from your completed lesson pool.'}
          </p>
        </div>

        <button
          onClick={handleStartSession}
          id="start-revision-session-btn"
          className="w-full bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-[#090D16] py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_8px_20px_rgba(251,191,36,0.3)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{language === 'hi' ? 'पुनरीक्षण शुरू करें (+10 XP)' : 'Start Revision Drill (+10 XP)'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. FILTER TABS */}
      <div className="flex items-center gap-2">
        {[
          { id: 'all' as const, label_en: 'All Lessons', label_hi: 'सभी पाठ' },
          { id: 'priority' as const, label_en: 'Spaced Recall', label_hi: 'स्मृति अभ्यास' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterMode(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
              filterMode === tab.id
                ? 'bg-[#090D16] text-white shadow-xs'
                : 'bg-white border border-black/[0.08] text-slate-600 hover:text-black'
            }`}
          >
            {language === 'hi' ? tab.label_hi : tab.label_en}
          </button>
        ))}
      </div>

      {/* 4. REVISION CARDS FOR COMPLETED LESSONS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif italic font-medium text-lg sm:text-xl text-[#090D16]">
            {language === 'hi' ? 'पुनरीक्षण हेतु पाठ' : 'Lessons in Retention Pool'}
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            {completedLessonCount} {language === 'hi' ? 'उपलब्ध' : 'ready'}
          </span>
        </div>

        <div className="space-y-2.5">
          {completedList.map((prog) => {
            const lesson = ALL_LESSONS.find((l) => l.id === prog.lesson_id);
            const lessonTitle =
              language === 'hi' && lesson?.title_hi
                ? lesson.title_hi
                : (lesson?.title || prog.lesson_id);
            const subjectName = getSubjectName(prog.subject_id);

            return (
              <div
                key={prog.lesson_id}
                className="p-3.5 sm:p-4 rounded-2xl bg-white border border-black/[0.06] shadow-2xs hover:border-black/15 transition-all flex items-center justify-between gap-3"
              >
                {/* [Course/Lesson Thumbnail Image] */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-black/10 shadow-2xs">
                    <img
                      src={getLessonImage(
                        lesson || prog.lesson_id,
                        prog.subject_id,
                        lessonTitle
                      )}
                      alt={lessonTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block truncate">
                      {subjectName}
                    </span>
                    <h4 className="font-serif italic font-bold text-xs sm:text-sm text-[#090D16] truncate">
                      {lessonTitle}
                    </h4>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {language === 'hi' ? 'क्विज़ स्कोर:' : 'Score:'} {prog.quiz_score}%
                    </p>
                  </div>
                </div>

                {/* Existing action button */}
                <button
                  onClick={handleStartSession}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-black hover:text-white border border-slate-200/80 text-[11px] font-bold text-slate-700 transition-colors shrink-0 cursor-pointer active:scale-95"
                >
                  {language === 'hi' ? 'अभ्यास करें' : 'Review'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
