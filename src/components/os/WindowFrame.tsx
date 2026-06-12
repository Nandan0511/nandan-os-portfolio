'use client';

import React, { useRef } from 'react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { useOS } from '@/contexts/OSContext';
import { WindowState } from '@/types';
import { useDrag } from '@/hooks/useDrag';
import { useResize } from '@/hooks/useResize';
import { ICON_MAP } from './DesktopIcon';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';

interface WindowFrameProps {
  window: WindowState;
  children: React.ReactNode;
}

export function WindowFrame({ window: win, children }: WindowFrameProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updatePosition,
    updateSize
  } = useWindowManager();

  const { isReducedMotion, isMobile } = useOS();

  const frameRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);

  // Initialize dragging hook
  const { isDragging } = useDrag({
    elementRef: frameRef,
    dragHandleRef: titleBarRef,
    initialPosition: win.position,
    onDrag: (pos) => updatePosition(win.id, pos),
    disabled: win.isMaximized || isMobile
  });

  // Initialize resizing hook
  const { startResize } = useResize({
    elementRef: frameRef,
    initialSize: win.size,
    minSize: win.minSize,
    onResize: (size) => updateSize(win.id, size),
    disabled: win.isMaximized || isMobile
  });

  const handleFocus = () => {
    if (!win.isActive) {
      focusWindow(win.id);
    }
  };

  const handleTitleDoubleClick = () => {
    if (isMobile) return;
    if (win.isMaximized) {
      restoreWindow(win.id);
    } else {
      maximizeWindow(win.id);
    }
  };

  const AppIcon = ICON_MAP[appRegistryIcon(win.appId)] || Lucide.HelpCircle;

  // Window styling classes
  const windowStyles = cn(
    'absolute flex flex-col bg-[#0c1020]/90 border text-white rounded-xl shadow-2xl overflow-hidden focus:outline-none transition-shadow duration-200 select-none backdrop-blur-2xl',
    win.isActive ? 'border-white/20 shadow-blue-500/5' : 'border-white/10 opacity-90',
    win.isMinimized && 'hidden',
    isDragging && 'shadow-blue-500/10 cursor-move border-blue-500/30'
  );

  // Dynamically set positions & sizes
  const positionStyles = win.isMaximized || isMobile
    ? {
        left: 0,
        top: 0,
        width: '100%',
        height: 'calc(100dvh - 48px)', // Minus taskbar
        borderRadius: 0,
        borderWidth: 0,
        zIndex: win.zIndex
      }
    : {
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex
      };

  const frameAnimation = !isReducedMotion
    ? {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: {  duration: 0.25 }
      }
    : {};

  return (
    <motion.div
      ref={frameRef}
      onPointerDown={handleFocus}
      className={windowStyles}
      style={positionStyles}
      {...frameAnimation}
      tabIndex={0}
      aria-label={`Window for ${win.title}`}
    >
      {/* Title Bar composite */}
      <div
        ref={titleBarRef}
        onDoubleClick={handleTitleDoubleClick}
        className="h-10 bg-black/40 border-b border-white/5 flex items-center justify-between px-3 select-none flex-shrink-0"
      >
        {/* Left Side: macOS-styled colored control circles */}
        <div className="flex items-center gap-2 w-20">
          {/* Close */}
          <button
            onClick={() => closeWindow(win.id)}

            className="group h-4 w-4 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center text-[7px] text-red-950 font-bold border border-red-600/40 cursor-pointer"
            aria-label="Close window"
          >
            <span className="opacity-0 group-hover:opacity-100">×</span>
          </button>
          
          {/* Minimize */}
          <button
            onClick={() => minimizeWindow(win.id)}
            className="group h-4 w-4 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center text-[7px] text-yellow-950 font-bold border border-yellow-600/40 cursor-pointer"
            aria-label="Minimize window"
          >
            <span className="opacity-0 group-hover:opacity-100">-</span>
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={() => {
              if (win.isMaximized) restoreWindow(win.id);
              else maximizeWindow(win.id);
            }}
            className="group h-4 w-4 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center text-[5px] text-green-950 font-bold border border-green-600/40 cursor-pointer"
            aria-label={win.isMaximized ? "Restore window" : "Maximize window"}
          >
            <span className="opacity-0 group-hover:opacity-100">
              {win.isMaximized ? '⧉' : '⤢'}
            </span>
          </button>
        </div>

        {/* Center: Window title label */}
        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold tracking-wide select-none truncate max-w-[50%]">
          <AppIcon className="h-3.5 w-3.5 text-slate-400" />
          <span className="truncate">{win.title}</span>
        </div>

        {/* Right Side spacer */}
        <div className="w-16" />
      </div>

      {/* Main Window Application Contents */}
      <div className="flex-1 min-h-0 relative bg-black/10 select-text">
        {children}
      </div>

      {/* Resize Anchors (Disabled on Mobile and Maximized) */}
      {!win.isMaximized && !isMobile && (
        <>
          {/* Right handle */}
          <div
            onPointerDown={(e) => startResize(e, 'e')}
            className="absolute top-0 right-0 bottom-0 w-1.5 cursor-e-resize z-50 hover:bg-blue-500/10 active:bg-blue-500/20"
          />
          {/* Bottom handle */}
          <div
            onPointerDown={(e) => startResize(e, 's')}
            className="absolute left-0 bottom-0 right-0 h-1.5 cursor-s-resize z-50 hover:bg-blue-500/10 active:bg-blue-500/20"
          />
          {/* Corner handle */}
          <div
            onPointerDown={(e) => startResize(e, 'se')}
            className="absolute right-0 bottom-0 h-3 w-3 cursor-se-resize z-50 hover:bg-blue-500/10 active:bg-blue-500/20"
          />
        </>
      )}
    </motion.div>
  );
}

// Fallback registry icon helper to prevent import loops
function appRegistryIcon(appId: string): string {
  const mapping: { [key: string]: string } = {
    dashboard: 'LayoutDashboard',
    projects: 'FolderOpen',
    analytics: 'BarChart3',
    skills: 'Code2',
    resume: 'FileText',
    certifications: 'Award',
    contact: 'Mail',
    'ai-assistant': 'Bot',
    system: 'Monitor',
    settings: 'Settings'
  };
  return mapping[appId] || 'HelpCircle';
}
export default WindowFrame;
