import React from 'react';
import {
  Flame,
  Clock,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { Lesson, SubjectId, ActiveTab, UserProgress } from '../../types';
import { ALL_LESSONS, getTopicsBySubject } from '../../data/initialContent';
import {
  getSubjectThumbnail,
  getSubjectBanner,
  getLessonImage,
  getImageObjectPosition,
  SUBJECT_IMAGES,
} from '../../data/courseImages';
import { MattersImage } from '../common/MattersImage';

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
    currentStreak: ctxStreak,
    progressMap,
  } = useLearning();
  const { language } = useLanguage();

  const currentStreak = ctxStreak ?? stats?.current_streak ?? 7;
  const totalXp = stats?.total_xp || 1250;
  const completedCount = stats?.lessons_completed_count || 12;
  const dailyGoalRatio = '2/3';

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

  const userName = user?.name ? user.name.split(' ')[0] : (language === 'hi' ? 'Anurag' : 'Anurag');

  const getSubjectName = (id: SubjectId) => {
    const found = subjects.find((s) => s.id === id);
    if (language === 'hi' && found?.name_hi) return found.name_hi;
    return found?.name || id;
  };

  // Safe calculation of lesson number for today's mission
  const todayMissionNumber =
    todayMission?.lesson_number ??
    (todayMission as any)?.lessonNumber ??
    (() => {
      if (!todayMission) return 6;
      const match = todayMission.id?.match(/\d+$/) || todayMission.topic_id?.match(/\d+$/);
      if (match) return parseInt(match[0], 10);
      return 6;
    })();

  const todaySubjectTotalLessons = todayMission
    ? getTopicsBySubject(todayMission.subject_id).length || 10
    : 10;

  // Determine "Continue Learning" course & lesson
  const completedList = (Object.values(progressMap) as UserProgress[])
    .filter((p) => p.completed)
    .sort((a, b) => new Date(b.completed_at || 0).getTime() - new Date(a.completed_at || 0).getTime());

  // Find Philosophy or a prominent subject for Continue Learning
  const continueSubject =
    subjects.find((s) => s.id === 'philosophy') ||
    subjects[0];

  const continueProgress = continueSubject
    ? getSubjectProgress(continueSubject.id)
    : { completedCount: 4, totalCount: 10, percentage: 60 };

  const continueTopics = continueSubject ? getTopicsBySubject(continueSubject.id) : [];
  const continueLesson =
    ALL_LESSONS.find((l) => l.subject_id === continueSubject.id) ||
    ALL_LESSONS[0];

  // Recommended courses matching mockup (History, Economics, Science)
  const recommendedCourses = [
    subjects.find((s) => s.id === 'history-movement') || subjects[5],
    subjects.find((s) => s.id === 'economics') || subjects[2],
    subjects.find((s) => s.id === 'paradoxes') || subjects[0],
  ].filter(Boolean);

  const heroBannerImage = todayMission
    ? getLessonImage(todayMission, todayMission.subject_id, todayMission.title)
    : 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="max-w-md mx-auto px-4 sm:px-5 py-3 sm:py-5 space-y-5 animate-fadeIn pb-28">
      {/* 1. GREETING SECTION */}
      <div className="space-y-0.5 pt-1">
        <h1 className="text-2xl sm:text-3xl font-serif italic text-[#090D16] tracking-tight font-medium">
          {getGreeting()}, {userName}! 👋
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-light">
          {language === 'hi'
            ? 'आज कुछ नया सीखने के लिए तैयार हैं?'
            : 'Ready to learn something new today?'}
        </p>
      </div>

      {/* 2. TODAY'S MISSION (HERO CARD - MATCHING REFERENCE IMAGE 1) */}
      {todayMission && (
        <section aria-label="Today's Mission">
          <div className="relative bg-[#090D16] text-white rounded-3xl p-5 shadow-[0_16px_40px_-10px_rgba(9,13,22,0.35)] border border-white/[0.08] space-y-4 overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Pill & Subhead */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-violet-950/80 text-violet-200 border border-violet-500/40">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {language === 'hi' ? "आज का मुख्य पाठ" : "TODAY'S MISSION"}
              </span>
              <p className="text-xs font-mono font-medium text-amber-300">
                {getSubjectName(todayMission.subject_id)} · {language === 'hi' ? `पाठ ${todayMissionNumber} / ${todaySubjectTotalLessons}` : `Lesson ${todayMissionNumber} / ${todaySubjectTotalLessons}`}
              </p>
            </div>

            {/* Large Rich Educational Image Banner */}
            <div className="relative h-32 sm:h-36 w-full rounded-2xl overflow-hidden shadow-inner border border-white/[0.1]">
              <MattersImage
                src={heroBannerImage}
                alt={todayMission.title}
                fallbackSrc={getSubjectBanner(todayMission?.subject_id)}
                subjectId={todayMission?.subject_id}
                lessonId={todayMission?.id}
                className="w-full h-full object-cover"
                style={{ objectPosition: getImageObjectPosition(todayMission, todayMission?.subject_id) }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Title & Description */}
            <div className="space-y-1.5 relative z-10">
              <h2 className="text-xl sm:text-2xl font-serif italic text-white font-medium leading-tight">
                {language === 'hi' && todayMission.title_hi
                  ? todayMission.title_hi
                  : todayMission.title}
              </h2>
              {(todayMission.subtitle_hi || todayMission.subtitle) && (
                <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-2">
                  {language === 'hi' && todayMission.subtitle_hi
                    ? todayMission.subtitle_hi
                    : todayMission.subtitle}
                </p>
              )}
            </div>

            {/* Metadata Row: Duration | Difficulty | XP */}
            <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap font-light pt-0.5 relative z-10">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{todayMission.estimated_minutes} mins</span>
              </span>
              <span className="text-white/30">|</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{todayMission.difficulty}</span>
              </span>
              <span className="text-white/30">|</span>
              <span className="font-mono font-bold text-amber-300">
                +20 XP
              </span>
            </div>

            {/* Primary CTA: Warm Golden Yellow Button */}
            <div className="pt-1 relative z-10">
              <button
                onClick={() => onStartLesson(todayMission)}
                id="start-mission-btn"
                className="w-full bg-[#FBBF24] hover:bg-[#F59E0B] active:scale-[0.98] text-slate-950 py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_6px_20px_rgba(251,191,36,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{language === 'hi' ? 'आज का पाठ शुरू करें →' : "Start Today's Lesson →"}</span>
              </button>
            </div>

            {/* Progress Bar with 60% */}
            <div className="flex items-center gap-3 pt-1 relative z-10">
              <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 via-purple-400 to-[#FBBF24] rounded-full transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-300">60%</span>
            </div>
          </div>
        </section>
      )}

      {/* 3. QUICK STATS (4 COMPACT WHITE CARDS MATCHING REFERENCE MOCKUP) */}
      <section aria-label="Quick Stats">
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
          {/* 🔥 Day Streak */}
          <div
            onClick={() => setActiveTab('progress')}
            className="p-3 rounded-2xl bg-white border border-black/[0.06] shadow-sm text-center cursor-pointer hover:border-black/20 active:scale-95 transition-all"
          >
            <span className="text-lg block">🔥</span>
            <p className="text-base sm:text-lg font-serif italic font-bold text-[#090D16] mt-0.5">
              {currentStreak}
            </p>
            <span className="text-[9px] font-mono uppercase tracking-tight text-slate-400 block font-semibold truncate">
              {language === 'hi' ? 'दैनिक स्ट्रीक' : 'Day Streak'}
            </span>
          </div>

          {/* ⭐ Total XP */}
          <div
            onClick={() => setActiveTab('progress')}
            className="p-3 rounded-2xl bg-white border border-black/[0.06] shadow-sm text-center cursor-pointer hover:border-black/20 active:scale-95 transition-all"
          >
            <span className="text-lg block">⭐</span>
            <p className="text-base sm:text-lg font-serif italic font-bold text-[#090D16] mt-0.5">
              {totalXp}
            </p>
            <span className="text-[9px] font-mono uppercase tracking-tight text-slate-400 block font-semibold truncate">
              {language === 'hi' ? 'कुल XP' : 'Total XP'}
            </span>
          </div>

          {/* 🎯 Daily Goal */}
          <div
            onClick={() => setActiveTab('profile')}
            className="p-3 rounded-2xl bg-white border border-black/[0.06] shadow-sm text-center cursor-pointer hover:border-black/20 active:scale-95 transition-all"
          >
            <span className="text-lg block">🎯</span>
            <p className="text-base sm:text-lg font-serif italic font-bold text-[#090D16] mt-0.5">
              {dailyGoalRatio}
            </p>
            <span className="text-[9px] font-mono uppercase tracking-tight text-slate-400 block font-semibold truncate">
              {language === 'hi' ? 'दैनिक लक्ष्य' : 'Daily Goal'}
            </span>
          </div>

          {/* 📖 Completed */}
          <div
            onClick={() => setActiveTab('progress')}
            className="p-3 rounded-2xl bg-white border border-black/[0.06] shadow-sm text-center cursor-pointer hover:border-black/20 active:scale-95 transition-all"
          >
            <span className="text-lg block">📖</span>
            <p className="text-base sm:text-lg font-serif italic font-bold text-[#090D16] mt-0.5">
              {completedCount}
            </p>
            <span className="text-[9px] font-mono uppercase tracking-tight text-slate-400 block font-semibold truncate">
              {language === 'hi' ? 'पूर्ण पाठ' : 'Completed'}
            </span>
          </div>
        </div>
      </section>

      {/* 4. CONTINUE LEARNING (MATCHING REFERENCE MOCKUP SCREEN 1) */}
      <section aria-label="Continue Learning" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-serif italic font-medium text-base sm:text-lg text-[#090D16]">
            {language === 'hi' ? 'जहाँ से आपने छोड़ा था' : 'Continue Learning'}
          </h3>
          <button
            onClick={() => setActiveTab('learn')}
            className="text-xs font-semibold text-violet-700 hover:text-violet-900 flex items-center gap-0.5 cursor-pointer active:scale-95"
          >
            <span>{language === 'hi' ? 'सभी देखें →' : 'See All →'}</span>
          </button>
        </div>

        {/* Compact Horizontal Card with Real Thumbnail Image */}
        <div
          onClick={() => {
            if (continueLesson) onStartLesson(continueLesson);
            else onSelectSubject(continueSubject.id);
          }}
          className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:border-black/20 hover:shadow-md cursor-pointer transition-all active:scale-[0.99] flex items-center gap-3.5"
        >
          {/* Square Image Thumbnail: Matched to Continue Lesson */}
          <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-black/10 shadow-2xs">
            <MattersImage
              src={getLessonImage(
                continueLesson,
                continueSubject.id,
                continueLesson?.title
              )}
              alt={continueLesson?.title || 'Lesson'}
              fallbackSrc={getSubjectThumbnail(continueSubject.id)}
              subjectId={continueSubject.id}
              lessonId={continueLesson?.id}
              className="w-full h-full object-cover"
              style={{ objectPosition: getImageObjectPosition(continueLesson, continueSubject.id) }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              {language === 'hi' ? 'दर्शनशास्त्र' : 'Philosophy'}
            </span>
            <h4 className="text-sm font-serif italic font-bold text-[#090D16] truncate">
              {language === 'hi' ? 'थीसियस का जहाज़ (Theseus\' Ship)' : "Theseus' Ship"}
            </h4>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
              <span>{language === 'hi' ? 'पाठ 4 / 10' : 'Lesson 4 / 10'}</span>
              <span className="font-mono font-bold text-slate-700">60%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-[#FBBF24] rounded-full"
                style={{ width: '60%' }}
              />
            </div>
          </div>

          {/* Continue Arrow Button */}
          <div className="w-8 h-8 rounded-full bg-[#090D16] text-white flex items-center justify-center shrink-0 shadow-xs">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* 5. RECOMMENDED FOR YOU (3 COMPACT VISUAL CARDS MATCHING REFERENCE MOCKUP) */}
      <section aria-label="Recommended for You" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-serif italic font-medium text-base sm:text-lg text-[#090D16]">
            {language === 'hi' ? 'आपके लिए सुझाए गए कोर्स' : 'Recommended for You'}
          </h3>
          <button
            onClick={() => setActiveTab('learn')}
            className="text-xs font-semibold text-violet-700 hover:text-violet-900 flex items-center gap-0.5 cursor-pointer active:scale-95"
          >
            <span>{language === 'hi' ? 'सभी देखें →' : 'See All →'}</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {/* Card 1: History / Indian Freedom */}
          <div
            onClick={() => onSelectSubject('history-movement')}
            className="p-2.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:border-black/20 hover:shadow-md cursor-pointer transition-all active:scale-[0.98] flex flex-col justify-between group"
          >
            <div>
              <div className="h-20 w-full rounded-xl overflow-hidden mb-2 border border-black/10">
                <MattersImage
                  src={getSubjectThumbnail('history-movement')}
                  alt="History"
                  subjectId="history-movement"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-semibold block truncate">
                {language === 'hi' ? 'इतिहास' : 'History'}
              </span>
              <h4 className="font-serif italic font-bold text-xs text-[#090D16] truncate mt-0.5">
                {language === 'hi' ? 'भारतीय स्वतंत्रता' : 'Indian Freedom'}
              </h4>
            </div>
            <div className="mt-2 pt-1.5 border-t border-black/[0.04] space-y-1">
              <span className="text-[9px] font-mono text-slate-400 block truncate">12 lessons</span>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-violet-600 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>

          {/* Card 2: Economics / Money & Finance */}
          <div
            onClick={() => onSelectSubject('money-finance')}
            className="p-2.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:border-black/20 hover:shadow-md cursor-pointer transition-all active:scale-[0.98] flex flex-col justify-between group"
          >
            <div>
              <div className="h-20 w-full rounded-xl overflow-hidden mb-2 border border-black/10">
                <MattersImage
                  src={getSubjectThumbnail('money-finance')}
                  alt="Money & Finance"
                  subjectId="money-finance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-semibold block truncate">
                {language === 'hi' ? 'अर्थशास्त्र' : 'Economics'}
              </span>
              <h4 className="font-serif italic font-bold text-xs text-[#090D16] truncate mt-0.5">
                {language === 'hi' ? 'धन एवं वित्त' : 'Money & Finance'}
              </h4>
            </div>
            <div className="mt-2 pt-1.5 border-t border-black/[0.04] space-y-1">
              <span className="text-[9px] font-mono text-slate-400 block truncate">10 lessons</span>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-violet-600 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
          </div>

          {/* Card 3: Science / Mind & Paradoxes */}
          <div
            onClick={() => onSelectSubject('paradoxes')}
            className="p-2.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:border-black/20 hover:shadow-md cursor-pointer transition-all active:scale-[0.98] flex flex-col justify-between group"
          >
            <div>
              <div className="h-20 w-full rounded-xl overflow-hidden mb-2 border border-black/10">
                <MattersImage
                  src={getSubjectThumbnail('paradoxes')}
                  alt="Science"
                  subjectId="paradoxes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-semibold block truncate">
                {language === 'hi' ? 'विज्ञान' : 'Science'}
              </span>
              <h4 className="font-serif italic font-bold text-xs text-[#090D16] truncate mt-0.5">
                {language === 'hi' ? 'मानव मस्तिष्क' : 'Human Mind'}
              </h4>
            </div>
            <div className="mt-2 pt-1.5 border-t border-black/[0.04] space-y-1">
              <span className="text-[9px] font-mono text-slate-400 block truncate">15 lessons</span>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-violet-600 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
