import { Profile } from '@/types';

export const profile: Profile = {
  name: 'Nandan Patel',
  role: 'Data Science Undergraduate',
  tagline: 'Building intelligent systems at the intersection of Data Science, AI & Software Engineering.',
  bio: 'Passionate undergraduate student specializing in Data Science and Artificial Intelligence. Experienced in designing machine learning pipelines, building computer vision solutions, and developing generative AI systems using RAG architectures. Eager to solve real-world problems with data and software.',
  location: 'Gujarat, India',
  email: 'nandan000070@gmail.com',
  education: [
    {
      degree: 'B.E in Computer Science and Engineering(Data Science)',
      institution: 'Gujarat Technological University',
      year: '2023 - 2027 (Expected)',
      description: 'Focusing on Machine Learning, Statistical Modeling, and Big Data Analytics. Relevant coursework: Deep Learning, Data Structures, Algorithms, Linear Algebra, Probability, and Database Systems.'
    }
  ],
  interests: [
    'Generative AI',
    'Machine Learning',
    'Computer Vision',
    'Data Analytics',
    'Software Engineering',
    'Open Source Contribution',
    'Cloud Computing'
  ],
  achievements: [
    {
      title: 'Dean\'s List',
      description: 'Maintained CGPA above 7.71/10 for five consecutive semesters.',
      icon: 'Award'
    },

    {
      title: 'Undergraduate Research Assistant',
      description: 'Contributed to LLM optimization research in the University AI Lab.',
      icon: 'BookOpen'
    }
  ],
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/Nandan0511',
      icon: 'Github'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/nandan0601',
      icon: 'Linkedin'
    }
  ]
};
