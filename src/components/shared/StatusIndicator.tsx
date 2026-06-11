'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'away' | 'busy';
  label?: string;
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export function StatusIndicator({
  status,
  label,
  size = 'sm',
  pulse = true
}: StatusIndicatorProps) {
  const isOnline = status === 'online';
  const isAway = status === 'away';
  const isBusy = status === 'busy';
  const isOffline = status === 'offline';

  const colorClasses = cn(
    isOnline && 'bg-green-500',
    isAway && 'bg-amber-500',
    isBusy && 'bg-red-500',
    isOffline && 'bg-slate-500'
  );

  const dotSize = size === 'md' ? 'h-3 w-3' : 'h-2 w-2';

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        {pulse && (isOnline || isAway) && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              isOnline && 'bg-green-400',
              isAway && 'bg-amber-400'
            )}
          />
        )}
        <span className={cn('relative inline-flex rounded-full', dotSize, colorClasses)} />
      </div>
      {label && <span className="text-xs text-slate-400 font-medium select-none">{label}</span>}
    </div>
  );
}
export default StatusIndicator;
