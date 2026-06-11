// Window System Types
export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  position: WindowPosition;
  size: WindowSize;
  minSize: WindowSize;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  zIndex: number;
}

export type WindowAction =
  | { type: 'OPEN_WINDOW'; payload: { appId: string; title?: string } }
  | { type: 'CLOSE_WINDOW'; payload: { id: string } }
  | { type: 'MINIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'MAXIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'RESTORE_WINDOW'; payload: { id: string } }
  | { type: 'FOCUS_WINDOW'; payload: { id: string } }
  | { type: 'UPDATE_POSITION'; payload: { id: string; position: WindowPosition } }
  | { type: 'UPDATE_SIZE'; payload: { id: string; size: WindowSize } }
  | { type: 'CLOSE_ALL' };

export interface WindowManagerState {
  windows: WindowState[];
  nextZIndex: number;
}

// App Registry Types
export interface AppDefinition {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  description: string;
  defaultSize: WindowSize;
  minSize: WindowSize;
  category: 'core' | 'utility' | 'social';
  pinned: boolean;
  desktopIcon: boolean;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'generative-ai' | 'machine-learning' | 'computer-vision' | 'analytics' | 'future';
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  workflow: string;
  dataset: string;
  techStack: string[];
  results: string;
  challenges: string;
  lessonsLearned: string;
  futureImprovements: string;
  githubUrl: string;
  liveUrl: string;
  image: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  date: string;
}

// Skill Types
export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: string; // Hex or tailwind class color prefix
  skills: Skill[];
}

// Certification Types
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  verificationUrl: string;
  image: string;
  category: string;
}

// Analytics/Tableau Types
export interface AnalyticsDashboard {
  id: string;
  title: string;
  description: string;
  category: string;
  insights: string[];
  externalUrl: string;
  image: string;
}

// AI Assistant Types
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // Serialized date
}

export interface AIResponse {
  keywords: string[];
  response: string;
  action?: { type: 'open_window'; appId: string } | { type: 'navigate'; section: string };
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Profile Types
export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  education: Education[];
  interests: string[];
  achievements: Achievement[];
  socialLinks: SocialLink[];
  location: string;
  email: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Search Types
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'project' | 'skill' | 'certification' | 'analytics' | 'page';
  appId: string;
  icon: string;
}

// Theme Types
export type ThemeMode = 'dark' | 'light';

export interface OSSettings {
  theme: ThemeMode;
  reducedMotion: boolean;
  bootCompleted: boolean;
}
