'use client';

import { useState, useEffect, RefObject } from 'react';
import { WindowSize, WindowPosition } from '@/types';

interface UseResizeProps {
  elementRef: RefObject<HTMLElement | null>;
  initialSize: WindowSize;
  minSize: WindowSize;
  onResize: (size: WindowSize, position?: WindowPosition) => void;
  onResizeEnd?: (size: WindowSize, position?: WindowPosition) => void;
  disabled?: boolean;
}

export type ResizeDirection = 'e' | 's' | 'se';

export function useResize({
  elementRef,
  initialSize,
  minSize,
  onResize,
  onResizeEnd,
  disabled = false
}: UseResizeProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [direction, setDirection] = useState<ResizeDirection | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [sizeStart, setSizeStart] = useState<WindowSize>(initialSize);
  const [posStart, setPosStart] = useState<WindowPosition>({ x: 0, y: 0 });

  const startResize = (e: React.PointerEvent, dir: ResizeDirection) => {
    if (disabled || e.button !== 0) return;
    
    setIsResizing(true);
    setDirection(dir);
    setResizeStart({ x: e.clientX, y: e.clientY });
    
    const currentElement = elementRef.current;
    if (currentElement) {
      const rect = currentElement.getBoundingClientRect();
      setSizeStart({
        width: rect.width || currentElement.offsetWidth,
        height: rect.height || currentElement.offsetHeight
      });
      setPosStart({
        x: currentElement.offsetLeft || rect.left,
        y: currentElement.offsetTop || rect.top
      });
    }

    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (!isResizing || !direction) return;

    const handlePointerMove = (e: PointerEvent) => {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      let newWidth = sizeStart.width;
      let newHeight = sizeStart.height;

      if (direction === 'e' || direction === 'se') {
        newWidth = Math.max(minSize.width, sizeStart.width + deltaX);
      }
      if (direction === 's' || direction === 'se') {
        newHeight = Math.max(minSize.height, sizeStart.height + deltaY);
      }

      onResize({ width: newWidth, height: newHeight });
    };

    const handlePointerUp = (e: PointerEvent) => {
      setIsResizing(false);
      
      const target = e.target as HTMLElement;
      try {
        target.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Suppress errors if target pointer capture was lost
      }

      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      let finalWidth = sizeStart.width;
      let finalHeight = sizeStart.height;

      if (direction === 'e' || direction === 'se') {
        finalWidth = Math.max(minSize.width, sizeStart.width + deltaX);
      }
      if (direction === 's' || direction === 'se') {
        finalHeight = Math.max(minSize.height, sizeStart.height + deltaY);
      }

      const finalSize = { width: finalWidth, height: finalHeight };

      if (onResizeEnd) {
        onResizeEnd(finalSize);
      }
      setDirection(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isResizing, direction, resizeStart, sizeStart, posStart, minSize, onResize, onResizeEnd]);

  return {
    isResizing,
    startResize
  };
}
