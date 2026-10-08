import React, { useState, useEffect, useMemo } from 'react';
import {
  Check,
  Lock,
  Sparkles,
  Trophy,
  ArrowRight,
  X,
  Target,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import {
  computeAchievements,
  markAchievementsAsSeen,
  ComputedAchievement,
} from '../../data/achievementsData';
import { PremiumMedal } from './PremiumMedal';

interface AchievementsViewProps {
  onNavigateToLearn?: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  onNavigateToLearn,
}) => {
  const { stats, progressMap, currentStreak } = useLearning();

  const { earned, locked, newlyUnlocked } = useMemo(() => {
    return computeAchievements(stats, progressMap, currentStreak);
  }, [stats, progressMap, currentStreak]);

  // Handle subtle new unlock toast/banner
  const [activeUnlockToast, setActiveUnlockToast] = useState<ComputedAchievement | null>(null);

  useEffect(() => {
    if (newlyUnlocked.length > 0) {
      setActiveUnlockToast(newlyUnlocked[0]);
      markAchievementsAsSeen(newlyUnlocked.map((a) => a.id));
    }
  }, [newlyUnlocked]);

  const handleDismissToast = () => {
    setActiveUnlockToast(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-2">
      {/* 0. NEW UNLOCK HIGHLIGHT BANNER (Shows only once on genuine fresh unlock) */}
      {activeUnlockToast && (
        <div className="relative p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-violet-500/15 border border-amber-500/30 dark:border-amber-400/25 shadow-md flex items-center justify-between gap-3 animate-slideUp">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full blur-sm bg-amber-400/40 animate-pulse pointer-events-none" />
              <PremiumMedal
                tier={activeUnlockToast.tier}
                motif={activeUnlockToast.motif}
                size={44}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Achievement Unlocked!</span>
              </div>
              <h4 className="font-serif italic font-bold text-sm text-[#090D16] dark:text-[#F8FAFC]">
                {activeUnlockToast.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                {activeUnlockToast.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismissToast}
            aria-label="Dismiss banner"
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. SECTION 1 — EARNED ACHIEVEMENTS */}
      <section aria-label="Earned Achievements" className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-[#090D16] dark:text-[#F8FAFC] flex items-center gap-2">
              <span>Your Achievements</span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/40">
                {earned.length} earned
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
              Milestones you've already unlocked.
            </p>
          </div>
        </div>

        {earned.length === 0 ? (
          /* EMPTY STATE */
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-2xs">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif italic font-bold text-base text-[#090D16] dark:text-[#F8FAFC]">
                Your first achievement is waiting.
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light max-w-xs mx-auto">
                Complete your first micro-lesson to earn your inaugural medal and begin your collection.
              </p>
            </div>
            {onNavigateToLearn && (
              <button
                type="button"
                onClick={onNavigateToLearn}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer mt-1"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          /* 2-COLUMN MEDAL GRID */
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {earned.map((item) => (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex flex-col items-center text-center space-y-2.5 hover:border-amber-400/50 dark:hover:border-amber-400/30 transition-all duration-200 group"
              >
                {/* 3D Medal with subtle ambient aura */}
                <div className="relative pt-1">
                  <div className="absolute inset-0 rounded-full blur-md bg-amber-400/25 dark:bg-amber-400/15 scale-110 pointer-events-none group-hover:scale-125 transition-transform" />
                  <PremiumMedal
                    tier={item.tier}
                    motif={item.motif}
                    size={56}
                    locked={false}
                  />
                </div>

                {/* Title & Description */}
                <div className="space-y-0.5 w-full">
                  <h4 className="font-serif italic font-bold text-sm text-[#090D16] dark:text-[#F8FAFC] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light line-clamp-2 leading-tight">
                    {item.description}
                  </p>
                </div>

                {/* Earned pill badge */}
                <div className="pt-0.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Earned</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. SECTION 2 — UPCOMING ACHIEVEMENTS */}
      <section aria-label="Upcoming Achievements" className="space-y-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-serif text-[#090D16] dark:text-[#F8FAFC] flex items-center gap-2">
            <span>Next to Unlock</span>
            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {locked.length} remaining
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
            Keep learning to unlock these.
          </p>
        </div>

        {/* LOCKED CARDS WITH PROGRESS */}
        <div className="space-y-2.5">
          {locked.map((item) => (
            <div
              key={item.id}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-[#131926]/80 border border-black/[0.06] dark:border-white/[0.08] shadow-2xs hover:border-black/20 dark:hover:border-white/20 transition-all space-y-3"
            >
              <div className="flex items-start gap-3 sm:gap-3.5">
                {/* Locked Medal */}
                <div className="relative shrink-0 pt-0.5">
                  <PremiumMedal
                    tier={item.tier}
                    motif={item.motif}
                    size={48}
                    locked={true}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif italic font-bold text-sm text-slate-800 dark:text-slate-200 truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      Locked
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                    {item.requirement}
                  </p>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-1.5 pt-1 border-t border-black/[0.04] dark:border-white/[0.04]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                    Progress:{' '}
                    <strong className="text-slate-900 dark:text-slate-100 font-mono font-bold">
                      {item.current.toLocaleString()} / {item.target.toLocaleString()}{' '}
                      {item.target === 1 ? item.unit : item.unitPlural}
                    </strong>
                  </span>
                  <span className="text-[11px] font-mono text-violet-600 dark:text-violet-400 font-semibold">
                    {item.remaining.toLocaleString()}{' '}
                    {item.remaining === 1 ? item.unit : item.unitPlural} remaining
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
