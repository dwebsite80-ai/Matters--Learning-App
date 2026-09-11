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
    <nav className="md:hidden fixed bottom-3 left-0 right-0 z-40 px-3 flex justify-center pointer-events-none">
      <div className="bg-white/95 backdrop-blur-md border border-black/10 shadow-xl px-2 py-1.5 rounded-full flex items-center gap-1 pointer-events-auto max-w-sm w-full justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              id={`bottom-nav-${item.tab}`}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {isActive && <span className="text-[11px] tracking-tight">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
