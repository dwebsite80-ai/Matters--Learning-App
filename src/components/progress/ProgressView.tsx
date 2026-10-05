import React from 'react';
import {
  Flame,
  Brain,
  Award,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { ALL_LESSONS } from '../../data/initialContent';
import { SubjectId, UserProgress } from '../../types';
import { getStreakStatusMessage } from '../../lib/streakHelper';

export const ProgressView: React.FC = () => {
  const {
    stats,
    progressMap,
    subjects,
    getSubjectProgress,
    streakStatus,
    currentStreak: ctxStreak,
    longestStreak: ctxLongest,
    previousBrokenStreak,
  } = useLearning();
  const { language } = useLanguage();

  const currentStreak = ctxStreak ?? stats?.current_streak ?? 0;
  const longestStreak = ctxLongest ?? stats?.longest_streak ?? 0;
  const totalXp = stats?.total_xp || 0;
  const lessonsCompleted = stats?.lessons_completed_count || 0;
  const revisionsCompleted = stats?.revisions_completed_count || 0;

  const streakMessage = getStreakStatusMessage(
    streakStatus,
    currentStreak,
    previousBrokenStreak,
    language as 'en' | 'hi'
  );

  // Completed items list sorted by completion date
  const completedList = (Object.values(progressMap) as UserProgress[])
    .filter((p) => p.completed)
    .sort((a, b) => new Date(b.completed_at || 0).getTime() - new Date(a.completed_at || 0).getTime());

  // Badges & Milestones definitions
  const milestones = [
    {
      id: 'first-step',
      title: language === 'hi' ? 'पहला कदम' : 'First Step',
      desc: language === 'hi' ? 'अपना पहला सूक्ष्म-पाठ पूरा किया' : 'Completed your 1st micro-lesson',
      unlocked: lessonsCompleted >= 1,
      icon: '🌱',
    },
    {
      id: 'streak-3',
      title: language === 'hi' ? 'नियमितता की शुरुआत' : 'Consistency Starter',
      desc: language === 'hi' ? '3 दिनों की अध्ययन स्ट्रीक हासिल की' : 'Achieved a 3-day learning streak',
      unlocked: currentStreak >= 3 || longestStreak >= 3,
      icon: '🔥',
    },
    {
      id: 'xp-100',
      title: language === 'hi' ? 'शतक क्लब' : 'Century Club',
      desc: language === 'hi' ? '100 से अधिक ज्ञान XP अर्जित किए' : 'Earned over 100 Knowledge XP',
      unlocked: totalXp >= 100,
      icon: '⚡',
    },
    {
      id: 'revision-master',
      title: language === 'hi' ? 'सक्रिय स्मरण' : 'Active Recall',
      desc: language === 'hi' ? '3 पुनरावलोकन अभ्यास पूरे किए' : 'Completed 3 revision workouts',
      unlocked: revisionsCompleted >= 3,
      icon: '🧠',
    },
    {
      id: 'scholar-5',
      title: language === 'hi' ? 'व्यावहारिक विद्वान' : 'Practical Scholar',
      desc: language === 'hi' ? '5 व्यावहारिक जीवन विषयों में महारत हासिल की' : 'Mastered 5 practical life topics',
      unlocked: lessonsCompleted >= 5,
      icon: '🏆',
    },
  ];

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
        return '🧭';
      case 'personality-development':
        return '🌟';
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
    const sub = subjects.find((s) => s.id === id);
    if (!sub) return id;
    return language === 'hi' && sub.name_hi ? sub.name_hi : sub.name;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-black/[0.06] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-black/50 font-bold font-mono">
            {language === 'hi' ? 'आँकड़े एवं उपलब्धियां' : 'Metrics & Milestones'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#090D16] tracking-tight font-medium">
          {language === 'hi' ? 'अध्ययन विश्लेषण' : 'Learning Analytics'}
        </h1>
        <p className="text-xs sm:text-sm text-black/60 mt-2 max-w-xl font-light leading-relaxed">
          {language === 'hi'
            ? 'अपनी वास्तविक जीवन दक्षताओं, अर्जित XP और दैनिक पुनरावलोकन प्रगति पर नज़र रखें।'
            : 'Track your real-world practical competencies, XP growth, and retention velocity.'}
        </p>
      </div>

      {/* Streak Status Alert Banner */}
      {streakStatus === 'broken' && (
        <div className="bg-rose-50/80 border border-rose-200/90 rounded-3xl p-5 sm:p-6 flex items-start gap-4 text-rose-900 shadow-2xs">
          <div className="w-11 h-11 rounded-2xl bg-white border border-rose-200 flex items-center justify-center shrink-0 text-xl shadow-2xs">
            💔
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 font-mono">
                {language === 'hi' ? 'दैनिक स्ट्रीक टूट गई' : 'Streak Broken'}
              </span>
              <span className="text-[10px] bg-white border border-rose-200 px-2.5 py-0.5 rounded-full font-mono font-bold text-rose-800">
                0 {language === 'hi' ? 'दिन' : 'days'}
              </span>
              {longestStreak > 0 && (
                <span className="text-[10px] bg-white border border-rose-200 px-2.5 py-0.5 rounded-full font-mono font-bold text-black/60">
                  {language === 'hi' ? `सर्वश्रेष्ठ: ${longestStreak} दिन` : `Longest: ${longestStreak}d`}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-rose-950/85 mt-1 font-light leading-relaxed">
              {streakMessage}
            </p>
          </div>
        </div>
      )}

      {streakStatus === 'continue_today' && (
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-3xl p-5 sm:p-6 flex items-start gap-4 text-amber-900 shadow-2xs">
          <div className="w-11 h-11 rounded-2xl bg-white border border-amber-200 flex items-center justify-center shrink-0 text-xl shadow-2xs">
            ⏳
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                {language === 'hi' ? 'स्ट्रीक जारी रखें' : 'Keep Your Streak Alive'}
              </span>
              <span className="text-[10px] bg-white border border-amber-200 px-2.5 py-0.5 rounded-full font-mono font-bold text-amber-800">
                {currentStreak} {language === 'hi' ? 'दिन' : 'days'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950/85 mt-1 font-light leading-relaxed">
              {streakMessage}
            </p>
          </div>
        </div>
      )}

      {/* Primary 4 Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white p-5 sm:p-6 rounded-[30px] border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] space-y-3.5 hover:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.06)] hover:border-black/15 transition-all">
          <div className="flex items-center justify-between">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xs ${
              streakStatus === 'broken'
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : streakStatus === 'continue_today'
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : streakStatus === 'active'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-black/[0.03] border-black/[0.06] text-black/60'
            }`}>
              {streakStatus === 'broken' ? (
                <span className="text-lg">💔</span>
              ) : (
                <Flame className={`w-6 h-6 ${streakStatus === 'active' ? 'fill-emerald-600' : ''}`} />
              )}
            </div>
            <span className={`text-[9px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-full border ${
              streakStatus === 'broken'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : streakStatus === 'continue_today'
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : streakStatus === 'active'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-black/[0.03] border-black/[0.06] text-black/60'
            }`}>
              {streakStatus === 'broken'
                ? (language === 'hi' ? 'टूटी' : 'Broken')
                : streakStatus === 'continue_today'
                ? (language === 'hi' ? 'आज शेष' : 'Pending')
                : streakStatus === 'active'
                ? (language === 'hi' ? 'सक्रिय' : 'Active')
                : (language === 'hi' ? 'नया' : 'New')}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-black/50 font-bold block">
              {language === 'hi' ? 'वर्तमान स्ट्रीक' : 'Current Streak'}
            </span>
            <p className="text-2xl sm:text-3xl font-serif italic text-[#090D16] leading-tight mt-0.5 font-medium">
              {currentStreak} <span className="text-sm font-sans font-normal text-black/60">{language === 'hi' ? 'दिन' : 'days'}</span>
            </p>
            <span className="text-[10px] text-black/45 font-mono block mt-1">
              {language === 'hi' ? `सर्वश्रेष्ठ: ${longestStreak} दिन` : `Longest: ${longestStreak}d`}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-[30px] border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] space-y-3.5 hover:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.06)] hover:border-black/15 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-violet-50/90 border border-violet-200/80 text-violet-800 flex items-center justify-center shadow-2xs">
            <Brain className="w-6 h-6 text-violet-600" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-black/50 font-bold block">
              {language === 'hi' ? 'कुल XP' : 'Total XP'}
            </span>
            <p className="text-2xl sm:text-3xl font-serif italic text-[#090D16] leading-tight mt-0.5 font-medium">
              {totalXp} <span className="text-sm font-sans font-normal text-black/60">XP</span>
            </p>
            <span className="text-[10px] text-violet-700 font-mono font-semibold block mt-1">
              {language === 'hi' ? `स्तर ${Math.floor(totalXp / 50) + 1}` : `Level ${Math.floor(totalXp / 50) + 1}`}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-[30px] border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] space-y-3.5 hover:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.06)] hover:border-black/15 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FAFAF8] border border-black/[0.06] text-black/80 flex items-center justify-center shadow-2xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-black/50 font-bold block">
              {language === 'hi' ? 'पाठ' : 'Lessons'}
            </span>
            <p className="text-2xl sm:text-3xl font-serif italic text-[#090D16] leading-tight mt-0.5 font-medium">
              {lessonsCompleted} <span className="text-sm font-sans font-normal text-black/60">{language === 'hi' ? 'पूर्ण' : 'done'}</span>
            </p>
            <span className="text-[10px] text-black/45 font-mono block mt-1">
              {language === 'hi' ? `${subjects.length} विषयों में` : `Across ${subjects.length} domains`}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-[30px] border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] space-y-3.5 hover:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.06)] hover:border-black/15 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 text-emerald-800 flex items-center justify-center shadow-2xs">
            <RotateCcw className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-black/50 font-bold block">
              {language === 'hi' ? 'पुनरावलोकन' : 'Revisions'}
            </span>
            <p className="text-2xl sm:text-3xl font-serif italic text-[#090D16] leading-tight mt-0.5 font-medium">
              {revisionsCompleted} <span className="text-sm font-sans font-normal text-black/60">{language === 'hi' ? 'अभ्यास' : 'sessions'}</span>
            </p>
            <span className="text-[10px] text-emerald-700 font-mono font-semibold block mt-1">
              {language === 'hi' ? 'सक्रिय स्मरण' : 'Spaced recall'}
            </span>
          </div>
        </div>
      </div>

      {/* Subject Mastery Progress Bars */}
      <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-black/[0.06] p-7 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] space-y-6">
        <h2 className="font-serif italic text-xl sm:text-2xl text-[#090D16] font-medium">
          {language === 'hi' ? 'विषयवार दक्षता विवरण' : 'Domain Mastery Breakdown'}
        </h2>

        <div className="space-y-4">
          {subjects.map((sub) => {
            const prog = getSubjectProgress(sub.id);
            const subName = language === 'hi' && sub.name_hi ? sub.name_hi : sub.name;

            return (
              <div key={sub.id} className="space-y-2 p-2.5 rounded-2xl hover:bg-black/[0.02] transition-colors">
                <div className="flex items-center justify-between text-xs font-mono font-medium text-black/60">
                  <div className="flex items-center gap-2.5 font-sans text-sm text-[#090D16] font-semibold">
                    <span className="text-base">{getSubjectEmoji(sub.id)}</span>
                    <span>{subName}</span>
                  </div>
                  <span>
                    {prog.percentage}% ({prog.completedCount}/{prog.totalCount})
                  </span>
                </div>
                <div className="w-full bg-black/[0.04] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 via-indigo-600 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${prog.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestones & Badges */}
      <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-black/[0.06] p-7 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif italic text-xl sm:text-2xl text-[#090D16] font-medium">
            {language === 'hi' ? 'मील के पत्थर और उपलब्धियां' : 'Milestones & Achievements'}
          </h2>
          <span className="text-xs font-mono text-black/60 font-bold bg-black/[0.03] px-3.5 py-1.5 rounded-full border border-black/[0.05] shadow-2xs">
            {language === 'hi'
              ? `${milestones.filter((m) => m.unlocked).length} / ${milestones.length} अनलॉक`
              : `${milestones.filter((m) => m.unlocked).length} of ${milestones.length} Unlocked`}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-3xl border flex items-center gap-4 transition-all duration-200 ${
                m.unlocked
                  ? 'bg-white border-black/[0.08] shadow-2xs hover:shadow-xs hover:border-black/25'
                  : 'bg-[#FAFAF8] border-black/[0.04] opacity-50'
              }`}
            >
              <div className="text-3xl flex-shrink-0">{m.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif italic font-bold text-sm sm:text-base text-[#090D16] truncate">
                  {m.title}
                </h3>
                <p className="text-xs text-black/60 truncate font-light mt-0.5">{m.desc}</p>
              </div>
              {m.unlocked && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Completed Lessons Log */}
      <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-black/[0.06] p-7 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] space-y-6">
        <h2 className="font-serif italic text-xl sm:text-2xl text-[#090D16] font-medium">
          {language === 'hi' ? 'गतिविधि इतिहास' : 'Activity History'}
        </h2>

        {completedList.length === 0 ? (
          <p className="text-xs sm:text-sm text-black/50 py-10 text-center font-light">
            {language === 'hi'
              ? 'अभी कोई पाठ पूरा नहीं हुआ है। अपना इतिहास देखने के लिए आज का मिशन शुरू करें!'
              : 'No completed lessons yet. Start today’s mission to see your history!'}
          </p>
        ) : (
          <div className="space-y-3.5">
            {completedList.map((prog) => {
              const lesson = ALL_LESSONS.find((l) => l.id === prog.lesson_id);
              const lessonTitle =
                language === 'hi' && lesson?.title_hi ? lesson.title_hi : (lesson?.title || prog.lesson_id);
              const subjectName = getSubjectName(prog.subject_id);

              const dateFormatted = prog.completed_at
                ? new Date(prog.completed_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })
                : (language === 'hi' ? 'हाल ही में' : 'Recent');

              return (
                <div
                  key={prog.lesson_id}
                  className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#FAFAF8] border border-black/[0.06] hover:bg-white hover:border-black/20 hover:shadow-xs transition-all flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100/90 flex items-center justify-center flex-shrink-0 text-emerald-800 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div>
                      <h3 className="font-serif italic font-bold text-sm sm:text-base text-[#090D16]">
                        {lessonTitle}
                      </h3>
                      <span className="text-[11px] text-black/55 font-light">
                        {subjectName}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-900 bg-emerald-100/90 px-3 py-1 rounded-full text-[10px] border border-emerald-300/80 shadow-2xs">
                      {prog.quiz_score}% {language === 'hi' ? 'स्कोर' : 'Quiz'}
                    </span>
                    <p className="text-[10px] font-mono text-black/45 mt-1">{dateFormatted}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
