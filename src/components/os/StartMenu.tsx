'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { useOS } from '@/contexts/OSContext';
import { appRegistry } from '@/data/apps';
import { ICON_MAP } from './DesktopIcon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { profile } from '@/data/profile';
import * as Lucide from 'lucide-react';

export function StartMenu() {
  const { openWindow, closeAll } = useWindowManager();
  const { closeStartMenu, openSearch, isReducedMotion } = useOS();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close start menu if clicked outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeStartMenu();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [closeStartMenu]);

  const handleAppLaunch = (appId: string) => {
    openWindow(appId);
    closeStartMenu();
  };

  const handleShutdown = () => {
    closeAll();
    closeStartMenu();
  };

  const slideAnimation = !isReducedMotion
    ? {
        initial: { opacity: 0, y: 50, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 50, scale: 0.95 },
        transition: {  duration: 0.3 }
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      };

  return (
    <motion.div
      ref={menuRef}
      className="fixed bottom-14 left-3 w-80 sm:w-96 max-h-[500px] bg-[#0c1020]/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[150] flex flex-col"
      {...slideAnimation}
    >
      <div className="flex flex-1 min-h-0">
        
        {/* Left Side: User Profile Summary banner */}
        <div className="w-24 sm:w-28 bg-white/[0.02] border-r border-white/5 p-4 flex flex-col justify-between items-center text-center">
          <div className="space-y-3">
            <Avatar className="h-12 w-12 border border-blue-500/20 bg-blue-600/10 text-blue-400">
              <AvatarFallback className="font-extrabold text-sm">NP</AvatarFallback>
            </Avatar>
            <div>
              <span className="text-[10px] font-bold text-white leading-tight block">{profile.name}</span>
              <span className="text-[9px] text-slate-500 font-semibold leading-tight block mt-0.5">DS Student</span>
            </div>
          </div>
          
          <span className="text-[8px] uppercase font-bold text-slate-600 select-none">NandanOS</span>
        </div>

        {/* Right Side: Apps Grid List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="text-[9px] uppercase tracking-widest font-extrabold text-slate-500">Registered Applications</div>
          <div className="grid grid-cols-2 gap-2">
            {appRegistry.map((app) => {
              const Icon = ICON_MAP[app.icon] || Lucide.HelpCircle;
              return (
                <button
                  key={app.id}
                  onClick={() => handleAppLaunch(app.id)}
                  className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg text-left transition-colors text-xs text-slate-300 hover:text-white cursor-pointer select-none group"
                >
                  <div className="p-1.5 rounded-md bg-white/5 text-slate-400 group-hover:text-blue-400 group-hover:bg-white/10 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-semibold truncate">{app.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar search & shutdown options */}
      <div className="border-t border-white/5 bg-black/40 p-3 flex justify-between items-center gap-4 flex-shrink-0">
        <button
          onClick={() => {
            openSearch();
            closeStartMenu();
          }}
          className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400 hover:text-white transition-colors text-left cursor-pointer"
        >
          <Lucide.Search className="h-3.5 w-3.5" />
          <span>Type search... (Ctrl+K)</span>
        </button>

        <Button
          onClick={handleShutdown}
          size="icon"
          variant="ghost"
          className="h-8 w-8 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg cursor-pointer"
          aria-label="Shutdown system"
        >
          <Lucide.Power className="h-4.5 w-4.5" />
        </Button>
      </div>
    </motion.div>
  );
}
export default StartMenu;
