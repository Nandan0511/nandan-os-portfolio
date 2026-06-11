'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useKeyboard } from '@/hooks/useKeyboard';
import { ThemeMode } from '@/types';

interface OSContextProps {
  bootCompleted: boolean;
  setBootCompleted: (val: boolean) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  isMobile: boolean;
  startMenuOpen: boolean;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  currentTime: Date;
  isReducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const OSContext = createContext<OSContextProps | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [bootCompleted, setBootCompleted] = useLocalStorage<boolean>('nandanos_boot_completed', false);
  const [theme, setTheme] = useLocalStorage<ThemeMode>('nandanos_theme', 'dark');
  const [isReducedMotion, setIsReducedMotion] = useLocalStorage<boolean>('nandanos_reduced_motion', false);

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const isMobile = useMediaQuery('(max-width: 768px)');

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleReducedMotion = () => {
    setIsReducedMotion((prev) => !prev);
  };

  const toggleStartMenu = () => setStartMenuOpen((prev) => !prev);
  const closeStartMenu = () => setStartMenuOpen(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  // Hook up global key bindings
  useKeyboard({
    'ctrl+k': () => setSearchOpen((prev) => !prev),
    'escape': () => {
      setSearchOpen(false);
      setStartMenuOpen(false);
    }
  });

  // Keep dark class on document for styling
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <OSContext.Provider
      value={{
        bootCompleted,
        setBootCompleted,
        theme,
        toggleTheme,
        isMobile,
        startMenuOpen,
        toggleStartMenu,
        closeStartMenu,
        searchOpen,
        openSearch,
        closeSearch,
        currentTime,
        isReducedMotion,
        toggleReducedMotion
      }}
    >
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
}
