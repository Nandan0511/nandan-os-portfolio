'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { AIMessage } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusIndicator } from '@/components/shared/StatusIndicator';
import * as Lucide from 'lucide-react';
import { cn } from '@/lib/utils';


export function AIAssistantApp() {
  const { openWindow } = useWindowManager();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'init-msg',
      role: 'assistant',
      content: "👋 Hi! I'm NandanOS Assistant. I can help you learn about Nandan's projects, skills, and experience.\n\nI can also open apps for you! Try asking 'Show projects', 'Open resume', or 'Contact Nandan'.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
const messagesContainerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const container = messagesContainerRef.current;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI Logic mapping response (case-insensitive keyword matching)

     try {
  const query = text.toLowerCase();

  let action: any = null;

if (query.includes('resume') || query.includes('cv')) {
  action = { type: 'open_window', appId: 'resume' };
}
else if (
  query.includes('project') ||
  query.includes('work')
) {
  action = { type: 'open_window', appId: 'projects' };
}
else if (query.includes('skill')) {
  action = { type: 'open_window', appId: 'skills' };
}
else if (query.includes('cert')) {
  action = { type: 'open_window', appId: 'certifications' };
}
else if (
  query.includes('contact') ||
  query.includes('linkedin') ||
   query.includes('contect') ||
  query.includes('github')
) {
  action = { type: 'open_window', appId: 'contact' };
}
else if (query.includes('analytics')) {
  action = { type: 'open_window', appId: 'analytics' };
}
else if (query.includes('dashboard')) {
  action = { type: 'open_window', appId: 'dashboard' };
}

if (action) {
  openWindow(action.appId);

  setMessages((prev) => [
    ...prev,
    {
      id: `assist-${Date.now()}`,
      role: 'assistant',
      content: `Opening ${action.appId}...`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);

  setIsTyping(false);
  return;
}

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question: text,
    }),
  });

  const data = await response.json();

  const assistantMsg: AIMessage = {
    id: `assist-${Date.now()}`,
    role: 'assistant',
    content: data.answer,
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  setMessages((prev) => [...prev, assistantMsg]);

} catch (error) {
  console.error(error);

  setMessages((prev) => [
    ...prev,
    {
      id: `error-${Date.now()}`,
      role: 'assistant',
      content: 'Sorry, I could not process your request.',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);
} finally {
  setIsTyping(false);
}

  };

  const suggestedPrompts = [
    'Who is Nandan?',
    'Show me your projects',
    'What skills do you have?',
    'Open Resume Reader',
    'Contact Nandan'
  ];

  const clearChat = () => {
    setMessages([
      {
        id: 'init-msg',
        role: 'assistant',
        content: "Chat cleared! Ask me anything about Nandan's projects, skills, education, or contact hub.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="h-full w-full flex flex-col text-white bg-black/10 overflow-hidden">
      {/* Header bar */}
      <div className="border-b border-white/10 p-3 bg-black/20 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <Lucide.Bot className="h-5 w-5 text-blue-400" />
          <div>
            <span className="text-xs font-bold block">NandanOS AI Assistant</span>
            <StatusIndicator status="online" label="Online / Ready" />
          </div>
        </div>
        
        <Button onClick={clearChat} size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-white rounded-full">
          <Lucide.Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Main chat log viewport */}
      <div ref={messagesContainerRef}
       className="flex-1 p-4 overflow-y-auto scrollbar-none">
        <div className="flex flex-col space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={cn('flex flex-col max-w-[80%] space-y-1', isUser ? 'ml-auto items-end' : 'mr-auto items-start')}
              >
                <div
                  className={cn(
                    'p-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line border shadow-md',
                    isUser
                      ? 'bg-blue-600 border-blue-500 text-white rounded-br-none'
                      : 'bg-white/5 border-white/10 text-slate-200 rounded-bl-none'
                  )}
                >
                  {msg.content}
                </div>
                <span className="text-[9px] text-slate-500 font-bold px-1">{msg.timestamp}</span>
              </div>
            );
          })}

          {/* Typing animation indicator */}
          {isTyping && (
            <div className="flex flex-col items-start space-y-1 mr-auto max-w-[80%]">
              <div className="bg-white/5 border border-white/10 text-slate-400 p-3 rounded-2xl rounded-bl-none flex items-center gap-1.5 h-10">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          
          {/* <div ref={scrollRef} /> */}
        </div>
      </div>

      {/* Dynamic Suggested Pills */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none flex-shrink-0">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="whitespace-nowrap px-3 py-1 bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 rounded-full text-[10px] sm:text-xs transition-all font-semibold"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input container */}
      <div className="border-t border-white/10 p-3 bg-black/20 flex items-center gap-2 flex-shrink-0">
        <Input
          placeholder="Ask me something about Nandan..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend(inputValue);
          }}
          className="bg-white/5 border-white/10 text-white placeholder-slate-500 focus-visible:ring-blue-500/50 text-xs sm:text-sm"
        />
        <Button
          onClick={() => handleSend(inputValue)}
          size="icon"
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex-shrink-0 h-9 w-9"
          aria-label="Send message"
        >
          <Lucide.Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
export default AIAssistantApp;
