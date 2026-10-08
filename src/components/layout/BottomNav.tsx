import React from 'react';
import { Home, BookOpen, RotateCcw, BarChart3, User } from 'lucide-react';
import { ActiveTab } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { language } = useLanguage();

  const navItems: {
    tab: ActiveTab;
    label_en: string;
    label_hi: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { tab: 'home', label_en: 'Home', label_hi: 'होम', icon: Home },
    { tab: 'learn', label_en: 'Courses', label_hi: 'कोर्स', icon: BookOpen },
    { tab: 'revision', label_en: 'Revision', label_hi: 'रिवीजन', icon: RotateCcw },
    { tab: 'progress', label_en: 'Progress', label_hi: 'प्रगति', icon: BarChart3 },
    { tab: 'profile', label_en: 'Profile', label_hi: 'प्रोफ़ाइल', icon: User },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-2xl border-t border-black/[0.08] dark:border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.5)] pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1 px-2 w-full transition-all"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          const label = language === 'hi' ? item.label_hi : item.label_en;

          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              id={`bottom-nav-${item.tab}`}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-2xl transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                isActive
                  ? 'text-violet-700 dark:text-violet-400 font-bold'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium'
              }`}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`relative px-3.5 py-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-violet-100/90 dark:bg-violet-950/80 text-violet-800 dark:text-violet-300'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold text-violet-900 dark:text-violet-300' : 'text-slate-500 dark:text-slate-400'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

