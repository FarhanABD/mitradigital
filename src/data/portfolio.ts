import { PortfolioItem } from '@/types';

export const portfolioData: PortfolioItem[] = [
  {
    id: 'filament-pos-cashier',
    title: 'CV Indigama Khatulistiwa',
    category: 'enterprise',
    categoryLabel: 'Enterprise ERP',
    description: 'Pengembangan Sistem ERP untuk CV Indigama Khatulistiwa untuk keperluan administrasi internal perusahaan.',
    client: 'Retail & Handover Project',
    technologies: ['Laravel', 'React', 'MySQL', 'PHP'],
    image: 'https://images.unsplash.com/photo-1556742049-0a6744ad00d7?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742049-0a6744ad00d7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop'
    ],
    stats: [
      { label: 'Efisiensi Transaksi', value: '+40%' },
      { label: 'Dynamic Forms', value: '100%' }
    ]
  },
  {
    id: 'Antarsukha Web Apps',
    title: 'Website angkringan antarsukha',
    category: 'web',
    categoryLabel: 'Web Application',
    description: 'Website angkringan antarsukha untuk keperluan promosi dan penjualan.',
    client: 'Antarsukha',
    technologies: ['Laravel', 'Eloquent ORM', 'MySQL', 'PHP', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'
    ],
    stats: [
      { label: 'Relasi Data', value: 'Complex Eloquent' },
      { label: 'Akurasi Jadwal', value: '100%' }
    ]
  },
  {
    id: 'naive-bayes-expert-system',
    title: 'Naive Bayes Expert System App',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    description: 'Aplikasi sistem pakar berbasis web untuk perhitungan probabilitas dan diagnosa otomatis menggunakan metode Naive Bayes.',
    client: 'Internal Research & Web App',
    technologies: ['CodeIgniter', 'Laravel', 'PHP', 'MySQL', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop'
    ],
    stats: [
      { label: 'Akurasi Metode', value: 'Algoritma Bayes' },
      { label: 'Kecepatan Proses', value: '<1 Detik' }
    ]
  },
  {
    id: 'data-visualization-dashboard',
    title: 'Data Visualization & Analytics Dashboard',
    category: 'web',
    categoryLabel: 'Web Application',
    description: 'Dashboard visualisasi data interaktif berbasis Python yang di-deploy untuk menampilkan analitik data secara visual dan informatif.',
    client: 'Data Analytics Project',
    technologies: ['Python', 'Streamlit', 'Pandas', 'Matplotlib', 'pyngrok'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
    ],
    stats: [
      { label: 'Visualisasi Data', value: 'Real-time Chart' },
      { label: 'Processing', value: 'Pandas Core' }
    ]
  }
];