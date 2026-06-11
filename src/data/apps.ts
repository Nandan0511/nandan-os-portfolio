import { AppDefinition } from '@/types';

export const appRegistry: AppDefinition[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'LayoutDashboard',
    description: 'System overview, highlights, and primary metrics.',
    defaultSize: { width: 950, height: 620 },
    minSize: { width: 600, height: 400 },
    category: 'core',
    pinned: true,
    desktopIcon: true
  },
  {
    id: 'projects',
    title: 'Projects Explorer',
    icon: 'FolderOpen',
    description: 'File explorer for portfolio projects.',
    defaultSize: { width: 900, height: 600 },
    minSize: { width: 700, height: 450 },
    category: 'core',
    pinned: true,
    desktopIcon: true
  },
  {
    id: 'analytics',
    title: 'Analytics Center',
    icon: 'BarChart3',
    description: 'Tableau dashboards and analytical insights.',
    defaultSize: { width: 900, height: 580 },
    minSize: { width: 650, height: 400 },
    category: 'core',
    pinned: false,
    desktopIcon: true
  },
  {
    id: 'skills',
    title: 'Skills Center',
    icon: 'Code2',
    description: 'Technical skills, libraries, and visualization radar.',
    defaultSize: { width: 850, height: 560 },
    minSize: { width: 600, height: 400 },
    category: 'core',
    pinned: false,
    desktopIcon: true
  },
  {
    id: 'resume',
    title: 'Resume Reader',
    icon: 'FileText',
    description: 'Interactive resume viewer and download utilities.',
    defaultSize: { width: 800, height: 650 },
    minSize: { width: 550, height: 450 },
    category: 'core',
    pinned: false,
    desktopIcon: true
  },
  {
    id: 'certifications',
    title: 'Certifications',
    icon: 'Award',
    description: 'Professional development courses and certificates.',
    defaultSize: { width: 850, height: 520 },
    minSize: { width: 600, height: 380 },
    category: 'core',
    pinned: false,
    desktopIcon: true
  },
  {
    id: 'contact',
    title: 'Contact Hub',
    icon: 'Mail',
    description: 'Contact Nandan and connect on social platforms.',
    defaultSize: { width: 800, height: 520 },
    minSize: { width: 550, height: 400 },
    category: 'core',
    pinned: false,
    desktopIcon: true
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    icon: 'Bot',
    description: 'Conversational assistant with command execution support.',
    defaultSize: { width: 500, height: 600 },
    minSize: { width: 350, height: 450 },
    category: 'core',
    pinned: true,
    desktopIcon: true
  },
  {
    id: 'system',
    title: 'System Info',
    icon: 'Monitor',
    description: 'NandanOS specs, layout configurations, and resources.',
    defaultSize: { width: 450, height: 450 },
    minSize: { width: 380, height: 350 },
    category: 'utility',
    pinned: false,
    desktopIcon: true
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'Settings',
    description: 'Personalize window views, dark mode, and themes.',
    defaultSize: { width: 500, height: 400 },
    minSize: { width: 400, height: 300 },
    category: 'utility',
    pinned: false,
    desktopIcon: false
  }
];
