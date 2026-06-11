'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { GlassCard } from '@/components/shared/GlassCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import * as Lucide from 'lucide-react';
import { cn } from '@/lib/utils';

export function SettingsApp() {
  const {
    theme,
    toggleTheme,
    isReducedMotion,
    toggleReducedMotion
  } = useOS();

  const { closeAll } = useWindowManager();

  const handleResetBoot = () => {
    localStorage.removeItem('nandanos_boot_completed');
    alert('Boot cache cleared! Refresh the window to experience the boot sequence.');
  };

  return (
    <ScrollArea className="h-full w-full text-white bg-black/10">
      <div className="p-6 max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
            <Lucide.Settings className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">System Settings</h2>
            <p className="text-xs text-slate-500">Configure theme preferences, accessibility switches, and local cache variables.</p>
          </div>
        </div>

        {/* Panel Options */}
        <div className="space-y-4">
          
          {/* Theme option */}
          <GlassCard hover={false} className="p-4 flex items-center justify-between border-white/[0.08]">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">Interface Mode</span>
              <p className="text-[10px] text-slate-400">Toggle light or dark styling parameters across NandanOS.</p>
            </div>
            
            <Button
              onClick={toggleTheme}
              size="sm"
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-xs text-white"
            >
              {theme === 'dark' ? (
                <>
                  <Lucide.Moon className="mr-1 h-3.5 w-3.5 text-blue-400" /> Dark Mode
                </>
              ) : (
                <>
                  <Lucide.Sun className="mr-1 h-3.5 w-3.5 text-amber-500" /> Light Mode
                </>
              )}
            </Button>
          </GlassCard>

          {/* Reduced Motion option */}
          <GlassCard hover={false} className="p-4 flex items-center justify-between border-white/[0.08]">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">Reduced Animations</span>
              <p className="text-[10px] text-slate-400">Disable window dragging and sliding animations for accessibility.</p>
            </div>
            
            <Button
              onClick={toggleReducedMotion}
              size="sm"
              variant="outline"
              className={cn(
                'border-white/10 hover:bg-white/5 text-xs',
                isReducedMotion ? 'text-green-400 border-green-500/20 bg-green-500/5' : 'text-slate-400'
              )}
            >
              {isReducedMotion ? 'Enabled' : 'Disabled'}
            </Button>
          </GlassCard>

          {/* Diagnostics reset cache option */}
          <GlassCard hover={false} className="p-4 flex items-center justify-between border-white/[0.08]">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">Window Compositor</span>
              <p className="text-[10px] text-slate-400">Instantly shut down all running applications and reset grids.</p>
            </div>
            
            <Button
              onClick={closeAll}
              size="sm"
              variant="outline"
              className="border-red-500/20 hover:bg-red-500/10 text-xs text-red-400"
            >
              Clear Workspace
            </Button>
          </GlassCard>

          {/* Diagnostics reset boot cache */}
          <GlassCard hover={false} className="p-4 flex items-center justify-between border-white/[0.08]">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">Boot Sequence Cache</span>
              <p className="text-[10px] text-slate-400">Reset browser flags to replay the start sequence on next refresh.</p>
            </div>
            
            <Button
              onClick={handleResetBoot}
              size="sm"
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-xs text-slate-300"
            >
              Reset Cache
            </Button>
          </GlassCard>
        </div>

        {/* Footer info branding */}
        <div className="text-center text-[10px] text-slate-500 space-y-1 py-4 select-none">
          <div>NandanOS v1.0 — Built in Next.js 15</div>
          <div>Designed specifically for Nandan Patel</div>
        </div>
      </div>
    </ScrollArea>
  );
}
export default SettingsApp;
