'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';
import { BootScreen } from '@/components/os/BootScreen';
import { Desktop } from '@/components/os/Desktop';
import { AnimatePresence } from 'framer-motion';

export default function Page() {
  const { bootCompleted } = useOS();

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!bootCompleted ? (
          <BootScreen key="boot" />
        ) : (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>
    </main>
  );
}
