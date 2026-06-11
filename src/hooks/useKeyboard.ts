'use client';

import { useEffect } from 'react';

type KeyboardBindings = {
  [keyCombo: string]: (e: KeyboardEvent) => void;
};

export function useKeyboard(bindings: KeyboardBindings) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keysPressed: string[] = [];

      if (e.ctrlKey) keysPressed.push('ctrl');
      if (e.shiftKey) keysPressed.push('shift');
      if (e.altKey) keysPressed.push('alt');
      if (e.metaKey) keysPressed.push('meta');

      const primaryKey = e.key.toLowerCase();
      if (!['control', 'shift', 'alt', 'meta'].includes(primaryKey)) {
        keysPressed.push(primaryKey);
      }

      // Check each combo in bindings
      Object.entries(bindings).forEach(([combo, callback]) => {
        const comboKeys = combo.toLowerCase().split('+');

        // Check if length is same and all keys in combo are pressed
        const matches =
          comboKeys.length === keysPressed.length &&
          comboKeys.every((key) => keysPressed.includes(key));

        if (matches) {
          e.preventDefault();
          callback(e);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [bindings]);
}
