import React from 'react';
import { Sparkles, Flame, Brain } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { ActiveTab } from '../../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSchemaModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const { stats, streakStatus, currentStreak: ctxStreak } = useLearning();
  const { language, setLanguage, t } = useLanguage();

  const currentStreak = ctxStreak ?? stats?.current_streak ?? 0;
  const totalXp = stats?.total_xp || 0;

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAFAF8]/85 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.02)] w-full transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* Brand Logo & Editorial Title */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          id="nav-logo"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#090D16] flex items-center justify-center text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.22)]">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif italic font-bold text-[#090D16] text-xl sm:text-2xl tracking-tight leading-none">
                Matters
              </span>
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#090D16]/[0.05] text-[#090D16] border border-[#090D16]/[0.06]">
                Daily
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-wider text-black/45 font-medium hidden md:block mt-0.5">
              {language === 'hi' ? 'दैनिक व्यावहारिक ज्ञान' : 'Practical Life Knowledge'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-black/[0.03] p-1 rounded-full border border-black/[0.05] shrink-0 shadow-2xs">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#090D16] text-white shadow-xs'
                : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
            }`}
          >
            {t('nav.home')}
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'learn'
                ? 'bg-[#090D16] text-white shadow-xs'
                : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
            }`}
          >
            {t('nav.curriculum')}
          </button>
          <button
            onClick={() => setActiveTab('revision')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'revision'
                ? 'bg-[#090D16] text-white shadow-xs'
                : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
            }`}
          >
            {t('nav.revision')}
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'progress'
                ? 'bg-[#090D16] text-white shadow-xs'
                : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
            }`}
          >
            {t('nav.analytics')}
          </button>
        </nav>

        {/* User Stats, Language Selector & Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Language Selector Pill */}
          <div
            className="flex items-center bg-black/[0.03] rounded-full p-0.5 border border-black/[0.05] shadow-2xs"
            id="nav-language-selector"
          >
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                language === 'en'
                  ? 'bg-[#090D16] text-white shadow-xs'
                  : 'text-black/60 hover:text-black'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#090D16] text-white shadow-xs'
                  : 'text-black/60 hover:text-black'
              }`}
              title="हिन्दी"
            >
              हिन्दी
            </button>
          </div>

          {user && (
            <>
              {/* Streak Badge */}
              <div
                onClick={() => setActiveTab('progress')}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer hover:scale-[1.03] active:scale-95 shadow-2xs ${
                  streakStatus === 'broken'
                    ? 'bg-rose-50/90 border-rose-200/90 text-rose-800'
                    : streakStatus === 'continue_today'
                    ? 'bg-amber-50/90 border-amber-200/90 text-amber-800'
                    : streakStatus === 'active'
                    ? 'bg-emerald-50/90 border-emerald-200/90 text-emerald-800'
                    : 'bg-black/[0.02] border-black/[0.06] text-black/60'
                }`}
                title={streakStatus === 'broken' ? 'Streak broken. Complete a lesson today!' : 'Daily learning streak'}
              >
                <Flame className={`w-3.5 h-3.5 ${streakStatus === 'broken' ? 'text-rose-500' : 'text-amber-500'}`} />
                <span className="text-xs font-bold font-mono">
                  {streakStatus === 'broken'
                    ? (language === 'hi' ? '0 दिन' : '0d')
                    : `${currentStreak}${language === 'hi' ? ' दिन' : 'd'}`}
                </span>
              </div>

              {/* XP Badge */}
              <div
                onClick={() => setActiveTab('progress')}
                className="flex items-center gap-1.5 bg-violet-50/90 border border-violet-200/80 px-3 py-1.5 rounded-full cursor-pointer hover:scale-[1.03] active:scale-95 transition-all duration-200 text-xs shadow-2xs group"
                title="Knowledge XP"
              >
                <Brain className="w-3.5 h-3.5 text-violet-600 group-hover:rotate-12 transition-transform" />
                <span className="font-bold text-violet-900 text-xs font-mono">{totalXp} XP</span>
              </div>

              {/* Profile Avatar Button */}
              <button
                onClick={() => setActiveTab('profile')}
                className={`hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full items-center justify-center font-bold text-xs border transition-all duration-200 overflow-hidden shrink-0 cursor-pointer ${
                  activeTab === 'profile'
                    ? 'border-[#090D16] ring-2 ring-black/10 bg-[#090D16] text-white shadow-sm'
                    : 'border-black/[0.08] bg-white text-[#090D16] shadow-2xs hover:border-black/25 hover:scale-105'
                }`}
                id="profile-nav-btn"
                title={t('nav.profile')}
              >
                {initials}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
