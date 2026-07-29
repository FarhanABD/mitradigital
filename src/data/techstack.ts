import { TechStackCategory } from '@/types';

export const techStackData: TechStackCategory[] = [
  {
    category: 'Frontend & UI',
    description: 'Teknologi antarmuka web modern yang cepat, SEO-friendly, & interaktif.',
    items: [
      { name: 'React.js', level: 'Expert', icon: 'Atom', description: 'Framework UI standar global' },
      { name: 'Next.js 14', level: 'Expert', icon: 'Zap', description: 'App Router, Server Components & SSR' },
      { name: 'TypeScript', level: 'Advanced', icon: 'Code2', description: 'Strongly typed code anti-bug' },
      { name: 'Tailwind CSS', level: 'Expert', icon: 'Palette', description: 'Utility-first styling & responsiveness' },
      { name: 'Vue.js / Nuxt', level: 'Advanced', icon: 'Layers', description: 'Progressive Web Framework' }
    ]
  },
  {
    category: 'Backend & API',
    description: 'Arsitektur server tangguh, secure, dan scalable tinggi.',
    items: [
      { name: 'Node.js / Express', level: 'Expert', icon: 'Server', description: 'High-concurrency async runtime' },
      { name: 'Laravel (PHP 8+)', level: 'Expert', icon: 'Cpu', description: 'Enterprise backend & MVC framework' },
      { name: 'Python (FastAPI / Django)', level: 'Advanced', icon: 'Terminal', description: 'Machine Learning & High performance API' },
      { name: 'Go (Golang)', level: 'Advanced', icon: 'Workflow', description: 'Microservices & ultra-fast execution' }
    ]
  },
  {
    category: 'Mobile Apps',
    description: 'Aplikasi mobile iOS & Android dengan pengalaman UX native.',
    items: [
      { name: 'Flutter (Dart)', level: 'Expert', icon: 'Smartphone', description: 'Cross-platform UI engine buatan Google' },
      { name: 'React Native', level: 'Advanced', icon: 'Tablet', description: 'Universal mobile app dengan React' },
      { name: 'Swift / Kotlin', level: 'Advanced', icon: 'ShieldCheck', description: 'Native performance optimization' }
    ]
  },
  {
    category: 'Database & Cloud',
    description: 'Penyimpanan data relasional, noSQL, dan infrastruktur cloud.',
    items: [
      { name: 'PostgreSQL', level: 'Expert', icon: 'Database', description: 'Relational DB paling aman & canggih' },
      { name: 'MySQL / MariaDB', level: 'Expert', icon: 'HardDrive', description: 'Database industri tepercaya' },
      { name: 'MongoDB / Redis', level: 'Advanced', icon: 'Flame', description: 'NoSQL & ultra-fast in-memory cache' },
      { name: 'GCP / AWS / Docker', level: 'Expert', icon: 'Cloud', description: 'Cloud deployment, K8s, & CI/CD pipeline' }
    ]
  },
  {
    category: 'Artificial Intelligence',
    description: 'Solusi cerdas AI & otomasi bisnis tingkat lanjut.',
    items: [
      { name: 'Gemini AI API', level: 'Expert', icon: 'Bot', description: 'Multimodal AI dari Google' },
      { name: 'OpenAI GPT-4', level: 'Expert', icon: 'Sparkles', description: 'Large Language Model & Assistants' },
      { name: 'LangChain / Vector DB', level: 'Advanced', icon: 'Binary', description: 'RAG Architecture & Custom Knowledge Base' }
    ]
  }
];
