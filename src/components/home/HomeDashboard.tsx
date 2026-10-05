import React from 'react';
import {
  Flame,
  Clock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { Lesson, SubjectId, ActiveTab } from '../../types';
import { getStreakStatusMessage } from '../../lib/streakHelper';

interface HomeDashboardProps {
  onStartLesson: (lesson: Lesson) => void;
  onStartRevision: () => void;
  onSelectSubject: (subjectId: SubjectId) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onStartLesson,
  onStartRevision,
  onSelectSubject,
  setActiveTab,
}) => {
  const { user, preferences } = useAuth();
  const {
    stats,
    todayMission,
    getSubjectProgress,
    subjects,
    streakStatus,
    currentStreak,
    longestStreak,
    previousBrokenStreak,
  } = useLearning();
  const { language, t } = useLanguage();

  // Dynamic greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'hi') {
      if (hour < 12) return 'शुभ प्रभात';
      if (hour < 17) return 'शुभ दोपहर';
      return 'शुभ संध्या';
    }
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.name ? user.name.split(' ')[0] : (language === 'hi' ? 'साथी' : 'Learner');
  const totalXp = stats?.total_xp || 0;
  const completedCount = stats?.lessons_completed_count || 0;

  const streakMessage = getStreakStatusMessage(
    streakStatus,
    currentStreak,
    previousBrokenStreak,
    language as 'en' | 'hi'
  );

  // Selected subjects to display progress for (or all subjects if none filtered)
  const userSubjects = preferences?.selected_subjects?.length
    ? subjects.filter((s) => preferences.selected_subjects.includes(s.id))
    : subjects;

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

  const getSubjectLabel = (id: SubjectId, fallbackName: string) => {
    const found = subjects.find((s) => s.id === id);
    if (language === 'hi' && found?.name_hi) return found.name_hi;
    return found?.name || fallbackName;
  };

  const getSubjectDesc = (id: SubjectId, fallbackDesc: string) => {
    const found = subjects.find((s) => s.id === id);
    if (language === 'hi' && found?.description_hi) return found.description_hi;
    return found?.description || fallbackDesc;
  };

  // Safe calculation of lesson number for today's mission
  const todayMissionNumber =
    todayMission?.lesson_number ??
    (todayMission as any)?.lessonNumber ??
    (() => {
      if (!todayMission) return 1;
      const match = todayMission.id?.match(/\d+$/) || todayMission.topic_id?.match(/\d+$/);
      if (match) return parseInt(match[0], 10);
      return 1;
    })();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fadeIn">
      {/* Header Greeting & Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b border-black/[0.06] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-black/50 font-bold font-mono">
              {language === 'hi' ? 'दैनिक सूक्ष्म-अध्ययन · 10–20 मिनट' : 'Daily Micro-Learning · 10–20 Mins'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#090D16] tracking-tight font-medium">
            {getGreeting()}, {userName}
          </h1>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div
            onClick={() => setActiveTab('progress')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer hover:scale-[1.03] active:scale-95 shadow-2xs ${
              streakStatus === 'broken'
                ? 'bg-rose-50/90 border-rose-200 text-rose-800'
                : streakStatus === 'continue_today'
                ? 'bg-amber-50/90 border-amber-200 text-amber-800'
                : streakStatus === 'active'
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800'
                : 'bg-black/[0.02] border-black/[0.06] text-black/70'
            }`}
            title={streakMessage}
          >
            <Flame className={`w-4 h-4 ${streakStatus === 'broken' ? 'text-rose-500' : 'text-amber-500'}`} />
            <span className="text-xs font-bold font-mono">
              {streakStatus === 'broken'
                ? (language === 'hi' ? '0 दिन (टूटी)' : '0d (Broken)')
                : `${currentStreak} ${language === 'hi' ? 'दिन' : 'Day Streak'}`}
            </span>
          </div>

          <div
            onClick={() => setActiveTab('progress')}
            className="flex items-center gap-2 bg-violet-50/90 border border-violet-200/90 px-3.5 py-1.5 rounded-full cursor-pointer hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-2xs group"
            title="Total Knowledge XP"
          >
            <Sparkles className="w-4 h-4 text-violet-600 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold text-violet-900 font-mono">{totalXp} XP</span>
          </div>
        </div>
      </div>

      {/* Streak Status Notification Banner */}
      {streakStatus === 'broken' && (
        <div className="bg-rose-50/80 border border-rose-200/90 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-rose-900 shadow-2xs animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shrink-0 text-xl shadow-2xs border border-rose-200">
              💔
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 font-mono">
                  {language === 'hi' ? 'दैनिक स्ट्रीक टूट गई' : 'Streak Broken'}
                </span>
                <span className="text-[10px] bg-white border border-rose-200 px-2 py-0.5 rounded-full font-mono font-bold text-rose-800">
                  0 {language === 'hi' ? 'दिन' : 'days'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-rose-950/85 mt-0.5 font-light leading-relaxed">
                {streakMessage}
              </p>
            </div>
          </div>
          {longestStreak > 0 && (
            <div className="self-end sm:self-center shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white border border-rose-200 text-rose-800 shadow-2xs">
                {language === 'hi' ? `सर्वश्रेष्ठ: ${longestStreak} दिन` : `Longest: ${longestStreak}d`}
              </span>
            </div>
          )}
        </div>
      )}

      {streakStatus === 'continue_today' && (
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-amber-900 shadow-2xs animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shrink-0 text-xl shadow-2xs border border-amber-200">
              ⏳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                  {language === 'hi' ? 'स्ट्रीक जारी रखें' : 'Keep Your Streak Alive'}
                </span>
                <span className="text-[10px] bg-white border border-amber-200 px-2 py-0.5 rounded-full font-mono font-bold text-amber-800">
                  {currentStreak} {language === 'hi' ? 'दिन' : 'days'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950/85 mt-0.5 font-light leading-relaxed">
                {streakMessage}
              </p>
            </div>
          </div>
          {longestStreak > 0 && (
            <div className="self-end sm:self-center shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white border border-amber-200 text-amber-800 shadow-2xs">
                {language === 'hi' ? `सर्वश्रेष्ठ: ${longestStreak} दिन` : `Longest: ${longestStreak}d`}
              </span>
            </div>
          )}
        </div>
      )}

      {streakStatus === 'active' && (
        <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-emerald-900 shadow-2xs animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shrink-0 text-xl shadow-2xs border border-emerald-200">
              🔥
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                  {language === 'hi' ? 'आज का लक्ष्य पूर्ण!' : "Today's Goal Achieved!"}
                </span>
                <span className="text-[10px] bg-white border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-bold text-emerald-800">
                  {currentStreak} {language === 'hi' ? 'दिन' : 'days'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950/85 mt-0.5 font-light leading-relaxed">
                {streakMessage}
              </p>
            </div>
          </div>
          {longestStreak > 0 && (
            <div className="self-end sm:self-center shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-800 shadow-2xs">
                {language === 'hi' ? `सर्वश्रेष्ठ: ${longestStreak} दिन` : `Longest: ${longestStreak}d`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Large Featured Hero Card: Today's Mission */}
      {todayMission && (
        <div className="relative bg-[#090D16] rounded-[32px] sm:rounded-[40px] text-white p-7 sm:p-10 md:p-12 overflow-hidden shadow-[0_24px_70px_-15px_rgba(9,13,22,0.35)] border border-white/[0.1] group transition-all duration-300">
          {/* Subtle Ambient Glows */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-gradient-to-tr from-violet-600/35 via-purple-500/20 to-amber-500/25 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute -left-20 -top-20 w-72 h-72 bg-indigo-500/15 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            {/* Top Badge & Domain */}
            <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
              <span className="px-3.5 py-1.5 rounded-full border border-white/20 text-[10px] uppercase tracking-widest bg-white/[0.08] backdrop-blur-md text-white font-semibold flex items-center gap-1.5 shadow-2xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                {t('home.todays_mission', language === 'hi' ? 'आज का मुख्य पाठ' : "Today's Mission")}
              </span>
              <span className="text-xs font-mono font-medium text-white/80 bg-white/[0.06] px-3.5 py-1.5 rounded-full border border-white/[0.08] shadow-2xs">
                {getSubjectEmoji(todayMission.subject_id)} {getSubjectLabel(todayMission.subject_id, todayMission.subject_id)}
              </span>
            </div>

            {/* Title & Description */}
            <div className="max-w-2xl">
              <p className="text-amber-300 uppercase text-[11px] font-bold tracking-widest mb-2.5 font-mono">
                {language === 'hi' ? `पाठ #${todayMissionNumber}` : `Lesson #${todayMissionNumber}`}
              </p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif italic mb-4 leading-[1.12] text-white font-normal tracking-tight">
                {language === 'hi' && todayMission.title_hi ? todayMission.title_hi : todayMission.title}
              </h2>
              {(todayMission.subtitle_hi || todayMission.subtitle) && (
                <p className="text-sm sm:text-base text-white/80 mb-8 font-light leading-relaxed max-w-xl">
                  {language === 'hi' && todayMission.subtitle_hi ? todayMission.subtitle_hi : todayMission.subtitle}
                </p>
              )}
            </div>

            {/* Bottom Meta & CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.12]">
              <div className="flex items-center gap-3.5 sm:gap-4 text-xs text-white/75 flex-wrap">
                <span className="flex items-center gap-1.5 font-medium bg-white/[0.05] px-3 py-1.5 rounded-full border border-white/[0.08]">
                  <Clock className="w-3.5 h-3.5 text-white/60" />
                  {todayMission.estimated_minutes} {language === 'hi' ? 'मिनट' : 'min read'}
                </span>
                <span className="flex items-center gap-1.5 font-medium bg-white/[0.05] px-3 py-1.5 rounded-full border border-white/[0.08]">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  {language === 'hi'
                    ? (todayMission.difficulty === 'Beginner' ? 'सरल' : todayMission.difficulty === 'Intermediate' ? 'मध्यम' : 'उन्नत')
                    : todayMission.difficulty}
                </span>
                <span className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-violet-500/25 text-violet-200 border border-violet-400/40 font-mono shadow-2xs">
                  +20 XP
                </span>
              </div>

              <button
                onClick={() => onStartLesson(todayMission)}
                id="start-mission-btn"
                className="w-full sm:w-auto bg-white text-[#090D16] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#FAFAF8] hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2.5 cursor-pointer group/btn"
              >
                <span>{language === 'hi' ? 'आज का पाठ शुरू करें' : "Start Today's Lesson"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Row: Quick Review & Curriculum Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Quick Review Card */}
        <div className="bg-white border border-black/[0.06] rounded-[30px] sm:rounded-[36px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.07)] hover:border-black/15 transition-all duration-300">
          <div>
            <div className="flex justify-between items-start mb-3.5">
              <div>
                <p className="text-[10px] uppercase font-bold text-black/50 tracking-widest font-mono">
                  {language === 'hi' ? 'स्मृति अभ्यास' : 'Active Recall'}
                </p>
                <h3 className="text-xl sm:text-2xl font-serif italic text-[#090D16] mt-0.5">
                  {t('home.quick_revision')}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/90 border border-amber-200/70 flex items-center justify-center text-amber-800 shadow-2xs">
                <RotateCcw className="w-5 h-5 text-amber-700" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-black/65 leading-relaxed mb-6 font-light">
              {language === 'hi'
                ? 'दैनिक व्यावहारिक प्रश्नों और अंतराल पुनरावृत्ति (Spaced Repetition) के माध्यम से सीखी गई बातों को सुदृढ़ करें।'
                : "Reinforce what you've learned through rapid-fire real-life scenario questions using spaced repetition."}
            </p>
          </div>

          <button
            onClick={onStartRevision}
            id="start-quick-revision-btn"
            className="w-full py-3.5 px-6 border border-black/[0.12] rounded-full text-xs font-bold uppercase tracking-wider text-[#090D16] hover:bg-[#090D16] hover:text-white transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer shadow-2xs group/rev"
          >
            <span>{language === 'hi' ? '5-मिनट पुनरीक्षण शुरू करें' : 'Begin 5-Min Revision'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/rev:translate-x-0.5" />
          </button>
        </div>

        {/* Subject Progress Summary Card */}
        <div className="bg-white border border-black/[0.06] rounded-[30px] sm:rounded-[36px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.07)] hover:border-black/15 transition-all duration-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-black/50 tracking-widest font-mono">
                  {language === 'hi' ? 'पाठ्यक्रम प्रगति' : 'Curriculum Progress'}
                </p>
                <h3 className="text-xl sm:text-2xl font-serif italic text-[#090D16] mt-0.5">
                  {language === 'hi' ? 'ज्ञान दक्षता' : 'Knowledge Mastery'}
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('progress')}
                className="text-xs font-bold text-violet-700 hover:text-violet-900 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{language === 'hi' ? 'प्रगति विवरण' : 'Analytics'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[190px] overflow-y-auto pr-1">
              {userSubjects.map((sub) => {
                const progress = getSubjectProgress(sub.id);
                return (
                  <div
                    key={sub.id}
                    onClick={() => onSelectSubject(sub.id)}
                    className="cursor-pointer group p-2 rounded-xl hover:bg-black/[0.02] transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2 font-semibold text-[#090D16]">
                        <span className="text-sm">{getSubjectEmoji(sub.id)}</span>
                        <span className="group-hover:text-violet-700 transition-colors">{getSubjectLabel(sub.id, sub.name)}</span>
                      </div>
                      <span className="font-mono text-xs text-black/50 font-medium">
                        {progress.completedCount}/{progress.totalCount} ({progress.percentage}%)
                      </span>
                    </div>

                    <div className="w-full bg-black/[0.04] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-600 via-indigo-600 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-black/60">
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-black/70" />
              <strong className="text-[#090D16] font-semibold">{completedCount}</strong> {language === 'hi' ? 'पाठ पूर्ण हुए' : 'lessons completed'}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-black/70" />
              <strong className="text-[#090D16] font-semibold">{totalXp}</strong> {language === 'hi' ? 'XP अर्जित' : 'XP earned'}
            </span>
          </div>
        </div>
      </div>

      {/* Curriculum Exploration Section */}
      <div className="bg-white border border-black/[0.06] rounded-[32px] sm:rounded-[40px] p-6 sm:p-9 space-y-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase font-bold text-black/50 tracking-widest font-mono">
              {language === 'hi' ? 'उपलब्ध विषय' : 'Available Domains'}
            </p>
            <h3 className="text-xl sm:text-2xl font-serif italic text-[#090D16] mt-0.5">
              {language === 'hi' ? `सभी ${subjects.length} विषयों का अन्वेषण करें` : `Explore All ${subjects.length} Domains`}
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('learn')}
            className="self-start sm:self-auto px-4 py-2 rounded-full text-xs font-bold border border-black/[0.1] text-[#090D16] hover:bg-black/[0.03] transition-colors cursor-pointer"
          >
            {language === 'hi' ? 'सभी पाठ्यक्रम देखें' : 'View All Roadmaps'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {subjects.map((sub) => {
            const progress = getSubjectProgress(sub.id);
            return (
              <div
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-black/[0.06] bg-[#FAFAF8]/70 hover:bg-white hover:border-black/20 hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-2xl shadow-2xs group-hover:scale-105 group-hover:shadow-xs transition-all">
                      {getSubjectEmoji(sub.id)}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/60 bg-black/[0.04] px-2.5 py-1 rounded-full border border-black/[0.04]">
                      {progress.percentage}%
                    </span>
                  </div>
                  <h4 className="font-serif italic font-bold text-base sm:text-lg text-[#090D16] group-hover:text-violet-700 transition-colors">
                    {getSubjectLabel(sub.id, sub.name)}
                  </h4>
                  <p className="text-xs text-black/60 mt-1 line-clamp-2 leading-relaxed font-light">
                    {getSubjectDesc(sub.id, sub.description)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-semibold text-[#090D16]">
                  <span className="text-black/60 font-mono text-[11px]">{progress.totalCount} {language === 'hi' ? 'पाठ' : 'Lessons'}</span>
                  <div className="flex items-center gap-1 text-black group-hover:text-violet-700 transition-colors">
                    <span className="text-[11px] font-bold">{language === 'hi' ? 'खोलें' : 'Open'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
