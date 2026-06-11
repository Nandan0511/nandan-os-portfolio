'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  as?: 'div' | 'button';
}

export function GlassCard({
  children,
  className,
  hover = true,
  onClick,
  as = 'div'
}: GlassCardProps) {
  const { isReducedMotion } = useOS();

  const baseStyles = cn(
    'relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
    hover && 'hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300',
    onClick && 'cursor-pointer select-none'
  );

  const hoverAnimation = hover && !isReducedMotion
    ? {
        whileHover: { y: -4, scale: 1.01 },
        whileTap: { scale: 0.99 }
      }
    : {};

  if (as === 'button') {
    return (
      <motion.button
        className={cn(baseStyles, 'text-left w-full')}
        onClick={onClick}
        {...hoverAnimation}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div className={baseStyles} 
    onClick={onClick}
    {...hoverAnimation}>
      {children}
    </motion.div>
  );
}
export default GlassCard;
