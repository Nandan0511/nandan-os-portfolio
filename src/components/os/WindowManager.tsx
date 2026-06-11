'use client';

import React from 'react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { WindowFrame } from './WindowFrame';
import { DashboardApp } from '../apps/DashboardApp';
import { ProjectsApp } from '../apps/ProjectsApp';
import { AnalyticsApp } from '../apps/AnalyticsApp';
import { SkillsApp } from '../apps/SkillsApp';
import { ResumeApp } from '../apps/ResumeApp';
import { CertificationsApp } from '../apps/CertificationsApp';
import { ContactApp } from '../apps/ContactApp';
import { AIAssistantApp } from '../apps/AIAssistantApp';
import { SystemApp } from '../apps/SystemApp';
import { SettingsApp } from '../apps/SettingsApp';

export function WindowManager() {
  const { windows } = useWindowManager();

  const renderAppContent = (appId: string) => {
    switch (appId) {
      case 'dashboard':
        return <DashboardApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'analytics':
        return <AnalyticsApp />;
      case 'skills':
        return <SkillsApp />;
      case 'resume':
        return <ResumeApp />;
      case 'certifications':
        return <CertificationsApp />;
      case 'contact':
        return <ContactApp />;
      case 'ai-assistant':
        return <AIAssistantApp />;
      case 'system':
        return <SystemApp />;
      case 'settings':
        return <SettingsApp />;
      default:
        return (
          <div className="flex h-full w-full items-center justify-center text-slate-500">
            Application Error: Component not registered.
          </div>
        );
    }
  };

  return (
    <>
      {windows.map((win) => (
        <WindowFrame key={win.id} window={win}>
          {renderAppContent(win.appId)}
        </WindowFrame>
      ))}
    </>
  );
}
export default WindowManager;
