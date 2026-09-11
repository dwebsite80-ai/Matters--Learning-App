import React from 'react';
import {
  Flame,
  Brain,
  Award,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Calendar,
  Sparkles,
  TrendingUp,
  Scale,
  Coins,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { ALL_LESSONS } from '../../data/initialContent';
import { SubjectId, UserProgress } from '../../types';
import { getStreakStatusMessage } from '../../lib/streakHelper';

export const ProgressView: React.FC = () => {
  const { stats, progressMap, subjects, getSubjectProgress, streakStatus, currentStreak: ctxStreak, longestStreak: ctxLongest, previousBrokenStreak } = useLearning();
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      <div className="border-b border-black/5 pb-5">
        <span className="text-[10px] uppercase tracking-widest text-[#888] font-semibold block mb-1">
          {language === 'hi' ? 'आँकड़े एवं उपलब्धियां' : 'Metrics & Milestones'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif italic text-[#1A1A1A] tracking-tight">
          {language === 'hi' ? 'अध्ययन विश्लेषण' : 'Learning Analytics'}
        </h1>
        <p className="text-xs text-gray-500 mt-1 max-w-xl font-light">
          {language === 'hi'
            ? 'अपनी वास्तविक जीवन दक्षताओं, अर्जित XP और दैनिक पुनरावलोकन प्रगति पर नज़र रखें।'
            : 'Track your real-world practical competencies and daily retention progress.'}
        </p>
      </div>

      {/* Streak Status Alert Banner if Broken or Continue Today */}
      {streakStatus === 'broken' && (
        <div className="bg-[#FFF5F5] border border-[#FDE8E8] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex items-start gap-3.5 text-[#9B1C1C] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#FDE8E8] flex items-center justify-center shrink-0 text-xl shadow-xs">
            💔
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9B1C1C]">
                {language === 'hi' ? 'दैनिक स्ट्रीक टूट गई' : 'Streak Broken'}
              </span>
              <span className="text-[10px] bg-white border border-[#F8B4B4] px-2 py-0.5 rounded-full font-mono font-bold text-[#9B1C1C]">
                0 {language === 'hi' ? 'दिन' : 'days'}
              </span>
              {longestStreak > 0 && (
                <span className="text-[10px] bg-white border border-[#FDE8E8] px-2 py-0.5 rounded-full font-mono font-bold text-gray-600">
                  {language === 'hi' ? `सर्वश्रेष्ठ: ${longestStreak} दिन` : `Longest: ${longestStreak}d`}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#9B1C1C]/90 mt-1 font-normal">
              {streakMessage}
            </p>
          </div>
        </div>
      )}

      {streakStatus === 'continue_today' && (
        <div className="bg-[#FEF9E7] border border-[#FCF3CF] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex items-start gap-3.5 text-[#7D6608] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#FCF3CF] flex items-center justify-center shrink-0 text-xl shadow-xs">
            ⏳
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7D6608]">
                {language === 'hi' ? 'स्ट्रीक जारी रखें' : 'Keep Your Streak Alive'}
              </span>
              <span className="text-[10px] bg-white border border-[#F9E79F] px-2 py-0.5 rounded-full font-mono font-bold text-[#7D6608]">
                {currentStreak} {language === 'hi' ? 'दिन' : 'days'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#7D6608]/90 mt-1 font-normal">
              {streakMessage}
            </p>
          </div>
        </div>
      )}

      {/* Primary 4 Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[24px] sm:rounded-[28px] border border-black/5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              streakStatus === 'broken'
                ? 'bg-[#FDF2F2] text-[#9B1C1C]'
                : streakStatus === 'continue_today'
                ? 'bg-[#FEF9E7] text-[#7D6608]'
                : streakStatus === 'active'
                ? 'bg-[#FEF2E0] text-[#8C5E1A]'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {streakStatus === 'broken' ? (
                <span className="text-base">💔</span>
              ) : (
                <Flame className={`w-5 h-5 ${streakStatus === 'active' ? 'fill-[#8C5E1A]' : ''}`} />
              )}
            </div>
            <span className={`text-[9px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-full border ${
              streakStatus === 'broken'
                ? 'bg-[#FFF5F5] border-[#F8B4B4] text-[#9B1C1C]'
                : streakStatus === 'continue_today'
                ? 'bg-[#FEF9E7] border-[#F9E79F] text-[#7D6608]'
                : streakStatus === 'active'
                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
                : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}>
              {streakStatus === 'broken'
                ? (language === 'hi' ? 'टूटी' : 'Broken')
                : streakStatus === 'continue_today'
                ? (language === 'hi' ? 'आज शेष' : 'Pending')
                : streakStatus === 'active'
                ? (language === 'hi' ? 'सक्रिय' : 'Active')
                : (language === 'hi' ? 'शुरू नहीं' : 'New')}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-gray-500 font-medium">
              {language === 'hi' ? 'वर्तमान स्ट्रीक' : 'Current Streak'}
            </span>
            <p className="text-2xl font-serif italic text-[#1A1A1A] leading-tight mt-0.5">
              {currentStreak} <span className="text-sm font-sans font-light">{language === 'hi' ? 'दिन' : 'days'}</span>
            </p>
            <span className="text-[10px] text-gray-400 font-light block">
              {language === 'hi' ? `सर्वश्रेष्ठ: ${longestStreak} दिन` : `Longest: ${longestStreak}d`}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[24px] sm:rounded-[28px] border border-black/5 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-[#E0F2FE] text-[#1A5E8C] flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-gray-500 font-medium">
              {language === 'hi' ? 'कुल XP' : 'Total XP'}
            </span>
            <p className="text-2xl font-serif italic text-[#1A1A1A] leading-tight mt-0.5">
              {totalXp} <span className="text-sm font-sans font-light">XP</span>
            </p>
            <span className="text-[10px] text-gray-400 font-light">
              {language === 'hi' ? `स्तर ${Math.floor(totalXp / 50) + 1}` : `Level ${Math.floor(totalXp / 50) + 1}`}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[24px] sm:rounded-[28px] border border-black/5 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-[#F5F5F0] text-black flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-gray-500 font-medium">
              {language === 'hi' ? 'पाठ' : 'Lessons'}
            </span>
            <p className="text-2xl font-serif italic text-[#1A1A1A] leading-tight mt-0.5">
              {lessonsCompleted} <span className="text-sm font-sans font-light">{language === 'hi' ? 'पूर्ण' : 'done'}</span>
            </p>
            <span className="text-[10px] text-gray-400 font-light">
              {language === 'hi' ? `${subjects.length} विषयों में` : `Across ${subjects.length} domains`}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[24px] sm:rounded-[28px] border border-black/5 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] text-emerald-800 flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-gray-500 font-medium">
              {language === 'hi' ? 'पुनरावलोकन' : 'Revisions'}
            </span>
            <p className="text-2xl font-serif italic text-[#1A1A1A] leading-tight mt-0.5">
              {revisionsCompleted} <span className="text-sm font-sans font-light">{language === 'hi' ? 'अभ्यास' : 'workouts'}</span>
            </p>
            <span className="text-[10px] text-gray-400 font-light">
              {language === 'hi' ? 'सक्रिय स्मरण' : 'Spaced recall'}
            </span>
          </div>
        </div>
      </div>

      {/* Subject Mastery Progress Bars */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-black/5 p-6 sm:p-7 shadow-sm space-y-5">
        <h2 className="font-serif italic text-xl text-[#1A1A1A]">
          {language === 'hi' ? 'विषयवार दक्षता विवरण' : 'Domain Mastery Breakdown'}
        </h2>

        <div className="space-y-4">
          {subjects.map((sub) => {
            const prog = getSubjectProgress(sub.id);
            const subName = language === 'hi' && sub.name_hi ? sub.name_hi : sub.name;

            return (
              <div key={sub.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono font-medium text-gray-600">
                  <div className="flex items-center gap-2 font-sans font-normal text-sm text-[#1A1A1A]">
                    <span>{getSubjectEmoji(sub.id)}</span>
                    <span className="font-medium">{subName}</span>
                  </div>
                  <span>
                    {prog.percentage}% ({prog.completedCount}/{prog.totalCount})
                  </span>
                </div>
                <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1A1A1A] rounded-full transition-all duration-500"
                    style={{ width: `${prog.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestones & Badges */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-black/5 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif italic text-xl text-[#1A1A1A]">
            {language === 'hi' ? 'मील के पत्थर और उपलब्धियां' : 'Milestones & Achievements'}
          </h2>
          <span className="text-xs font-mono text-gray-500 font-medium">
            {language === 'hi'
              ? `${milestones.filter((m) => m.unlocked).length} / ${milestones.length} अनलॉक`
              : `${milestones.filter((m) => m.unlocked).length} of ${milestones.length} Unlocked`}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border flex items-center gap-3.5 transition-all ${
                m.unlocked
                  ? 'bg-[#F5F5F0] border-black/10'
                  : 'bg-white border-black/5 opacity-50'
              }`}
            >
              <div className="text-2xl flex-shrink-0">{m.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif italic font-bold text-sm text-[#1A1A1A] truncate">
                  {m.title}
                </h3>
                <p className="text-[11px] text-gray-500 truncate font-light">{m.desc}</p>
              </div>
              {m.unlocked && (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Completed Lessons Log */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-black/5 p-6 sm:p-7 shadow-sm space-y-5">
        <h2 className="font-serif italic text-xl text-[#1A1A1A]">
          {language === 'hi' ? 'गतिविधि इतिहास' : 'Activity History'}
        </h2>

        {completedList.length === 0 ? (
          <p className="text-xs text-gray-500 py-6 text-center font-light">
            {language === 'hi'
              ? 'अभी कोई पाठ पूरा नहीं हुआ है। अपना इतिहास देखने के लिए आज का मिशन शुरू करें!'
              : 'No completed lessons yet. Start today’s mission to see your history!'}
          </p>
        ) : (
          <div className="space-y-3">
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
                  className="p-4 rounded-2xl bg-[#F5F5F0] border border-black/5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <div>
                      <h3 className="font-serif italic font-bold text-sm text-[#1A1A1A]">
                        {lessonTitle}
                      </h3>
                      <span className="text-[10px] text-gray-500 font-light">
                        {subjectName}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-800 bg-[#E6F4EA] px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-200">
                      {prog.quiz_score}% {language === 'hi' ? 'प्रश्नोत्तरी' : 'Quiz'}
                    </span>
                    <p className="text-[10px] font-mono text-gray-400 mt-1">{dateFormatted}</p>
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
