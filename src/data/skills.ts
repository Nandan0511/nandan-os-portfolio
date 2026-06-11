import { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming Languages',
    icon: 'Code2',
    color: '#3B82F6', // Blue
    skills: [
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 80 },
      { name: 'C', level: 65 }
    ]
  },
  {
    id: 'analytics',
    title: 'Data Analytics & BI',
    icon: 'BarChart3',
    color: '#22C55E', // Green
    skills: [
      { name: 'Tableau', level: 75 },
      { name: 'Power BI', level: 55 },
      { name: 'Data Visualization', level: 85 }
    ]
  },
  {
    id: 'libraries',
    title: 'Libraries & Frameworks',
    icon: 'Binary',
    color: '#A855F7', // Purple
    skills: [
      { name: 'Pandas', level: 88 },
      { name: 'NumPy', level: 85 },
      { name: 'Matplotlib & Seaborn', level: 80 },
      { name: 'Scikit-Learn', level: 75 },
      { name: 'TensorFlow / Keras', level: 70 },
      { name: 'Streamlit', level: 70 }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: 'Brain',
    color: '#F59E0B', // Amber
    skills: [
      { name: 'Machine Learning', level: 85 },
      { name: 'Computer Vision', level: 75 },
      { name: 'LangChain', level: 72 },
      { name: 'RAG Architecture', level: 70 },
      { name: 'Natural Language Processing', level: 68 },
      { name: 'Deep Learning', level: 72 }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: 'Wrench',
    color: '#06B6D4', // Cyan
    skills: [
      { name: 'Git & GitHub', level: 65 },
      { name: 'VS Code', level: 90 },
      { name: 'Jupyter Notebooks', level: 88 }
    ]
  }
];
