'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import { Button } from '@/components/ui/button';

export function BootScreen() {
  const { setBootCompleted, isReducedMotion } = useOS();
  const [logs, setLogs] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);

  const bootLogs = [
    'NandanOS v1.0 [kernel 19.2.4]',
    'Initializing hardware subsystems...',
    '[OK] Memory allocation check passed',
    '[OK] Mounting visual presentation server (Tailwind)...',
    '[OK] Binding window composite compositor (FramerMotion)...',
    'Loading core NandanOS packages...',
    '[OK] App registry loaded (10 default nodes)',
    '[OK] AI Assistant NLP corpus indexed',
    'Launching Desktop compositor. Enjoy your visit!'
  ];

  // Log printing simulation
  useEffect(() => {
    if (isReducedMotion) {
      setBootCompleted(true);
      return;
    }

    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 250);

    // Percentage loading bar
    const progressInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setBootCompleted(true);
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 120);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [isReducedMotion]);

  const handleSkip = () => {
    setBootCompleted(true);
  };

  return (
    <div className="fixed inset-0 bg-[#080B12] z-[9999] flex flex-col items-center justify-center font-mono p-4 select-none">
      {/* CRT Scanline Filter overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />

      {/* Skip button top-right */}
      <div className="absolute top-6 right-6">
        <Button
          onClick={handleSkip}
          variant="outline"
          size="sm"
          className="border-white/10 hover:bg-white/5 text-white font-mono text-xs cursor-pointer"
        >
          SKIP BOOT (ESC)
        </Button>
      </div>

      <div className="w-full max-w-xl flex flex-col justify-between h-[420px] bg-black/60 border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
        {/* Terminal logs list container */}
        <div className="flex-1 overflow-y-auto space-y-2 text-xs sm:text-sm text-slate-300">
          {/* {logs.map((log, i) => {

            const isOk = log.startsWith('[OK]');
            const isHeader = log.startsWith('NandanOS');
            return (
              <div
                key={i}
                className={cn(
                  isOk && 'text-green-400',
                  isHeader && 'text-blue-400 font-extrabold text-sm'
                )}
              >
                {log}
              </div>
            );
          })} */}
          {logs
  .filter(Boolean)
  .map((log, i) => {
    const isOk = log.startsWith('[OK]');
    const isHeader = log.startsWith('NandanOS');

    return (
      <div
        key={i}
        className={cn(
          isOk ? 'text-green-400' : '',
          isHeader ? 'text-blue-400 font-extrabold text-sm' : ''
        )}
      >
        {log}
      </div>
    );
  })}
        </div>

        {/* Loading progress bar */}
        <div className="space-y-2 mt-4 flex-shrink-0">
          <div className="flex justify-between text-xs font-bold text-slate-500">
            <span>COMPILING CORES</span>
            <span>{percent}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper utility inline to avoid import collisions
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
export default BootScreen;
