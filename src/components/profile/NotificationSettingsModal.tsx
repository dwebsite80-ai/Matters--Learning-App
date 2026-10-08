import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, Bell, Clock, Flame, Sparkles } from 'lucide-react';
import {
  NotificationSettings,
  DEFAULT_NOTIFICATION_SETTINGS,
} from '../../data/preferencesStorage';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: NotificationSettings;
  onSaveSettings: (settings: NotificationSettings) => void;
}

const TIME_SLOTS = [
  { id: 'Morning (8:00 AM)', label: 'Morning', time: '8:00 AM' },
  { id: 'Afternoon (1:00 PM)', label: 'Afternoon', time: '1:00 PM' },
  { id: 'Evening (8:00 PM)', label: 'Evening', time: '8:00 PM' },
  { id: 'Night (10:00 PM)', label: 'Night', time: '10:00 PM' },
];

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  currentSettings,
  onSaveSettings,
}) => {
  const [settings, setSettings] = useState<NotificationSettings>(
    currentSettings || DEFAULT_NOTIFICATION_SETTINGS
  );
  const [justSaved, setJustSaved] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setSettings(currentSettings || DEFAULT_NOTIFICATION_SETTINGS);
    }
  }, [isOpen, currentSettings]);

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
    onSaveSettings(settings);
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
      aria-labelledby="notification-modal-title"
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
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2
                  id="notification-modal-title"
                  className="text-lg sm:text-xl font-bold font-serif text-[#090D16] dark:text-[#F8FAFC]"
                >
                  Notifications
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Lesson reminders and updates
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

        {/* Settings Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-4 space-y-3.5">
          {/* 1. Daily Study Reminders */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#151C2C] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                    Daily Reminder
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                    Gentle nudge to maintain your learning rhythm
                  </p>
                </div>
              </div>

              {/* iOS Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={settings.dailyReminders}
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    dailyReminders: !prev.dailyReminders,
                  }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.dailyReminders
                    ? 'bg-violet-600'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    settings.dailyReminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Sub-selector for Reminder Time */}
            {settings.dailyReminders && (
              <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] space-y-1.5 animate-fadeIn">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                  Preferred Reminder Time
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = settings.reminderTime === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() =>
                          setSettings((prev) => ({
                            ...prev,
                            reminderTime: slot.id,
                          }))
                        }
                        className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-violet-50 dark:bg-violet-950/50 border-violet-500 text-violet-900 dark:text-violet-200 font-bold shadow-2xs'
                            : 'bg-slate-50/70 dark:bg-[#1A2234] border-black/[0.05] dark:border-white/[0.06] text-slate-600 dark:text-slate-300 hover:border-black/20 font-medium'
                        }`}
                      >
                        <div>
                          <div>{slot.label}</div>
                          <div className="text-[10px] opacity-75 font-mono">{slot.time}</div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 2. Streak Freeze / Loss Alerts */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#151C2C] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                  Streak Protection Alerts
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                  Warn me before midnight if my daily streak is at risk
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={settings.streakAlerts}
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  streakAlerts: !prev.streakAlerts,
                }))
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                settings.streakAlerts
                  ? 'bg-violet-600'
                  : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  settings.streakAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 3. New Lessons & Announcements */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#151C2C] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                  New Content & Updates
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                  Hear about newly added lessons and practical guides
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={settings.announcements}
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  announcements: !prev.announcements,
                }))
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                settings.announcements
                  ? 'bg-violet-600'
                  : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  settings.announcements ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
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
              'Save Preferences'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
