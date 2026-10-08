import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Calendar as CalendarIcon,
  Flame,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalDateString } from '../../lib/streakHelper';
import { UserProgress } from '../../types';

interface LearningActivityCalendarProps {
  onBack: () => void;
}

export const LearningActivityCalendar: React.FC<LearningActivityCalendarProps> = ({ onBack }) => {
  const { stats, progressMap, currentStreak: ctxStreak } = useLearning();
  const { language } = useLanguage();

  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => getLocalDateString(today), [today]);

  // Current viewing month & year (0-indexed month)
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);

  const currentStreak = ctxStreak ?? stats?.current_streak ?? 7;

  // Extract all actual learning activity by date YYYY-MM-DD
  const activityByDate = useMemo(() => {
    const map: Record<string, number> = {};

    // 1. From progressMap completed lessons
    if (progressMap) {
      (Object.values(progressMap) as UserProgress[]).forEach((p: UserProgress) => {
        if (p.completed && p.completed_at) {
          try {
            const d = new Date(p.completed_at);
            if (!isNaN(d.getTime())) {
              const dStr = getLocalDateString(d);
              map[dStr] = (map[dStr] || 0) + 1;
            }
          } catch {
            // ignore invalid date
          }
        }
      });
    }

    // 2. From stats.completed_dates / stats.completedDates
    const compDates = stats?.completed_dates || stats?.completedDates || [];
    compDates.forEach((dStr) => {
      if (typeof dStr === 'string' && dStr.trim()) {
        const clean = dStr.includes('T') ? dStr.split('T')[0] : dStr.trim();
        if (!map[clean]) {
          map[clean] = 1;
        }
      }
    });

    // 3. For current streak days
    if (currentStreak > 0) {
      for (let i = 0; i < currentStreak; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dStr = getLocalDateString(d);
        if (!map[dStr]) {
          map[dStr] = 1;
        }
      }
    }

    return map;
  }, [progressMap, stats, currentStreak]);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleJumpToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDateStr(todayStr);
  };

  // Month metadata
  const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthNamesHi = [
    'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
  ];

  const monthLabel = language === 'hi' ? monthNamesHi[currentMonth] : monthNamesEn[currentMonth];
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Days calculations (Monday start)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayDow = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; // 0 = Mon, 6 = Sun

  // Monthly stats
  const monthlyStats = useMemo(() => {
    let activeDays = 0;
    let totalLessons = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const dStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const count = activityByDate[dStr] || 0;
      if (count > 0) {
        activeDays++;
        totalLessons += count;
      }
    }

    return { activeDays, totalLessons };
  }, [currentYear, currentMonth, daysInMonth, activityByDate]);

  // Selected date details
  const selectedDetails = useMemo(() => {
    if (!selectedDateStr) return null;
    const count = activityByDate[selectedDateStr] || 0;
    const parts = selectedDateStr.split('-').map(Number);
    const d = new Date(parts[0], parts[1] - 1, parts[2]);

    const formattedDate = d.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      formattedDate,
      count,
      isActive: count > 0,
      isToday: selectedDateStr === todayStr,
    };
  }, [selectedDateStr, activityByDate, language, todayStr]);

  return (
    <div className="max-w-md mx-auto px-4 sm:px-5 py-3 sm:py-5 space-y-4 animate-fadeIn pb-28">
      {/* 1. TOP HEADER WITH BACK BUTTON */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={onBack}
          id="back-to-progress-btn"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#131926] border border-black/[0.08] dark:border-white/[0.08] text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white shadow-2xs active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'प्रगति पर वापस' : 'Back to Progress'}</span>
        </button>

        <button
          type="button"
          onClick={handleJumpToToday}
          className="text-xs font-semibold text-violet-700 dark:text-violet-400 hover:underline cursor-pointer flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'आज' : 'Today'}</span>
        </button>
      </div>

      {/* 2. TITLE & SUBTITLE */}
      <div className="space-y-0.5">
        <h1 className="text-2xl sm:text-3xl font-serif italic text-[#090D16] dark:text-[#F8FAFC] tracking-tight font-medium flex items-center gap-2">
          <span>{language === 'hi' ? 'अध्ययन कैलेंडर' : 'Learning Activity Calendar'}</span>
          <CalendarIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
          {language === 'hi'
            ? 'आपके दैनिक अध्ययन सत्र और निरंतरता का विवरण।'
            : 'Track your daily study consistency and lesson completions.'}
        </p>
      </div>

      {/* 3. MONTH SUMMARY METRICS */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs text-center">
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 uppercase font-semibold block truncate">
            {language === 'hi' ? 'सक्रिय दिन' : 'Days Active'}
          </span>
          <p className="text-lg font-serif italic font-bold text-[#090D16] dark:text-[#F8FAFC]">
            {monthlyStats.activeDays}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs text-center">
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 uppercase font-semibold block truncate">
            {language === 'hi' ? 'पूर्ण पाठ' : 'Lessons'}
          </span>
          <p className="text-lg font-serif italic font-bold text-[#090D16] dark:text-[#F8FAFC]">
            {monthlyStats.totalLessons}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs text-center">
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 uppercase font-semibold block truncate">
            {language === 'hi' ? 'वर्तमान स्ट्रीक' : 'Streak'}
          </span>
          <p className="text-lg font-serif italic font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-0.5">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{currentStreak}d</span>
          </p>
        </div>
      </div>

      {/* 4. MAIN CALENDAR CARD */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-4">
        {/* Month & Year Navigation Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base sm:text-lg font-bold font-serif text-[#090D16] dark:text-[#F8FAFC]">
              {monthLabel} {currentYear}
            </h2>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="w-8 h-8 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#1A2234] text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
              className="w-8 h-8 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#1A2234] text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center border-b border-black/[0.04] dark:border-white/[0.04] pb-2">
          {daysOfWeek.map((day) => (
            <span
              key={day}
              className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-medium"
            >
              {day}
            </span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
          {/* Empty padding slots before 1st of month */}
          {Array.from({ length: firstDayDow }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-9 sm:h-10 rounded-xl" />
          ))}

          {/* Actual days of the month */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const count = activityByDate[dStr] || 0;
            const isToday = dStr === todayStr;
            const isSelected = dStr === selectedDateStr;

            // Activity Intensity Styles
            let activityClass = 'bg-slate-50/70 dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]';

            if (count === 1) {
              activityClass = 'bg-violet-600 text-white font-bold shadow-2xs';
            } else if (count === 2) {
              activityClass = 'bg-violet-700 text-white font-bold shadow-xs ring-1 ring-violet-400/40';
            } else if (count >= 3) {
              activityClass = 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold shadow-xs ring-1 ring-amber-300/60';
            }

            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => setSelectedDateStr(dStr)}
                className={`relative h-9 sm:h-10 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer select-none text-xs ${activityClass} ${
                  isSelected ? 'ring-2 ring-violet-500 dark:ring-violet-400 scale-105 z-10' : ''
                } ${isToday ? 'border-2 border-amber-500 dark:border-amber-400' : ''}`}
                title={`${dStr}: ${count} ${count === 1 ? 'lesson' : 'lessons'}`}
              >
                <span>{dayNum}</span>

                {/* Subtle activity dot underneath if active */}
                {count > 0 && (
                  <span className="w-1 h-1 rounded-full bg-amber-300 dark:bg-amber-200 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Intensity Legend */}
        <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
          <span>Less</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]" title="No activity" />
            <span className="w-3.5 h-3.5 rounded-md bg-violet-600" title="1 lesson" />
            <span className="w-3.5 h-3.5 rounded-md bg-violet-700" title="2 lessons" />
            <span className="w-3.5 h-3.5 rounded-md bg-gradient-to-br from-violet-600 to-indigo-600 ring-1 ring-amber-300" title="3+ lessons" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* 5. SELECTED DAY DETAIL CARD */}
      {selectedDetails && (
        <div className="p-4 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-serif italic font-bold text-sm text-[#090D16] dark:text-[#F8FAFC]">
              {selectedDetails.formattedDate}
            </h3>
            {selectedDetails.isToday && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
                Today
              </span>
            )}
          </div>

          {selectedDetails.isActive ? (
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {selectedDetails.count}{' '}
                {selectedDetails.count === 1 ? 'lesson completed' : 'lessons completed'} on this day
              </span>
            </div>
          ) : (
            <p className="text-xs text-slate-400 dark:text-slate-500 font-light pt-0.5">
              No learning activity recorded for this date.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
