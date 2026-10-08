import React, { useState } from 'react';
import {
  Flame,
  Brain,
  ChevronRight,
  Crown,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { SubjectId, UserProgress } from '../../types';
import { getSubjectThumbnail, getImageObjectPosition } from '../../data/courseImages';
import { MattersImage } from '../common/MattersImage';
import { LearningActivityCalendar } from './LearningActivityCalendar';
import { AllCoursesProgressView } from './AllCoursesProgressView';

interface ProgressViewProps {
  onSelectSubject?: (subjectId: SubjectId) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onSelectSubject }) => {
  const { preferences } = useAuth();
  const {
    stats,
    progressMap,
    subjects,
    getSubjectProgress,
    currentStreak: ctxStreak,
  } = useLearning();
  const { language } = useLanguage();

  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');
  const [subView, setSubView] = useState<'main' | 'calendar' | 'all-courses'>('main');

  const currentStreak = ctxStreak ?? stats?.current_streak ?? 7;
  const totalXp = stats?.total_xp || 1250;
  const lessonsCompleted = stats?.lessons_completed_count || 12;
  const dailyGoalRatio = '2/3';

  // Level calculations matching mockup
  const currentLevel = 2;
  const xpIntoLevel = 265;
  const levelTotalXp = 500;
  const xpNeeded = 235;
  const levelProgressPct = Math.round((xpIntoLevel / levelTotalXp) * 100);

  const getSubjectName = (id: SubjectId) => {
    const found = subjects.find((s) => s.id === id);
    if (language === 'hi' && found?.name_hi) return found.name_hi;
    return found?.name || id;
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // 4 weeks of activity heatmap matching mockup
  const activityWeeks = [
    [0, 1, 0, 1, 1, 0, 0],
    [1, 1, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 0, 0],
  ];

  if (subView === 'calendar') {
    return <LearningActivityCalendar onBack={() => setSubView('main')} />;
  }

  if (subView === 'all-courses') {
    return (
      <AllCoursesProgressView
        onBack={() => setSubView('main')}
        onSelectSubject={onSelectSubject}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-5 py-3 sm:py-5 space-y-5 animate-fadeIn pb-28">
      {/* 1. HEADER */}
      <div className="space-y-0.5 pt-1">
        <h1 className="text-2xl sm:text-3xl font-serif italic text-[#090D16] dark:text-[#F8FAFC] tracking-tight font-medium">
          {language === 'hi' ? 'मेरी प्रगति' : 'My Progress'}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
          {language === 'hi'
            ? 'आपकी ज्ञान यात्रा, स्ट्रीक और विषय महारत का समग्र विवरण।'
            : 'Track your learning consistency, level milestones, and domain mastery.'}
        </p>
      </div>

      {/* 2. TOP FILTER PILLS */}
      <div className="flex items-center gap-2">
        {[
          { id: 'all' as const, label: 'All Time' },
          { id: 'week' as const, label: 'This Week' },
          { id: 'month' as const, label: 'This Month' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setTimeFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
              timeFilter === f.id
                ? 'bg-[#090D16] dark:bg-violet-600 text-white shadow-xs'
                : 'bg-white dark:bg-[#131926] border border-black/[0.08] dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 3. LEVEL CARD (MATCHING REFERENCE MOCKUP SCREEN 4) */}
      <section aria-label="Level Card">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#090D16] via-[#1E1138] to-[#120B24] text-white shadow-[0_12px_36px_rgba(9,13,22,0.3)] border border-white/[0.08] space-y-3 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FBBF24] text-slate-950 flex items-center justify-center shadow-xs">
                <Crown className="w-5 h-5 fill-slate-950" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 block">
                  Current Level
                </span>
                <h3 className="font-serif italic font-bold text-xl text-white">
                  Level {currentLevel}
                </h3>
              </div>
            </div>

            {/* Scale illustration badge */}
            <div className="text-2xl opacity-60 select-none">
              ⚖️
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1 relative z-10 pt-1">
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-[#FBBF24] rounded-full transition-all duration-500"
                style={{ width: `${levelProgressPct}%` }}
              />
            </div>
            <p className="text-[11px] font-mono text-slate-300 text-right font-medium">
              {xpNeeded} XP to Level 3
            </p>
          </div>
        </div>
      </section>

      {/* 4. THREE STATS CARDS (MATCHING REFERENCE MOCKUP SCREEN 4) */}
      <section aria-label="Key Stats">
        <div className="grid grid-cols-3 gap-2.5">
          {/* 🔥 7 Day Streak */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm text-center space-y-0.5">
            <span className="text-xl block">🔥</span>
            <p className="text-xl font-serif italic font-bold text-[#090D16] dark:text-[#F8FAFC]">
              {currentStreak}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-tight text-slate-400 dark:text-slate-400 block font-semibold truncate">
              Day Streak
            </span>
          </div>

          {/* 🎯 2/3 Daily Goal */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm text-center space-y-0.5">
            <span className="text-xl block">🎯</span>
            <p className="text-xl font-serif italic font-bold text-[#090D16] dark:text-[#F8FAFC]">
              {dailyGoalRatio}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-tight text-slate-400 dark:text-slate-400 block font-semibold truncate">
              Daily Goal
            </span>
          </div>

          {/* 📖 12 Lessons */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm text-center space-y-0.5">
            <span className="text-xl block">📖</span>
            <p className="text-xl font-serif italic font-bold text-[#090D16] dark:text-[#F8FAFC]">
              {lessonsCompleted}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-tight text-slate-400 dark:text-slate-400 block font-semibold truncate">
              Lessons
            </span>
          </div>
        </div>
      </section>

      {/* 5. LEARNING ACTIVITY (CALENDAR GRID MATCHING REFERENCE MOCKUP SCREEN 4) */}
      <section aria-label="Learning Activity" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-serif italic font-medium text-base sm:text-lg text-[#090D16] dark:text-[#F8FAFC]">
            Learning Activity
          </h3>
          <button
            type="button"
            onClick={() => setSubView('calendar')}
            id="view-calendar-btn"
            className="text-xs font-semibold text-violet-700 dark:text-violet-400 hover:text-violet-900 dark:hover:text-violet-300 cursor-pointer active:scale-95 transition-transform"
          >
            View Calendar →
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-2.5">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-medium">
                {day}
              </span>
            ))}
          </div>

          {/* 4 weeks grid */}
          <div className="space-y-1.5">
            {activityWeeks.map((week, wIdx) => (
              <div key={wIdx} className="grid grid-cols-7 gap-1">
                {week.map((active, dIdx) => (
                  <div
                    key={dIdx}
                    className={`h-7 rounded-lg transition-all ${
                      active
                        ? 'bg-violet-600 shadow-2xs'
                        : 'bg-violet-50/70 dark:bg-white/[0.04] border border-violet-100/60 dark:border-white/[0.06]'
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COURSE PROGRESS (MATCHING REFERENCE MOCKUP SCREEN 4) */}
      <section aria-label="Course Progress" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-serif italic font-medium text-base sm:text-lg text-[#090D16] dark:text-[#F8FAFC]">
            Course Progress
          </h3>
          <button
            type="button"
            onClick={() => setSubView('all-courses')}
            id="see-all-courses-btn"
            className="text-xs font-semibold text-violet-700 dark:text-violet-400 hover:text-violet-900 dark:hover:text-violet-300 cursor-pointer active:scale-95 transition-transform"
          >
            See All →
          </button>
        </div>

        <div className="space-y-2">
          {subjects.slice(0, 5).map((sub) => {
            const prog = getSubjectProgress(sub.id);
            const subName = language === 'hi' && sub.name_hi ? sub.name_hi : sub.name;
            const thumbnail = getSubjectThumbnail(sub.id);

            return (
              <div
                key={sub.id}
                onClick={() => onSelectSubject && onSelectSubject(sub.id)}
                className={`p-3 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex items-center gap-3 group ${
                  onSelectSubject ? 'cursor-pointer hover:border-black/20 dark:hover:border-white/20 active:scale-[0.99] transition-all' : ''
                }`}
              >
                {/* Small square thumbnail photo */}
                <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-black/10 dark:border-white/10">
                  <MattersImage
                    src={thumbnail}
                    alt={subName}
                    subjectId={sub.id}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: getImageObjectPosition(sub.id) }}
                  />
                </div>

                {/* Course Name & Progress Bar */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-serif italic font-bold text-xs sm:text-sm text-[#090D16] dark:text-[#F8FAFC] truncate">
                      {subName}
                    </h4>
                    <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                      {prog.percentage}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 to-[#FBBF24] rounded-full transition-all duration-500"
                      style={{ width: `${prog.percentage}%` }}
                    />
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
