import React from 'react';
import { Home, BookOpen, RotateCcw, BarChart3, User } from 'lucide-react';
import { ActiveTab } from '../../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { tab: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { tab: 'home', label: 'Home', icon: Home },
    { tab: 'learn', label: 'Curriculum', icon: BookOpen },
    { tab: 'revision', label: 'Revision', icon: RotateCcw },
    { tab: 'progress', label: 'Stats', icon: BarChart3 },
    { tab: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-5 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
      <div className="bg-white/92 backdrop-blur-2xl border border-black/[0.08] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.16)] px-2 py-1.5 rounded-full flex items-center gap-1 pointer-events-auto max-w-sm w-full justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              id={`bottom-nav-${item.tab}`}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#090D16] text-white shadow-xs scale-[1.02]'
                  : 'text-black/50 hover:text-black hover:bg-black/[0.03] active:scale-95'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {isActive && <span className="text-[11px] font-bold tracking-tight">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
