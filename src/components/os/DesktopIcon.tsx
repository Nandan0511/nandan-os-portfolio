'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AppDefinition } from '@/types';
import { useOS } from '@/contexts/OSContext';
import * as Lucide from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesktopIconProps {
  app: AppDefinition;
  onOpen: () => void;
}

// Global mapping of string names to Lucide icons
export const ICON_MAP: { [key: string]: React.ComponentType<any> } = {
  LayoutDashboard: Lucide.LayoutDashboard,
  FolderOpen: Lucide.FolderOpen,
  BarChart3: Lucide.BarChart3,
  Code2: Lucide.Code2,
  FileText: Lucide.FileText,
  Award: Lucide.Award,
  Mail: Lucide.Mail,
  Bot: Lucide.Bot,
  Monitor: Lucide.Monitor,
  Settings: Lucide.Settings,
  FolderArchive: Lucide.FolderArchive,
  Terminal: Lucide.Terminal,
  HelpCircle: Lucide.HelpCircle
};

export function DesktopIcon({ app, onOpen }: DesktopIconProps) {
  const { isReducedMotion } = useOS();
  const IconComponent = ICON_MAP[app.icon] || Lucide.HelpCircle;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  const hoverAnimation = !isReducedMotion
    ? {
        whileHover: { scale: 1.05, y: -2 },
        whileTap: { scale: 0.95 }
      }
    : {};

  return (
    <motion.button
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      className="group w-20 flex flex-col items-center gap-1.5 focus:outline-none p-1.5 rounded-lg border border-transparent focus:bg-white/5 focus:border-white/10 active:bg-white/10 transition-colors select-none text-center cursor-pointer"
      {...hoverAnimation}
      aria-label={`Open ${app.title} application`}
    >
      {/* Icon frame container */}
      <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-blue-400 group-hover:bg-white/10 transition-colors shadow-lg shadow-black/20 group-hover:shadow-blue-500/10">
        <IconComponent className="h-6 w-6" />
      </div>

      {/* App title label */}
      <span className="text-[10px] sm:text-xs font-bold text-slate-300 group-hover:text-white transition-colors truncate w-full select-none leading-none">
        {app.title}
      </span>
    </motion.button>
  );
}
export default DesktopIcon;
