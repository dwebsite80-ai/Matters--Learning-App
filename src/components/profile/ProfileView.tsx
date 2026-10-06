import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Pencil,
  Globe,
  Target,
  Bell,
  Moon,
  ChevronRight,
  Crown,
  LogOut,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  DailyMinutes,
  LearningLevel,
  PreferredTime,
  SubjectId,
  UserPreferences,
} from '../../types';
import { PROFILE_COVER_IMAGE, USER_AVATAR_IMAGE } from '../../data/courseImages';
import { MattersImage } from '../common/MattersImage';

interface ProfileViewProps {
  onOpenSchemaModal?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = () => {
  const { user, preferences, updatePreferences, logOut } = useAuth();
  const { stats, currentStreak: ctxStreak } = useLearning();
  const { language, setLanguage } = useLanguage();

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
  }, [preferences]);

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

  const avatarUrl =
    (user as any)?.avatar_url ||
    USER_AVATAR_IMAGE;

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
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-[#090D16]">
              <MattersImage
                src={avatarUrl}
                fallbackSrc={USER_AVATAR_IMAGE}
                alt={user?.name || 'Anurag'}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Edit pencil icon */}
            <div className="absolute bottom-0 right-1 w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-xs border-2 border-white">
              <Pencil className="w-3 h-3" />
            </div>
          </div>

          {/* User Name & Info */}
          <div className="mt-2 space-y-0.5">
            <h1 className="text-xl sm:text-2xl font-serif italic text-[#090D16] font-bold">
              {user?.name || 'Anurag'}
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              @{user?.username || 'anurag'} · <span className="font-bold text-violet-700">Level 2</span>
            </p>
            <p className="text-[11px] text-slate-400 font-mono flex items-center justify-center gap-1 pt-0.5">
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
          <div className="p-3 rounded-2xl bg-white border border-black/[0.06] shadow-sm text-center space-y-0.5">
            <span className="text-xl block">⭐</span>
            <p className="text-lg font-serif italic font-bold text-[#090D16]">
              {totalXp}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-tight text-slate-400 block font-semibold truncate">
              Total XP
            </span>
          </div>

          {/* 🔥 7 Streak */}
          <div className="p-3 rounded-2xl bg-white border border-black/[0.06] shadow-sm text-center space-y-0.5">
            <span className="text-xl block">🔥</span>
            <p className="text-lg font-serif italic font-bold text-[#090D16]">
              {currentStreak}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-tight text-slate-400 block font-semibold truncate">
              Streak
            </span>
          </div>

          {/* 📖 12 Lessons */}
          <div className="p-3 rounded-2xl bg-white border border-black/[0.06] shadow-sm text-center space-y-0.5">
            <span className="text-xl block">📖</span>
            <p className="text-lg font-serif italic font-bold text-[#090D16]">
              {lessonsCompleted}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-tight text-slate-400 block font-semibold truncate">
              Lessons
            </span>
          </div>
        </div>
      </section>

      {/* 3. TABS: PREFERENCES / ACHIEVEMENTS / ACCOUNT */}
      <div className="flex bg-slate-100 p-1 rounded-2xl border border-black/[0.04]">
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
                : 'text-slate-500 hover:text-black'
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
          <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#090D16]">
                Learning Language
              </span>
            </div>

            {/* Segmented language toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-black/[0.06]">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-white text-violet-700 shadow-2xs'
                    : 'text-slate-500 hover:text-black'
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
                    : 'text-slate-500 hover:text-black'
                }`}
              >
                {language === 'hi' && <CheckCircle2 className="w-3 h-3 text-violet-700" />}
                <span>हिंदी</span>
              </button>
            </div>
          </div>

          {/* Daily Goal Row */}
          <div
            onClick={() => {
              const next = dailyMinutes === 10 ? 20 : 10;
              setDailyMinutes(next as DailyMinutes);
              handleSavePreferences();
            }}
            className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex items-center justify-between cursor-pointer hover:border-black/20 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#090D16]">Daily Goal</p>
                <p className="text-[11px] text-slate-400 font-light">{dailyMinutes === 10 ? '2 lessons per day' : '3 lessons per day'}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Notifications Row */}
          <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex items-center justify-between cursor-pointer hover:border-black/20 active:scale-[0.99] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#090D16]">Notifications</p>
                <p className="text-[11px] text-slate-400 font-light">Lesson reminders and updates</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Appearance Row */}
          <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex items-center justify-between cursor-pointer hover:border-black/20 active:scale-[0.99] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#090D16]">Appearance</p>
                <p className="text-[11px] text-slate-400 font-light">Light Mode</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
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
        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm space-y-3">
          <h3 className="font-serif italic font-bold text-sm text-[#090D16]">
            Milestones Unlocked
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: '🌱', title: 'First Step', desc: '1st lesson completed', unlocked: true },
              { icon: '🔥', title: 'Consistency', desc: '7-day streak', unlocked: true },
              { icon: '⭐', title: 'Century Club', desc: '1,000+ XP earned', unlocked: true },
              { icon: '🏆', title: 'Scholar', desc: '5 domains studied', unlocked: true },
            ].map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center space-y-0.5">
                <span className="text-xl block">{m.icon}</span>
                <p className="font-serif italic font-bold text-xs text-amber-950">{m.title}</p>
                <span className="text-[9px] text-amber-800 font-mono block">{m.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACCOUNT TAB */}
      {activeTab === 'account' && (
        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm space-y-3">
          <h3 className="font-serif italic font-bold text-sm text-[#090D16]">
            Account Info
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
              <span className="text-slate-400">Name</span>
              <strong className="text-[#090D16]">{user?.name || 'Anurag'}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
              <span className="text-slate-400">Username</span>
              <strong className="text-[#090D16] font-mono">@{user?.username || 'anurag'}</strong>
            </div>
          </div>

          <button
            onClick={logOut}
            id="logout-btn"
            className="w-full py-3 px-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs font-bold transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 mt-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};
