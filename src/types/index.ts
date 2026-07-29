export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  recommendedFor: string;
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'enterprise' | 'ai';
  categoryLabel: string;
  description: string;
  client: string;
  technologies: string[];
  image: string;
  images?: string[];
  stats?: { label: string; value: string }[];
  liveUrl?: string;
  demoUrl?: string;
}

export interface TechStackCategory {
  category: string;
  description: string;
  items: {
    name: string;
    level: string;
    icon: string;
    description: string;
  }[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  projectType: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'process' | 'pricing' | 'tech';
}

export interface EstimatorOption {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  description: string;
}

export interface EstimatorCategory {
  id: string;
  title: string;
  options: EstimatorOption[];
}
