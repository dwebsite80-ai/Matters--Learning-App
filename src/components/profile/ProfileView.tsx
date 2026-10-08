import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Pencil,
  Globe,
  Target,
  Bell,
  Moon,
  Sun,
  Laptop,
  ChevronRight,
  Crown,
  LogOut,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import {
  DailyMinutes,
  LearningLevel,
  PreferredTime,
  SubjectId,
  UserPreferences,
} from '../../types';
import { PROFILE_COVER_IMAGE, USER_AVATAR_IMAGE } from '../../data/courseImages';
import { MattersImage } from '../common/MattersImage';
import { AvatarPickerModal } from './AvatarPickerModal';
import { DailyGoalModal } from './DailyGoalModal';
import { NotificationSettingsModal } from './NotificationSettingsModal';
import { AchievementsView } from './AchievementsView';
import {
  getStoredDailyGoal,
  setStoredDailyGoal,
  getStoredNotificationSettings,
  setStoredNotificationSettings,
  NotificationSettings,
} from '../../data/preferencesStorage';
import {
  getStoredUserAvatar,
  setStoredUserAvatar,
  INDIAN_MALE_AVATARS,
} from '../../data/avatars';

interface ProfileViewProps {
  onOpenSchemaModal?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = () => {
  const { user, preferences, updatePreferences, logOut } = useAuth();
  const { stats, currentStreak: ctxStreak } = useLearning();
  const { language, setLanguage } = useLanguage();
  const { theme, resolvedTheme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<'preferences' | 'achievements' | 'account'>('preferences');

  const [dailyMinutes, setDailyMinutes] = useState<DailyMinutes>(
    preferences?.daily_minutes || 10
  );
  const [level, setLevel] = useState<LearningLevel>(
    preferences?.level || 'Beginner'
  );
  const [preferredTime, setPreferredTime] = useState<PreferredTime>(
    preferences?.preferred_time || 'Morning'
  );
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>(
    preferences?.selected_subjects || ['law-rights', 'money-finance', 'economics']
  );
  const [saving, setSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);
  const [isDailyGoalModalOpen, setIsDailyGoalModalOpen] = useState<boolean>(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState<boolean>(false);

  const [dailyGoal, setDailyGoal] = useState<number>(() => {
    return getStoredDailyGoal(user?.id);
  });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => {
    return getStoredNotificationSettings(user?.id);
  });

  const [currentAvatar, setCurrentAvatar] = useState<string>(() => {
    return (
      getStoredUserAvatar() ||
      (user as any)?.avatar_url ||
      INDIAN_MALE_AVATARS[0].image
    );
  });

  const handleAvatarChange = (newAvatarUrl: string) => {
    setCurrentAvatar(newAvatarUrl);
    setStoredUserAvatar(newAvatarUrl);
    try {
      window.dispatchEvent(
        new CustomEvent('matters:avatar-changed', {
          detail: { avatarUrl: newAvatarUrl },
        })
      );
    } catch {
      // ignore
    }
  };

  const handleSaveDailyGoal = async (newGoal: number) => {
    setDailyGoal(newGoal);
    setStoredDailyGoal(newGoal, user?.id);
    const newMinutes: DailyMinutes = (newGoal >= 3 ? 20 : 10) as DailyMinutes;
    setDailyMinutes(newMinutes);
    try {
      await updatePreferences({
        daily_minutes: newMinutes,
      });
    } catch (err) {
      console.warn('Error saving daily goal preference', err);
    }
  };

  const handleSaveNotificationSettings = async (newSettings: NotificationSettings) => {
    setNotificationSettings(newSettings);
    setStoredNotificationSettings(newSettings, user?.id);
    let mappedTime: PreferredTime = 'Morning';
    if (newSettings.reminderTime.startsWith('Morning')) mappedTime = 'Morning';
    else if (newSettings.reminderTime.startsWith('Afternoon')) mappedTime = 'Afternoon';
    else if (newSettings.reminderTime.startsWith('Evening')) mappedTime = 'Evening';
    else mappedTime = 'Custom';

    setPreferredTime(mappedTime);
    try {
      await updatePreferences({
        preferred_time: mappedTime,
      });
    } catch (err) {
      console.warn('Error saving notification preferences', err);
    }
  };

  const currentStreak = ctxStreak ?? stats?.current_streak ?? 7;
  const totalXp = stats?.total_xp || 1250;
  const lessonsCompleted = stats?.lessons_completed_count || 12;

  // Sync state if preferences change externally
  useEffect(() => {
    if (preferences) {
      setDailyMinutes(preferences.daily_minutes);
      setLevel(preferences.level);
      setPreferredTime(preferences.preferred_time);
      setSelectedSubjects(preferences.selected_subjects || []);
    }
    if (user?.id) {
      setDailyGoal(getStoredDailyGoal(user.id));
      setNotificationSettings(getStoredNotificationSettings(user.id));
    }
  }, [preferences, user?.id]);

  const handleSavePreferences = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      const updated: Partial<UserPreferences> = {
        daily_minutes: dailyMinutes,
        level: level,
        preferred_time: preferredTime,
        selected_subjects: selectedSubjects,
      };
      await updatePreferences(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update preferences:', err);
    } finally {
      setSaving(false);
    }
  };

  const avatarUrl = currentAvatar || (user as any)?.avatar_url || USER_AVATAR_IMAGE;

  return (
    <div className="max-w-md mx-auto px-4 sm:px-5 py-2 space-y-4 animate-fadeIn pb-28">
      {/* 1. PROFILE COVER (MATCHING REFERENCE MOCKUP SCREEN 5) */}
      <section aria-label="Profile Header" className="relative">
        <div className="relative rounded-3xl h-36 sm:h-44 w-full overflow-hidden shadow-sm border border-black/10">
          <MattersImage
            src={PROFILE_COVER_IMAGE}
            fallbackSrc={PROFILE_COVER_IMAGE}
            alt="Profile Cover"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Circular Avatar Overlapping Cover with Edit Pencil Badge */}
        <div className="relative -mt-14 flex flex-col items-center text-center">
          <div className="relative group">
            <button
              type="button"
              onClick={() => setIsAvatarModalOpen(true)}
              className="relative w-24 h-24 rounded-full border-4 border-white dark:border-[#131926] overflow-hidden shadow-md bg-[#090D16] focus:outline-none focus:ring-4 focus:ring-violet-500/40 cursor-pointer transition-transform active:scale-95 block"
              title="Change profile avatar"
              aria-label="Change profile avatar"
            >
              <img
                src={avatarUrl}
                alt={user?.name || 'User Profile'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
            {/* Edit pencil icon */}
            <button
              type="button"
              onClick={() => setIsAvatarModalOpen(true)}
              className="absolute bottom-0 right-1 w-7 h-7 rounded-full bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-[#131926] transition-transform active:scale-90 cursor-pointer"
              title="Change profile avatar"
              aria-label="Change profile avatar"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* User Name & Info */}
          <div className="mt-2 space-y-0.5">
            <h1 className="text-xl sm:text-2xl font-serif italic text-[#090D16] dark:text-[#F8FAFC] font-bold">
              {user?.name || 'Anurag'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              @{user?.username || 'anurag'} · <span className="font-bold text-violet-700 dark:text-violet-400">Level 2</span>
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 font-mono flex items-center justify-center gap-1 pt-0.5">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Member since Aug 2026</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. THREE STAT CARDS (MATCHING REFERENCE MOCKUP SCREEN 5) */}
      <section aria-label="Profile Stats">
        <div className="grid grid-cols-3 gap-2.5">
          {/* ⭐ 1,250 Total XP */}
          <div className="p-3 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm text-center space-y-0.5">
            <span className="text-xl block">⭐</span>
            <p className="text-lg font-serif italic font-bold text-[#090D16] dark:text-[#F8FAFC]">
              {totalXp}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-tight text-slate-400 dark:text-slate-400 block font-semibold truncate">
              Total XP
            </span>
          </div>

          {/* 🔥 7 Streak */}
          <div className="p-3 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm text-center space-y-0.5">
            <span className="text-xl block">🔥</span>
            <p className="text-lg font-serif italic font-bold text-[#090D16] dark:text-[#F8FAFC]">
              {currentStreak}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-tight text-slate-400 dark:text-slate-400 block font-semibold truncate">
              Streak
            </span>
          </div>

          {/* 📖 12 Lessons */}
          <div className="p-3 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm text-center space-y-0.5">
            <span className="text-xl block">📖</span>
            <p className="text-lg font-serif italic font-bold text-[#090D16] dark:text-[#F8FAFC]">
              {lessonsCompleted}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-tight text-slate-400 dark:text-slate-400 block font-semibold truncate">
              Lessons
            </span>
          </div>
        </div>
      </section>

      {/* 3. TABS: PREFERENCES / ACHIEVEMENTS / ACCOUNT */}
      <div className="flex bg-slate-100 dark:bg-[#161D2C] p-1 rounded-2xl border border-black/[0.04] dark:border-white/[0.06]">
        {[
          { id: 'preferences' as const, label: 'Preferences' },
          { id: 'achievements' as const, label: 'Achievements' },
          { id: 'account' as const, label: 'Account' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
              activeTab === tab.id
                ? 'bg-violet-700 text-white shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. PREFERENCES TAB (MATCHING REFERENCE MOCKUP SCREEN 5) */}
      {activeTab === 'preferences' && (
        <div className="space-y-2.5">
          {/* Learning Language Row */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#090D16] dark:text-[#F8FAFC]">
                Learning Language
              </span>
            </div>

            {/* Segmented language toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-[#1A2234] p-0.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-white text-violet-700 shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {language === 'en' && <CheckCircle2 className="w-3 h-3 text-violet-700" />}
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  language === 'hi'
                    ? 'bg-white text-violet-700 shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {language === 'hi' && <CheckCircle2 className="w-3 h-3 text-violet-700" />}
                <span>हिंदी</span>
              </button>
            </div>
          </div>

          {/* Daily Goal Row */}
          <div
            onClick={() => setIsDailyGoalModalOpen(true)}
            id="profile-daily-goal-btn"
            className="p-3.5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex items-center justify-between cursor-pointer hover:border-black/20 dark:hover:border-white/20 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#090D16] dark:text-[#F8FAFC]">Daily Goal</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 font-light">
                  {dailyGoal === 1 ? '1 lesson per day' : `${dailyGoal} lessons per day`}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Notifications Row */}
          <div
            onClick={() => setIsNotificationModalOpen(true)}
            id="profile-notifications-btn"
            className="p-3.5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex items-center justify-between cursor-pointer hover:border-black/20 dark:hover:border-white/20 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#090D16] dark:text-[#F8FAFC]">Notifications</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 font-light">
                  {notificationSettings.dailyReminders
                    ? 'Lesson reminders and updates'
                    : 'Reminders paused'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Appearance Row with 3-Way Toggle: Light / Dark / System */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-violet-400" />
                ) : theme === 'light' ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Laptop className="w-4 h-4 text-indigo-400" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#090D16] dark:text-slate-100">
                  {language === 'hi' ? 'दिखावट (थीम)' : 'Appearance'}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 font-light">
                  {theme === 'light'
                    ? (language === 'hi' ? 'लाइट मोड' : 'Light Mode')
                    : theme === 'dark'
                    ? (language === 'hi' ? 'डार्क मोड' : 'Dark Mode')
                    : (language === 'hi'
                        ? `सिस्टम (${resolvedTheme === 'dark' ? 'डार्क' : 'लाइट'})`
                        : `System (${resolvedTheme === 'dark' ? 'Dark' : 'Light'})`)}
                </p>
              </div>
            </div>

            {/* Segmented Appearance Toggle: Light | Dark | System */}
            <div className="flex items-center bg-slate-100 dark:bg-[#1A2234] p-0.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] self-stretch sm:self-auto justify-between sm:justify-start">
              <button
                type="button"
                id="theme-light-btn"
                onClick={() => setTheme('light')}
                className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  theme === 'light'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white'
                }`}
                title={language === 'hi' ? 'लाइट' : 'Light'}
              >
                <Sun className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-amber-500' : ''}`} />
                <span>{language === 'hi' ? 'लाइट' : 'Light'}</span>
              </button>
              <button
                type="button"
                id="theme-dark-btn"
                onClick={() => setTheme('dark')}
                className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  theme === 'dark'
                    ? 'bg-violet-600 text-white shadow-2xs'
                    : 'text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white'
                }`}
                title={language === 'hi' ? 'डार्क' : 'Dark'}
              >
                <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-violet-200' : ''}`} />
                <span>{language === 'hi' ? 'डार्क' : 'Dark'}</span>
              </button>
              <button
                type="button"
                id="theme-system-btn"
                onClick={() => setTheme('system')}
                className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  theme === 'system'
                    ? 'bg-white dark:bg-[#253046] text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white'
                }`}
                title={language === 'hi' ? 'सिस्टम' : 'System'}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'सिस्टम' : 'System'}</span>
              </button>
            </div>
          </div>

          {/* 5. LEVEL 2 ACHIEVEMENT CARD AT BOTTOM (MATCHING REFERENCE MOCKUP SCREEN 5) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#090D16] via-[#1E1138] to-[#120B24] text-white shadow-md border border-white/[0.08] space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#FBBF24] text-slate-950 flex items-center justify-center shadow-xs">
                <Crown className="w-4 h-4 fill-slate-950" />
              </div>
              <div>
                <h4 className="font-serif italic font-bold text-sm text-white">Level 2</h4>
                <p className="text-[10px] text-slate-300 font-light">
                  Keep learning to unlock new achievements!
                </p>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-[#FBBF24] rounded-full"
                  style={{ width: '53%' }}
                />
              </div>
              <p className="text-[10px] font-mono text-slate-300 text-right">
                265 / 500 XP
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ACHIEVEMENTS TAB */}
      {activeTab === 'achievements' && (
        <AchievementsView />
      )}

      {/* ACCOUNT TAB */}
      {activeTab === 'account' && (
        <div className="p-4 rounded-2xl bg-white dark:bg-[#131926] border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-3">
          <h3 className="font-serif italic font-bold text-sm text-[#090D16] dark:text-[#F8FAFC]">
            Account Info
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A2234] flex items-center justify-between">
              <span className="text-slate-400 dark:text-slate-400">Name</span>
              <strong className="text-[#090D16] dark:text-[#F8FAFC]">{user?.name || 'Anurag'}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A2234] flex items-center justify-between">
              <span className="text-slate-400 dark:text-slate-400">Username</span>
              <strong className="text-[#090D16] dark:text-[#F8FAFC] font-mono">@{user?.username || 'anurag'}</strong>
            </div>
          </div>

          <button
            onClick={logOut}
            id="logout-btn"
            className="w-full py-3 px-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 text-xs font-bold transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 mt-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      )}

      {/* Avatar Selection Modal */}
      <AvatarPickerModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatar={avatarUrl}
        onSelectAvatar={handleAvatarChange}
      />

      {/* Daily Goal Settings Modal */}
      <DailyGoalModal
        isOpen={isDailyGoalModalOpen}
        onClose={() => setIsDailyGoalModalOpen(false)}
        currentGoal={dailyGoal}
        onSaveGoal={handleSaveDailyGoal}
      />

      {/* Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        currentSettings={notificationSettings}
        onSaveSettings={handleSaveNotificationSettings}
      />
    </div>
  );
};
