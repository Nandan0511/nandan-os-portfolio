'use client';

import React, { useEffect } from 'react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { useOS } from '@/contexts/OSContext';
import { appRegistry } from '@/data/apps';
import { DesktopIcon } from './DesktopIcon';
import { WindowManager } from './WindowManager';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { GlobalSearch } from './GlobalSearch';
import { motion, AnimatePresence } from 'framer-motion';

export function Desktop() {
  const { openWindow } = useWindowManager();
  const { startMenuOpen, searchOpen, isMobile } = useOS();

  // Auto-open dashboard app on first visit
  useEffect(() => {
    openWindow('dashboard');
  }, [openWindow]);

  // Filter registry apps to show on desktop grid
  const desktopApps = appRegistry.filter((app) => app.desktopIcon);

  return (
    <div className="relative h-screen w-screen bg-[#080B12] overflow-hidden flex flex-col text-white select-none">
      
      {/* Background radial gradient wrapper for wallpaper */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] h-[60%] w-[50%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[50%] bg-green-500/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Main workspace container */}
      <div className="flex-1 relative p-4 pb-20 select-none">
        <div
  className="
    absolute top-6 left-6
    grid
    grid-flow-col
    grid-rows-7
    gap-x-6
    gap-y-4
    auto-cols-max
    z-10
    select-none
  "
>
  {desktopApps.map((app) => (
    <DesktopIcon
      key={app.id}
      app={app}
      onOpen={() => openWindow(app.id)}
    />
  ))}
</div>
        {/* Desktop icon grid */}


        {/* Window Manager rendering all open windows */}
        <WindowManager />
      </div>

      {/* Start Menu Overlay */}
      <AnimatePresence>
        {startMenuOpen && <StartMenu />}
      </AnimatePresence>

      {/* Global Command Search Overlay */}
      <AnimatePresence>
        {searchOpen && <GlobalSearch />}
      </AnimatePresence>

      {/* Fixed bottom taskbar */}
      <Taskbar />
    </div>
  );
}
export default Desktop;
