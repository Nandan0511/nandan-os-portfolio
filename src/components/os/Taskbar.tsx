'use client';

import React from 'react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { useOS } from '@/contexts/OSContext';
import { appRegistry } from '@/data/apps';
import { ICON_MAP } from './DesktopIcon';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import * as Lucide from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function Taskbar() {
  const { windows, openWindow, focusWindow, minimizeWindow, restoreWindow } = useWindowManager();
  const {
    currentTime,
    toggleStartMenu,
    startMenuOpen,
    theme,
    toggleTheme,
    isMobile
  } = useOS();

  // Find pinned apps
  const pinnedApps = appRegistry.filter((app) => app.pinned);

  // Group open windows to display in taskbar
  const activeWindows = windows;

  const handleAppClick = (appId: string) => {
    const openWin = windows.find((w) => w.appId === appId);
    if (openWin) {
      if (openWin.isActive) {
        minimizeWindow(openWin.id);
      } else {
        focusWindow(openWin.id);
      }
    } else {
      openWindow(appId);
    }
  };

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <TooltipProvider>
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/45 backdrop-blur-2xl border-t border-white/10 z-[100] flex items-center justify-between px-3 select-none print:hidden">
        {/* Left side: Start Button */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={toggleStartMenu}
                className={cn(
                  'h-9 w-9 bg-blue-600/10 hover:bg-blue-600/30 text-blue-400 border border-blue-500/20 rounded-lg p-0 cursor-pointer transition-all',
                  startMenuOpen && 'bg-blue-600/35 border-blue-400 scale-95'
                )}
                aria-label="Start Menu"
              >
                <Lucide.Terminal className="h-4.5 w-4.5 animate-pulse" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-900 border-white/10 text-white text-[10px]">
              Start Menu
            </TooltipContent>
          </Tooltip>
          
          <div className="h-5 w-[1px] bg-white/10 hidden sm:inline" />

          {/* Center pinned apps & open apps list */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-[50vw]">
            {pinnedApps.map((app) => {
              const Icon = ICON_MAP[app.icon] || Lucide.HelpCircle;
              const openWin = windows.find((w) => w.appId === app.id);
              const isOpen = !!openWin;
              const isActive = openWin?.isActive;

              return (
                <Tooltip key={app.id}>
                  <TooltipTrigger >
                    <div
                      onClick={() => handleAppClick(app.id)}
                      className={cn(
                        'relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer',
                        isOpen && 'bg-white/5 text-white',
                        isActive && 'bg-white/10 text-blue-400 border border-white/5 shadow-inner'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {/* Active/Open indicators dots */}
                      {isOpen && (
                        <span className={cn(
                          'absolute bottom-1 h-1 w-1 rounded-full',
                          isActive ? 'bg-blue-400 w-3 transition-all' : 'bg-slate-500'
                        )} />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 border-white/10 text-white text-[10px]">
                    {app.title}
                  </TooltipContent>
                </Tooltip>
              );
            })}

            {/* Render any non-pinned open apps */}
            {activeWindows.map((win) => {
              const isPinned = pinnedApps.some((a) => a.id === win.appId);
              if (isPinned) return null; // Already rendered

              const appDef = appRegistry.find((a) => a.id === win.appId);
              const Icon = appDef ? (ICON_MAP[appDef.icon] || Lucide.HelpCircle) : Lucide.HelpCircle;

              return (
                <Tooltip key={win.id}>
                  <TooltipTrigger>
                    <div
                      onClick={() => handleAppClick(win.appId)}
                      className={cn(
                        'relative h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer',
                        win.isActive && 'bg-white/10 text-blue-400 border border-white/5'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className={cn(
                        'absolute bottom-1 h-1 w-1 rounded-full',
                        win.isActive ? 'bg-blue-400 w-3 transition-all' : 'bg-slate-500'
                      )} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 border-white/10 text-white text-[10px]">
                    {win.title}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Right side: System Tray */}
        <div className="flex items-center gap-3">
          
          {/* Socials - hidden on narrow viewport */}
          {!isMobile && (
            <div className="flex items-center gap-1">
              <a
                href="https://github.com/Nandan0511"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Nandan's GitHub"
              >
                <FaGithub className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://linkedin.com/in/nandan0601"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Nandan's LinkedIn"
              >
                <FaLinkedin className="h-4.5 w-4.5" />
              </a>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Lucide.Moon className="h-4 w-4 text-blue-400" />
            ) : (
              <Lucide.Sun className="h-4 w-4 text-amber-500" />
            )}
          </button>

          {/* Uptime online status */}
          <div className="flex items-center gap-1.5 select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider hidden sm:inline">Online</span>
          </div>

          <div className="h-5 w-[1px] bg-white/10" />

          {/* Clock */}
          <div className="text-[11px] font-bold text-slate-300 font-mono select-none tracking-wider whitespace-nowrap pl-1 pr-1.5">
            {formattedTime}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
export default Taskbar;
