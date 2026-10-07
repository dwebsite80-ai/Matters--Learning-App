import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  Brain,
  Search,
  Bell,
  X,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { useLanguage } from '../../context/LanguageContext';
import { ActiveTab, SubjectId } from '../../types';
import { ALL_LESSONS } from '../../data/initialContent';
import { USER_AVATAR_IMAGE } from '../../data/courseImages';
import { MattersImage } from '../common/MattersImage';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSchemaModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const { stats, streakStatus, currentStreak: ctxStreak, subjects } = useLearning();
  const { language, setLanguage, t } = useLanguage();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

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

  // Filter lessons & subjects for quick mobile search
  const filteredCourses = searchQuery.trim()
    ? subjects.filter((s) => {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          (s.name_hi && s.name_hi.toLowerCase().includes(q)) ||
          s.description.toLowerCase().includes(q)
        );
      })
    : [];

  const filteredLessons = searchQuery.trim()
    ? ALL_LESSONS.filter((l) => {
        const q = searchQuery.toLowerCase();
        return (
          l.title.toLowerCase().includes(q) ||
          (l.title_hi && l.title_hi.toLowerCase().includes(q)) ||
          (l.subtitle && l.subtitle.toLowerCase().includes(q))
        );
      }).slice(0, 6)
    : [];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] w-full transition-all">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2.5">
          {/* Left: Matters Logo & Brand Name */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0 active:scale-95 transition-transform"
            id="nav-logo"
            aria-label="Matters Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-[#090D16] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:scale-105">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif italic font-bold text-[#090D16] text-xl sm:text-2xl tracking-tight leading-none">
                Matters
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase font-mono font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200/60 hidden xs:inline-block">
                Daily
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/[0.03] p-1 rounded-full border border-black/[0.05] shrink-0">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#090D16] text-white shadow-xs'
                  : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
              }`}
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'learn'
                  ? 'bg-[#090D16] text-white shadow-xs'
                  : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
              }`}
            >
              {t('nav.curriculum')}
            </button>
            <button
              onClick={() => setActiveTab('revision')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'revision'
                  ? 'bg-[#090D16] text-white shadow-xs'
                  : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
              }`}
            >
              {t('nav.revision')}
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'progress'
                  ? 'bg-[#090D16] text-white shadow-xs'
                  : 'text-black/60 hover:text-black hover:bg-black/[0.03]'
              }`}
            >
              {t('nav.analytics')}
            </button>
          </nav>

          {/* Right Action Icons: Search, Notifications, Language, Stats */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
              title={language === 'hi' ? 'खोजें' : 'Search'}
              aria-label="Search courses and lessons"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notification Bell with indicator */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-100 active:scale-95 transition-all cursor-pointer relative"
                title={language === 'hi' ? 'सूचनाएं' : 'Notifications'}
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {!notificationsRead && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white animate-pulse" />
                )}
              </button>

              {/* Tap-outside backdrop */}
              {isNotificationsOpen && (
                <div
                  className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] sm:bg-transparent"
                  onClick={() => {
                    setNotificationsRead(true);
                    setIsNotificationsOpen(false);
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Notification Popover */}
              {isNotificationsOpen && (
                <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-[60px] sm:top-12 max-w-sm sm:w-80 mx-auto sm:mx-0 bg-white rounded-2xl border border-black/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.16)] p-4 z-50 animate-fadeIn max-h-[calc(100vh-5rem)] overflow-y-auto box-border">
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#090D16]">
                        {language === 'hi' ? 'सूचनाएं एवं सुझाव' : 'Daily Updates'}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                    </div>
                    <button
                      onClick={() => {
                        setNotificationsRead(true);
                        setIsNotificationsOpen(false);
                      }}
                      className="text-[11px] font-semibold text-slate-500 hover:text-black py-0.5 px-2 rounded-md hover:bg-black/[0.05] cursor-pointer flex items-center gap-1 transition-colors"
                      aria-label="Close notifications"
                    >
                      <span>{language === 'hi' ? 'बंद करें' : 'Close'}</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5 mt-3">
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs">
                      <p className="font-bold text-amber-900 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-600" />
                        {language === 'hi' ? 'दैनिक स्ट्रीक अलर्ट' : 'Streak Alert'}
                      </p>
                      <p className="text-[11px] text-amber-800/80 mt-1 font-light leading-relaxed">
                        {language === 'hi'
                          ? `आपकी स्ट्रीक: ${currentStreak} दिन। अपनी गति बनाए रखने के लिए आज का 10-मिनट का पाठ पूरा करें!`
                          : `Current streak: ${currentStreak}d. Complete today's 10-minute micro-lesson to keep your fire burning!`}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-violet-50/80 border border-violet-200/70 text-xs">
                      <p className="font-bold text-violet-900 flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-violet-600" />
                        {language === 'hi' ? 'दैनिक व्यावहारिक युक्ति' : 'Practical Wisdom Tip'}
                      </p>
                      <p className="text-[11px] text-violet-800/80 mt-1 font-light leading-relaxed">
                        {language === 'hi'
                          ? 'प्रतिदिन 15 मिनट सीखना साल के 90 घंटों के बराबर है। नियमितता ही ज्ञान की कुंजी है।'
                          : '15 minutes of intentional learning a day equals 90 hours a year. Consistency beats cramming.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector Pill */}
            <div
              className="flex items-center bg-black/[0.04] rounded-full p-0.5 border border-black/[0.06]"
              id="nav-language-selector"
            >
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all duration-200 cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#090D16] text-white shadow-2xs'
                    : 'text-black/60 hover:text-black'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all duration-200 cursor-pointer ${
                  language === 'hi'
                    ? 'bg-[#090D16] text-white shadow-2xs'
                    : 'text-black/60 hover:text-black'
                }`}
                title="हिन्दी"
              >
                हि
              </button>
            </div>

            {/* Profile Avatar Button (Real user avatar image) */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 overflow-hidden shrink-0 cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-violet-600 ring-2 ring-violet-400/40 shadow-xs'
                  : 'border-white hover:border-slate-300 shadow-2xs'
              }`}
              id="profile-nav-btn"
              title={t('nav.profile')}
              aria-label="Profile"
            >
              <MattersImage
                src={(user as any)?.avatar_url || USER_AVATAR_IMAGE}
                fallbackSrc={USER_AVATAR_IMAGE}
                alt={user?.name || 'Anurag'}
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Quick Search Modal / Drawer */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-start pt-14 sm:pt-20 px-4 animate-fadeIn">
          <div className="max-w-xl w-full mx-auto bg-white rounded-2xl sm:rounded-3xl border border-black/10 shadow-2xl overflow-hidden animate-slideDown">
            <div className="p-3 sm:p-4 border-b border-black/[0.06] flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'hi' ? 'पाठ या विषय खोजें (उदा. जीडीपी, एफआईआर, दर्शन)...' : 'Search courses or lessons (e.g. GDP, FIR, Plato)...'}
                className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-[#090D16] placeholder-slate-400"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 rounded-full text-slate-400 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-4 space-y-4">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  <p className="font-medium text-slate-600 mb-1">
                    {language === 'hi' ? 'तुरंत ज्ञान खोजें' : 'Search Knowledge Instantly'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {language === 'hi'
                      ? 'अर्थशास्त्र, कानून, दर्शनशास्त्र, वित्त या किसी भी पाठ का नाम लिखें।'
                      : 'Type any domain, concept, or practical question.'}
                  </p>
                </div>
              ) : filteredCourses.length === 0 && filteredLessons.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  {language === 'hi' ? 'कोई परिणाम नहीं मिला।' : 'No matching lessons or courses found.'}
                </div>
              ) : (
                <>
                  {filteredCourses.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
                        {language === 'hi' ? 'कोर्स / विषय' : 'Courses & Domains'}
                      </p>
                      {filteredCourses.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => {
                            setActiveTab('learn');
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-8 h-8 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center shrink-0 text-sm font-bold">
                              {c.name.charAt(0)}
                            </span>
                            <div className="truncate">
                              <p className="text-xs font-bold text-[#090D16] truncate">
                                {language === 'hi' && c.name_hi ? c.name_hi : c.name}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate font-light">
                                {language === 'hi' && c.description_hi ? c.description_hi : c.description}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredLessons.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
                        {language === 'hi' ? 'पाठ' : 'Lessons'}
                      </p>
                      {filteredLessons.map((l) => (
                        <div
                          key={l.id}
                          onClick={() => {
                            setActiveTab('learn');
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                              <BookOpen className="w-4 h-4" />
                            </span>
                            <div className="truncate">
                              <p className="text-xs font-bold text-[#090D16] truncate">
                                {language === 'hi' && l.title_hi ? l.title_hi : l.title}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate font-light">
                                {l.estimated_minutes} min read · {l.difficulty}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

