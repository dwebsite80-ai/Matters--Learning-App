import React from 'react';
import { Sparkles, Flame, Brain, Database, Languages } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { ActiveTab } from '../../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSchemaModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSchemaModal }) => {
  const { user, isConfiguredWithSupabase } = useAuth();
  const { stats, streakStatus, currentStreak: ctxStreak, previousBrokenStreak } = useLearning();
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-black/5 w-full shadow-xs">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Logo & Editorial Title */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
          id="nav-logo"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-[#1A1A1A] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif italic font-bold text-[#1A1A1A] text-lg sm:text-xl tracking-tight">Matters</span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full bg-[#F5F5F0] text-[#1A1A1A] border border-black/5">
                Daily
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#888] font-semibold hidden md:block">
              {language === 'hi' ? 'दैनिक व्यावहारिक ज्ञान' : 'Practical Life Knowledge'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F5F5F0]/80 p-1 rounded-full border border-black/5 shrink-0">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-[11px] lg:text-xs font-bold transition-all ${
              activeTab === 'home'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            {t('nav.home')}
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-[11px] lg:text-xs font-bold transition-all ${
              activeTab === 'learn'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            {t('nav.curriculum')}
          </button>
          <button
            onClick={() => setActiveTab('revision')}
            className={`px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-[11px] lg:text-xs font-bold transition-all ${
              activeTab === 'revision'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            {t('nav.revision')}
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-[11px] lg:text-xs font-bold transition-all ${
              activeTab === 'progress'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            {t('nav.analytics')}
          </button>
        </nav>

        {/* User Stats, Language Selector & Badges */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Selector Pill */}
          <div 
            className="flex items-center bg-[#F5F5F0] rounded-full p-0.5 border border-black/5"
            id="nav-language-selector"
          >
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all ${
                language === 'en'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-black'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all ${
                language === 'hi'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-black'
              }`}
              title="हिन्दी"
            >
              हिन्दी
            </button>
          </div>

          {user && (
            <>
              {/* Streak Badge (visible on lg screens to avoid crowding tablets) */}
              <div 
                onClick={() => setActiveTab('progress')}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border cursor-pointer hover:scale-105 active:scale-95 transition-all ${
                  streakStatus === 'broken'
                    ? 'bg-[#FDF2F2] border-[#F8B4B4] text-[#9B1C1C]'
                    : streakStatus === 'continue_today'
                    ? 'bg-[#FEF9E7] border-[#F9E79F] text-[#7D6608]'
                    : streakStatus === 'active'
                    ? 'bg-[#FEF2E0] border-[#F5D7A1] text-[#8C5E1A]'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                }`}
                title={streakStatus === 'broken' ? 'Streak broken. Start a new streak today!' : 'Daily learning streak'}
              >
                <span className="text-sm">{streakStatus === 'broken' ? '💔' : '🔥'}</span>
                <span className="text-xs font-bold">
                  {streakStatus === 'broken'
                    ? (language === 'hi' ? '0 दिन (टूटी)' : '0d (Broken)')
                    : `${currentStreak}${language === 'hi' ? ' दिन' : 'd Streak'}`}
                </span>
              </div>

              {/* XP Badge */}
              <div 
                onClick={() => setActiveTab('progress')}
                className="flex items-center gap-1 sm:gap-1.5 bg-[#E0F2FE] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#A1D7F5] cursor-pointer hover:scale-105 active:scale-95 transition-all text-xs"
                title="Total Knowledge XP"
              >
                <span className="text-xs sm:text-sm">🧠</span>
                <span className="font-bold text-[#1A5E8C] text-[11px] sm:text-xs">{totalXp} XP</span>
              </div>

              {/* Supabase / DB Status Pill */}
              {onOpenSchemaModal && (
                <button
                  onClick={onOpenSchemaModal}
                  className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                    isConfiguredWithSupabase
                      ? 'bg-[#E6F4EA] text-emerald-900 border-emerald-300'
                      : 'bg-[#F5F5F0] text-gray-700 border-black/5 hover:border-black/20'
                  }`}
                  title="View Supabase Database Schema"
                >
                  <Database className="w-3 h-3 text-gray-600" />
                  <span>{isConfiguredWithSupabase ? 'Supabase Live' : 'Schema'}</span>
                </button>
              )}

              {/* Profile Avatar Button (hidden on mobile where bottom navigation has Profile tab) */}
              <button
                onClick={() => setActiveTab('profile')}
                className={`hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full items-center justify-center font-bold text-xs border-2 transition-all overflow-hidden shrink-0 ${
                  activeTab === 'profile'
                    ? 'border-[#1A1A1A] ring-2 ring-black/10 bg-[#1A1A1A] text-white shadow-sm'
                    : 'border-white bg-[#E5E7EB] text-[#1A1A1A] shadow-sm hover:scale-105'
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
