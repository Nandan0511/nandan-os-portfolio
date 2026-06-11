import { AIResponse } from '@/types';

export const aiResponses: AIResponse[] = [
  {
    keywords: ['about', 'who is', 'nandan', 'bio', 'profile'],
    response: "Nandan Patel is a passionate Data Science Undergraduate specializing in Machine Learning, Computer Vision, and Generative AI. He builds intelligent software solutions, works with big data, and is currently pursuing his degree at the University of North Carolina. Would you like me to open his Dashboard to see the full profile?",
    action: { type: 'open_window', appId: 'dashboard' }
  },
  {
    keywords: ['project', 'work', 'chatbot', 'spam', 'garbage', 'classifier'],
    response: "Nandan has worked on several key projects: \n1. **PDF Chatbot**: A RAG-based document question-answering tool built using LangChain, FAISS, and OpenAI.\n2. **Gmail Spam Classifier**: An NLP text classification pipeline built with Scikit-Learn.\n3. **Smart Waste Classification**: A Convolutional Neural Network (CNN) trained with ResNet50 and TensorFlow to identify recyclables.\nWould you like me to open the Projects Explorer so you can browse them?",
    action: { type: 'open_window', appId: 'projects' }
  },
  {
    keywords: ['skill', 'languages', 'know', 'tech', 'python', 'sql', 'tableau'],
    response: "Nandan is proficient in: \n- **Languages**: Python, SQL, C\n- **Data Analytics**: Tableau, Power BI\n- **Libraries**: Pandas, NumPy, Scikit-Learn, TensorFlow, LangChain\n- **Tools**: Git, GitHub, VS Code\nWould you like to open the Skills Center to see the visual charts?",
    action: { type: 'open_window', appId: 'skills' }
  },
  {
    keywords: ['resume', 'cv', 'download', 'pdf', 'hire', 'experience'],
    response: "You can view, print, or download Nandan's full professional resume directly inside the Resume app. I am opening the Resume window for you right now!",
    action: { type: 'open_window', appId: 'resume' }
  },
  {
    keywords: ['contact', 'email', 'reach', 'github', 'linkedin', 'message', 'phone'],
    response: "You can reach Nandan Patel at **nandan000070@gmail.com** or send a message through the contact form. His social links are GitHub: github.com/Nandan0511 and LinkedIn: linkedin.com/in/nandan0601. I am launching the Contact Center for you!",
    action: { type: 'open_window', appId: 'contact' }
  },
  {
    keywords: ['certification', 'certificates', 'courses', 'stanford', 'google'],
    response: "Nandan holds certifications in:\n- **Google Data Analytics Professional Certificate**\n- **Stanford & DeepLearning.AI Machine Learning Specialization**\n- **IBM Python for Data Science & AI**\n- **Tableau Desktop Specialist**\nI'll open the Certifications window for you to review credentials.",
    action: { type: 'open_window', appId: 'certifications' }
  },
  {
    keywords: ['analytics', 'tableau', 'dashboard', 'visualization', 'bi'],
    response: "Nandan has created multiple Tableau dashboards, including: Sales Performance Analytics, Customer Segmentation RFM, and COVID-19 Global Health Insights. Let me open the Analytics Center for you to browse them.",
    action: { type: 'open_window', appId: 'analytics' }
  },
  {
    keywords: ['system', 'about os', 'specs', 'memory', 'uptime'],
    response: "NandanOS is a custom-engineered web operating system. It features a complete window manager, reactive taskbar, start menu, global search, and portfolio apps. I'll launch the System Info app for you.",
    action: { type: 'open_window', appId: 'system' }
  },
  {
    keywords: ['settings', 'theme', 'color', 'dark', 'light', 'animation'],
    response: "You can customize NandanOS settings, toggle dark/light theme, or adjust reduced-motion values. I am launching the Settings panel for you.",
    action: { type: 'open_window', appId: 'settings' }
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'help', 'what can you do'],
    response: "Hello! I am the NandanOS Assistant. You can ask me questions about Nandan's skills, projects, certifications, or how to contact him. I can also execute commands like: 'Show projects', 'Open resume', 'Show dashboard', or 'Launch contact form'. How can I help you today?"
  }
];
