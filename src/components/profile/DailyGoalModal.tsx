import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, Target, Sparkles } from 'lucide-react';
import { DAILY_GOAL_OPTIONS, DailyGoalOption } from '../../data/preferencesStorage';

interface DailyGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoal: number;
  onSaveGoal: (goal: number) => void;
}

export const DailyGoalModal: React.FC<DailyGoalModalProps> = ({
  isOpen,
  onClose,
  currentGoal,
  onSaveGoal,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<number>(currentGoal || 2);
  const [justSaved, setJustSaved] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setSelectedGoal(currentGoal || 2);
    }
  }, [isOpen, currentGoal]);

  // Lock body scroll and restore on dismiss
  useEffect(() => {
    if (!isOpen) return;

    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;
    scrollYRef.current = scrollY;

    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      document.body.style.overflow = prevOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;
  if (typeof document === 'undefined') return null;

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 180);
  };

  const handleApply = () => {
    onSaveGoal(selectedGoal);
    setJustSaved(true);
    setTimeout(() => {
      setJustSaved(false);
      handleDismiss();
    }, 250);
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-goal-modal-title"
      className={`fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-auto transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* 1. Fullscreen Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn cursor-pointer"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* 2. Bottom Sheet on Mobile / Centered Card on Desktop */}
      <div
        className={`relative z-10 w-full sm:max-w-md bg-[#FAFAF8] dark:bg-[#101522] rounded-t-[32px] sm:rounded-[32px] border border-black/10 dark:border-white/10 shadow-[0_-16px_48px_rgba(0,0,0,0.32)] dark:shadow-[0_-16px_48px_rgba(0,0,0,0.7)] flex flex-col max-h-[85vh] overflow-hidden transition-transform duration-200 ${
          isClosing
            ? 'translate-y-full sm:scale-95'
            : 'animate-sheetSlideUp sm:animate-slideUp'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Indicator */}
        <div className="w-12 h-1.5 rounded-full bg-black/15 dark:bg-white/20 mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Sheet Header */}
        <div className="shrink-0 px-5 sm:px-6 pt-3.5 sm:pt-5 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2
                  id="daily-goal-modal-title"
                  className="text-lg sm:text-xl font-bold font-serif text-[#090D16] dark:text-[#F8FAFC]"
                >
                  Daily Goal
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  How many lessons would you like to complete each day?
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close dialog"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Options List */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-4 space-y-2.5">
          {DAILY_GOAL_OPTIONS.map((opt: DailyGoalOption) => {
            const isSelected = selectedGoal === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelectedGoal(opt.value)}
                className={`w-full p-3.5 sm:p-4 rounded-2xl text-left border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] ${
                  isSelected
                    ? 'bg-violet-50/70 dark:bg-violet-950/40 border-violet-500/80 dark:border-violet-500 ring-2 ring-violet-500/20 shadow-xs'
                    : 'bg-white dark:bg-[#151C2C] border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Radio Circle Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-violet-600 dark:border-violet-400 bg-violet-600 dark:bg-violet-500'
                        : 'border-slate-300 dark:border-slate-600 bg-transparent'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-semibold ${
                          isSelected
                            ? 'text-violet-950 dark:text-violet-100'
                            : 'text-[#090D16] dark:text-[#F8FAFC]'
                        }`}
                      >
                        {opt.label}
                      </span>
                      {opt.badge && (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-violet-200/80 dark:bg-violet-900/60 text-violet-800 dark:text-violet-200'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-light">
                      {opt.description}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-violet-600/10 dark:bg-violet-400/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                )}
              </button>
            );
          })}

          <div className="pt-2 px-1 text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Consistency matters more than intensity. Choose a pace you can sustain every day.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 sm:px-6 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] bg-white/90 dark:bg-[#0E131F]/90 backdrop-blur-md border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={handleDismiss}
            className="px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className={`px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
              justSaved
                ? 'bg-emerald-600'
                : 'bg-violet-600 hover:bg-violet-700 active:scale-98'
            }`}
          >
            {justSaved ? (
              <>
                <Check className="w-4 h-4" />
                Saved!
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
