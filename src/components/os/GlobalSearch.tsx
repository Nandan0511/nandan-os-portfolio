'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '@/contexts/OSContext';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { searchAll } from '@/utils/search';
import { SearchResult } from '@/types';
import { ICON_MAP } from './DesktopIcon';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { cn } from '@/lib/utils';

export function GlobalSearch() {
  const { closeSearch, isReducedMotion } = useOS();
  const { openWindow } = useWindowManager();
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Update results as query changes
  useEffect(() => {
    const matched = searchAll(query);
    setResults(matched);
    setActiveIndex(0);
  }, [query]);

  // Click outside to close search
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [closeSearch]);

  const handleResultLaunch = (res: SearchResult) => {
    openWindow(res.appId);
    // If it's a specific item, we let the app load. Since it's a mock framework, opening the appId is the action.
    closeSearch();
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) {
        handleResultLaunch(results[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeSearch();
    }
  };

  const overlayAnimation = !isReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 }
      }
    : {};

  const searchBoxAnimation = !isReducedMotion
    ? {
        initial: { opacity: 0, scale: 0.95, y: -20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -20 },
        transition: {  duration: 0.3 }
      }
    : {};

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-start justify-center pt-20 px-4 select-none"
      {...overlayAnimation}
    >
      <motion.div
        ref={containerRef}
        className="w-full max-w-lg bg-[#0c1020]/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[420px]"
        {...searchBoxAnimation}
      >
        {/* Search header input */}
        <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-black/20 flex-shrink-0">
          <Lucide.Search className="h-5 w-5 text-slate-500 flex-shrink-0" />
          <Input
            ref={inputRef}
            placeholder="Type query to search projects, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none text-white placeholder-slate-500 focus-visible:ring-0 p-0 text-base flex-1 h-auto"
          />
          <Badge variant="outline" className="text-[10px] text-slate-500 border-white/10 py-0.5 select-none hidden sm:inline">
            ESC
          </Badge>
        </div>

        {/* Results log */}
        <ScrollArea className="flex-1 min-h-0">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-xs text-slate-500 space-y-2 select-none">
              <p>Type keywords to search portfolio assets.</p>
              <div className="flex justify-center gap-2 pt-2">
                <span className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5">pdf chatbot</span>
                <span className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5">python</span>
                <span className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5">resume</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 select-none">
              No results found for <span className="text-white font-semibold">"{query}"</span>.
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {results.map((res, idx) => {
                const Icon = ICON_MAP[res.icon] || Lucide.HelpCircle;
                const isActive = activeIndex === idx;

                return (
                  <button
                    key={res.id}
                    onClick={() => handleResultLaunch(res)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={cn(
                      'w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg transition-colors cursor-pointer select-none',
                      isActive ? 'bg-blue-600/20 border border-blue-500/20 text-white' : 'border border-transparent text-slate-300'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn(
                        'p-2 rounded-md bg-white/5 text-slate-400',
                        isActive && 'bg-blue-500/20 text-blue-400'
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold block">{res.title}</span>
                        <span className="text-[10px] text-slate-400 truncate block mt-0.5">{res.description}</span>
                      </div>
                    </div>

                    <Badge className={cn(
                      'text-[9px] uppercase tracking-wider font-extrabold ml-3 flex-shrink-0 border-none bg-white/5 text-slate-400',
                      isActive && 'bg-blue-500/20 text-blue-400'
                    )}>
                      {res.category}
                    </Badge>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}
export default GlobalSearch;
