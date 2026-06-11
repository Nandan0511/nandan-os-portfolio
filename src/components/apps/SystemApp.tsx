'use client';

import React, { useState, useEffect } from 'react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { useOS } from '@/contexts/OSContext';
import { GlassCard } from '@/components/shared/GlassCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as Lucide from 'lucide-react';

export function SystemApp() {
  const { windows } = useWindowManager();
  const { theme, isReducedMotion } = useOS();
  const [uptime, setUptime] = useState(0);

  // System uptime counter
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const systemDetails = [
    { label: 'OS Name', value: 'NandanOS' },
    { label: 'Version', value: '1.0.0-release' },
    { label: 'Language Core', value: 'TypeScript 5.x' },
    { label: 'UI Library', value: 'React 19 + Next.js 15 (App Router)' },
    { label: 'Display Engine', value: 'Tailwind CSS v4' },
    { label: 'Window Compositor', value: 'Framer Motion 12.x' },
    { label: 'Active Theme', value: theme.toUpperCase() },
    { label: 'Active Windows', value: windows.length.toString() },
    { label: 'System Uptime', value: formatUptime(uptime) },
    { label: 'Environment Mode', value: process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : 'PRODUCTION' }
  ];

  return (
    <ScrollArea className="h-full w-full text-white bg-black/10">
      <div className="p-6 max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
            <Lucide.Monitor className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">System Information</h2>
            <p className="text-xs text-slate-500">Core operating system parameters, environment variables, and status.</p>
          </div>
        </div>

        {/* Specs Table */}
        <GlassCard hover={false} className="border-white/[0.08] p-0 overflow-hidden font-mono text-xs">
          <div className="divide-y divide-white/5">
            {systemDetails.map((spec, i) => (
              <div key={i} className="flex justify-between p-3.5 gap-4">
                <span className="text-slate-500 select-none">{spec.label}</span>
                <span className="text-blue-300 text-right select-all font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Diagnostic log terminal mockup */}
        <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-[10px] text-green-400/80 space-y-1 select-none">
          <div>$ diagnostics --run</div>
          <div>[OK] CPU temperature: 38C</div>
          <div>[OK] Threading model: WebWorkers enabled</div>
          <div>[OK] Frame scheduler: 60fps locking</div>
          <div>[OK] Local Storage persistence checks completed</div>
          <div>[OK] Accessibility: ReducedMotion {isReducedMotion ? 'ACTIVE' : 'DISABLED'}</div>
        </div>
      </div>
    </ScrollArea>
  );
}
export default SystemApp;
