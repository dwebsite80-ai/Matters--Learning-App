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
  AlertTriangle,
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
  const { language, t, localize } = useLanguage();

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
      default:
        return '📚';
    }
  };

  const getSubjectLabel = (id: SubjectId, fallbackName: string) => {
    const found = subjects.find(s => s.id === id);
    if (language === 'hi' && found?.name_hi) return found.name_hi;
    return found?.name || fallbackName;
  };

  const getSubjectDesc = (id: SubjectId, fallbackDesc: string) => {
    const found = subjects.find(s => s.id === id);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Greeting & Micro-copy */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#888] font-semibold block mb-1">
            {language === 'hi' ? 'दैनिक सूक्ष्म-अध्ययन · 10–20 मिनट' : 'Daily Micro-Learning · 10–20 Mins'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif italic text-[#1A1A1A] tracking-tight">
            {getGreeting()}, {userName}
          </h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div
            onClick={() => setActiveTab('progress')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border cursor-pointer hover:opacity-90 transition-all ${
              streakStatus === 'broken'
                ? 'bg-[#FDF2F2] border-[#F8B4B4] text-[#9B1C1C]'
                : streakStatus === 'continue_today'
                ? 'bg-[#FEF9E7] border-[#F9E79F] text-[#7D6608]'
                : streakStatus === 'active'
                ? 'bg-[#FEF2E0] border-[#F5D7A1] text-[#8C5E1A]'
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}
            title={streakMessage}
          >
            <span className="text-sm">{streakStatus === 'broken' ? '💔' : '🔥'}</span>
            <span className="text-xs font-bold">
              {streakStatus === 'broken'
                ? (language === 'hi' ? 'स्ट्रीक टूटी (0 दिन)' : 'Streak Broken (0d)')
                : `${currentStreak} ${language === 'hi' ? 'दिन स्ट्रीक' : 'Day Streak'}`}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#E0F2FE] px-3.5 py-1.5 rounded-full border border-[#A1D7F5]">
            <span className="text-sm">🧠</span>
            <span className="text-xs font-bold text-[#1A5E8C]">{totalXp} XP</span>
          </div>
        </div>
      </div>

      {/* Streak Status Notification Banner */}
      {streakStatus === 'broken' && (
        <div className="bg-[#FFF5F5] border border-[#FDE8E8] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#9B1C1C] shadow-xs animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FDE8E8] flex items-center justify-center shrink-0 text-lg shadow-xs">
              💔
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9B1C1C]">
                  {language === 'hi' ? 'दैनिक स्ट्रीक टूट गई' : 'Streak Broken'}
                </span>
                <span className="text-[10px] bg-white border border-[#F8B4B4] px-2 py-0.5 rounded-full font-mono font-bold text-[#9B1C1C]">
                  0 {language === 'hi' ? 'दिन' : 'days'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9B1C1C]/90 mt-0.5 font-normal">
                {streakMessage}
              </p>
            </div>
          </div>
          {longestStreak > 0 && (
            <div className="self-end sm:self-center shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white border border-[#FDE8E8] text-[#9B1C1C] shadow-2xs">
                {language === 'hi' ? `सर्वश्रेष्ठ: ${longestStreak} दिन` : `Longest: ${longestStreak}d`}
              </span>
            </div>
          )}
        </div>
      )}

      {streakStatus === 'continue_today' && (
        <div className="bg-[#FEF9E7] border border-[#FCF3CF] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#7D6608] shadow-xs animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FCF3CF] flex items-center justify-center shrink-0 text-lg shadow-xs">
              ⏳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7D6608]">
                  {language === 'hi' ? 'स्ट्रीक जारी रखें' : 'Keep Your Streak Alive'}
                </span>
                <span className="text-[10px] bg-white border border-[#F9E79F] px-2 py-0.5 rounded-full font-mono font-bold text-[#7D6608]">
                  {currentStreak} {language === 'hi' ? 'दिन' : 'days'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#7D6608]/90 mt-0.5 font-normal">
                {streakMessage}
              </p>
            </div>
          </div>
          {longestStreak > 0 && (
            <div className="self-end sm:self-center shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white border border-[#FCF3CF] text-[#7D6608] shadow-2xs">
                {language === 'hi' ? `सर्वश्रेष्ठ: ${longestStreak} दिन` : `Longest: ${longestStreak}d`}
              </span>
            </div>
          )}
        </div>
      )}

      {streakStatus === 'active' && (
        <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#166534] shadow-xs animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] flex items-center justify-center shrink-0 text-lg shadow-xs">
              🔥
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#166534]">
                  {language === 'hi' ? 'आज का लक्ष्य पूर्ण!' : "Today's Goal Achieved!"}
                </span>
                <span className="text-[10px] bg-white border border-[#BBF7D0] px-2 py-0.5 rounded-full font-mono font-bold text-[#166534]">
                  {currentStreak} {language === 'hi' ? 'दिन' : 'days'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#166534]/90 mt-0.5 font-normal">
                {streakMessage}
              </p>
            </div>
          </div>
          {longestStreak > 0 && (
            <div className="self-end sm:self-center shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white border border-[#DCFCE7] text-[#166534] shadow-2xs">
                {language === 'hi' ? `सर्वश्रेष्ठ: ${longestStreak} दिन` : `Longest: ${longestStreak}d`}
              </span>
            </div>
          )}
        </div>
      )}

      {streakStatus === 'not_started' && (
        <div className="bg-[#F9FAFB] border border-black/5 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-gray-700 shadow-xs animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0 text-lg shadow-xs">
              🌱
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                {language === 'hi' ? 'दैनिक स्ट्रीक शुरू करें' : 'Start Your Streak'}
              </span>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 font-normal">
                {streakMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Large Featured Hero Card: Today's Mission */}
      {todayMission && (
        <div className="relative bg-[#1A1A1A] rounded-[28px] sm:rounded-[36px] text-white p-5 sm:p-8 md:p-10 overflow-hidden shadow-xl group transition-all">
          {/* Subtle Orange Glow Ambient Blur */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF6321] rounded-full blur-[100px] opacity-25 pointer-events-none group-hover:opacity-35 transition-opacity" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full border border-white/30 text-[10px] uppercase tracking-widest bg-white/10 backdrop-blur-md text-white font-semibold">
                {t('home.todays_mission', language === 'hi' ? 'आज का मुख्य पाठ' : "Today's Mission")}
              </span>
              <span className="text-xs font-mono text-white/70">
                {getSubjectEmoji(todayMission.subject_id)} {getSubjectLabel(todayMission.subject_id, todayMission.subject_id)}
              </span>
            </div>

            <div className="max-w-2xl">
              <p className="text-[#D4D4D8] uppercase text-[11px] font-bold tracking-widest mb-1.5">
                {language === 'hi' ? `पाठ संख्या #${todayMissionNumber}` : `Lesson #${todayMissionNumber}`}
              </p>
              <h2 className="text-2xl sm:text-4xl font-serif italic mb-3 leading-[1.15] text-white">
                {language === 'hi' && todayMission.title_hi ? todayMission.title_hi : todayMission.title}
              </h2>
              {(todayMission.subtitle_hi || todayMission.subtitle) && (
                <p className="text-sm sm:text-base text-white/75 mb-6 font-light leading-relaxed">
                  {language === 'hi' && todayMission.subtitle_hi ? todayMission.subtitle_hi : todayMission.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 sm:gap-4 text-xs text-white/70 flex-wrap">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-white/60" />
                  {todayMission.estimated_minutes} {language === 'hi' ? 'मिनट' : 'min read'}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  {language === 'hi'
                    ? (todayMission.difficulty === 'Beginner' ? 'सरल' : todayMission.difficulty === 'Intermediate' ? 'मध्यम' : 'उन्नत')
                    : todayMission.difficulty}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-white border border-white/20">
                  +20 XP
                </span>
              </div>

              <button
                onClick={() => onStartLesson(todayMission)}
                id="start-mission-btn"
                className="w-full sm:w-auto bg-white text-[#1A1A1A] px-6 py-3 rounded-full font-bold text-xs hover:bg-[#F5F5F0] hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{language === 'hi' ? 'आज का पाठ शुरू करें' : "Start Today's Lesson"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Row: Quick Review Card & Subject Progress Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Quick Review Card */}
        <div className="bg-white border border-black/5 rounded-[28px] sm:rounded-[32px] p-6 flex flex-col justify-between shadow-sm hover:border-black/15 transition-all">
          <div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[10px] uppercase font-bold text-[#888] tracking-widest">
                  {language === 'hi' ? 'स्मृति अभ्यास' : 'Memory Workout'}
                </p>
                <h3 className="text-xl font-serif italic text-[#1A1A1A] mt-0.5">
                  {t('home.quick_revision')}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#FEF2E0] flex items-center justify-center text-amber-800 text-base">
                <RotateCcw className="w-4 h-4 text-amber-700" />
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-6 font-light">
              {language === 'hi'
                ? 'दैनिक व्यावहारिक प्रश्नों और अंतराल पुनरावृत्ति (Spaced Repetition) के माध्यम से सीखी गई बातों को सुदृढ़ करें।'
                : "Reinforce what you've learned through rapid-fire real-life scenario questions using spaced repetition."}
            </p>
          </div>

          <button
            onClick={onStartRevision}
            id="start-quick-revision-btn"
            className="w-full py-3 border border-[#1A1A1A] rounded-full text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{language === 'hi' ? '5-मिनट पुनरीक्षण शुरू करें' : 'Begin 5-Min Revision'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subject Progress Summary Card */}
        <div className="bg-[#F5F5F0] border border-black/5 rounded-[28px] sm:rounded-[32px] p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-[#888] tracking-widest">
                  {language === 'hi' ? 'पाठ्यक्रम प्रगति' : 'Curriculum Progress'}
                </p>
                <h3 className="text-xl font-serif italic text-[#1A1A1A] mt-0.5">
                  {language === 'hi' ? 'ज्ञान दक्षता' : 'Knowledge Mastery'}
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('progress')}
                className="text-xs font-bold text-[#1A1A1A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'hi' ? 'प्रगति विवरण' : 'Analytics'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[190px] overflow-y-auto pr-1">
              {userSubjects.map((sub) => {
                const progress = getSubjectProgress(sub.id);
                return (
                  <div
                    key={sub.id}
                    onClick={() => onSelectSubject(sub.id)}
                    className="cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
                        <span>{getSubjectEmoji(sub.id)}</span>
                        <span className="group-hover:underline">{getSubjectLabel(sub.id, sub.name)}</span>
                      </div>
                      <span className="font-mono text-xs text-gray-500 font-medium">
                        {progress.completedCount}/{progress.totalCount} ({progress.percentage}%)
                      </span>
                    </div>

                    <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1A1A1A] rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-black" />
              <strong className="text-black">{completedCount}</strong> {language === 'hi' ? 'पाठ पूर्ण हुए' : 'lessons completed'}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-black" />
              <strong className="text-black">{totalXp}</strong> {language === 'hi' ? 'XP अर्जित' : 'XP earned'}
            </span>
          </div>
        </div>
      </div>

      {/* Curriculum Exploration Section */}
      <div className="bg-white border border-black/5 rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-[#888] tracking-widest">
              {language === 'hi' ? 'उपलब्ध विषय' : 'Available Domains'}
            </p>
            <h3 className="text-xl sm:text-2xl font-serif italic text-[#1A1A1A] mt-0.5">
              {language === 'hi' ? `सभी ${subjects.length} विषयों का अन्वेषण करें` : `Explore ${subjects.length} Subjects`}
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('learn')}
            className="px-4 py-1.5 rounded-full text-xs font-bold border border-black/10 text-[#1A1A1A] hover:bg-[#F5F5F0] transition-colors cursor-pointer"
          >
            {language === 'hi' ? 'सभी पाठ्यक्रम देखें' : 'View All Roadmaps'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((sub) => {
            const progress = getSubjectProgress(sub.id);
            const iconBg =
              sub.id === 'law-rights'
                ? 'bg-[#E6F4EA]'
                : sub.id === 'money-finance'
                ? 'bg-[#FEF7E0]'
                : sub.id === 'economics'
                ? 'bg-[#F4EBF7]'
                : sub.id === 'bihar-special'
                ? 'bg-[#FDF2F8]'
                : sub.id === 'polity-constitution'
                ? 'bg-[#F5F3FF]'
                : 'bg-[#FFFBEB]';

            return (
              <div
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className="p-5 rounded-2xl border border-black/5 bg-[#FDFCFB] hover:border-black/20 cursor-pointer transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-2xl ${iconBg} flex items-center justify-center text-lg shadow-xs`}>
                      {getSubjectEmoji(sub.id)}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 bg-black/5 px-2 py-0.5 rounded-full">
                      {progress.percentage}%
                    </span>
                  </div>
                  <h4 className="font-serif italic font-bold text-base text-[#1A1A1A] group-hover:underline">
                    {getSubjectLabel(sub.id, sub.name)}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {getSubjectDesc(sub.id, sub.description)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
                  <span>{progress.totalCount} {language === 'hi' ? 'पाठ' : 'Lessons'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

