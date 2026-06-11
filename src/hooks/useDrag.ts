'use client';

import { useState, useEffect, RefObject } from 'react';
import { WindowPosition } from '@/types';

interface UseDragProps {
  elementRef: RefObject<HTMLElement | null>;
  dragHandleRef: RefObject<HTMLElement | null>;
  initialPosition: WindowPosition;
  onDrag: (position: WindowPosition) => void;
  onDragEnd?: (position: WindowPosition) => void;
  disabled?: boolean;
}

export function useDrag({
  elementRef,
  dragHandleRef,
  initialPosition,
  onDrag,
  onDragEnd,
  disabled = false
}: UseDragProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [positionStart, setPositionStart] = useState<WindowPosition>(initialPosition);

  useEffect(() => {
    const handle = dragHandleRef.current;
    if (!handle || disabled) return;

    const handlePointerDown = (e: PointerEvent) => {
      // Only drag on left click/primary touch
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      // Prevent triggering drag on interactive elements in title bar
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        return;
      }

      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      
      const currentElement = elementRef.current;
      if (currentElement) {
        // Parse left/top from element style or fallback
        const rect = currentElement.getBoundingClientRect();
        setPositionStart({
          x: currentElement.offsetLeft || rect.left,
          y: currentElement.offsetTop || rect.top
        });
      }
      
      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const newPosition = {
        x: positionStart.x + deltaX,
        y: positionStart.y + deltaY
      };

      onDrag(newPosition);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return;

      setIsDragging(false);
      handle.releasePointerCapture(e.pointerId);

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const finalPosition = {
        x: positionStart.x + deltaX,
        y: positionStart.y + deltaY
      };

      if (onDragEnd) {
        onDragEnd(finalPosition);
      }
    };

    handle.addEventListener('pointerdown', handlePointerDown);
    handle.addEventListener('pointermove', handlePointerMove);
    handle.addEventListener('pointerup', handlePointerUp);
    handle.addEventListener('pointercancel', handlePointerUp);

    return () => {
      handle.removeEventListener('pointerdown', handlePointerDown);
      handle.removeEventListener('pointermove', handlePointerMove);
      handle.removeEventListener('pointerup', handlePointerUp);
      handle.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging, dragStart, positionStart, onDrag, onDragEnd, disabled, dragHandleRef, elementRef]);

  return { isDragging };
}
