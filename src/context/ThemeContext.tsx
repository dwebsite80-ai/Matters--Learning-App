import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const THEME_STORAGE_KEY = 'matters_theme_preference';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark') return 'dark';
    if (saved === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Calculate resolved theme whenever theme changes or system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateResolved = () => {
      let active: ResolvedTheme = 'light';
      if (theme === 'dark') {
        active = 'dark';
      } else if (theme === 'light') {
        active = 'light';
      } else {
        active = mediaQuery.matches ? 'dark' : 'light';
      }

      setResolvedTheme(active);

      // Apply to documentElement and body
      const root = document.documentElement;
      if (active === 'dark') {
        root.classList.add('dark');
        document.body.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        document.body.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
      }
    };

    updateResolved();

    const handleChange = () => {
      if (theme === 'system') {
        updateResolved();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore storage quota errors
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
