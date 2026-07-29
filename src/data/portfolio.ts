import { PortfolioItem } from '@/types';

export const portfolioData: PortfolioItem[] = [
  {
    id: 'jejak-logistic-app',
    title: 'Smart Fleet & Delivery Logistics SaaS',
    category: 'enterprise',
    categoryLabel: 'Enterprise ERP',
    description: 'Sistem manajemen armada kurir & distribusi barang real-time dengan pelacakan GPS, otomatisasi rute terbaik, dan integrasi WhatsApp gateway.',
    client: 'PT Logistik Nusantara Express',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Flutter', 'Google Maps API'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1200&auto=format&fit=crop'
    ],
    stats: [
      { label: 'Efisiensi Rute', value: '+35%' },
      { label: 'Pengiriman/Hari', value: '50.000+' }
    ]
  },
  {
    id: 'health-connect-mobile',
    title: 'Telemedicine & Clinic Booking App',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    description: 'Aplikasi konsultasi dokter online, reservasi antrean rumah sakit, serta resep digital terintegrasi BPJS & Payment Gateway.',
    client: 'Medika Utama Digital',
    technologies: ['Flutter', 'Laravel API', 'MySQL', 'Midtrans', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop'
    ],
    stats: [
      { label: 'Aktif Pengguna', value: '120.000+' },
      { label: 'Rating App Store', value: '4.8/5.0' }
    ]
  },
  {
    id: 'ai-customer-assistant',
    title: 'AI Smart Sales & Customer Bot',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    description: 'Chatbot AI cerdas berbasis LLM Gemini yang memahami produk katalog perusahaan & mampu menyelesaikan transaksi pesanan secara otomatis.',
    client: 'Retailindo Global',
    technologies: ['Python', 'Gemini AI API', 'FastAPI', 'WhatsApp Cloud API', 'Redis'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop'
    ],
    stats: [
      { label: 'Respon Otomatis', value: '94%' },
      { label: 'Hemat Biaya CS', value: '60%' }
    ]
  },
  {
    id: 'fintech-p2p-dashboard',
    title: 'Platform FinTech Investment & Dashboard',
    category: 'web',
    categoryLabel: 'Web Application',
    description: 'Portal e-wallet dan manajemen portofolio investasi saham/obligasi dengan grafik interaktif real-time dan enkripsi bank-grade.',
    client: 'Investa Capital Indonesia',
    technologies: ['React', 'Next.js 14', 'Tailwind CSS', 'WebSockets', 'Go (Golang)'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop'
    ],
    stats: [
      { label: 'Volume Transaksi', value: '$12M+' },
      { label: 'Latency Real-time', value: '<50ms' }
    ]
  },
  {
    id: 'edutech-learning-system',
    title: 'EdTech Multi-tenant LMS Platform',
    category: 'web',
    categoryLabel: 'Web Application',
    description: 'Learning Management System lengkap dengan kelas live video streaming, kuis otomatis, sertifikat digital, dan ujian berbasis AI proctoring.',
    client: 'Akademi Cerdas Indonesia',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'AWS Chime SDK', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop'
    ],
    stats: [
      { label: 'Siswa Aktif', value: '45.000+' },
      { label: 'Materi Ujian', value: '1.200+' }
    ]
  },
  {
    id: 'pos-omnichannel-retail',
    title: 'Omnichannel POS & Multi-Store Inventory',
    category: 'enterprise',
    categoryLabel: 'Enterprise System',
    description: 'Point of Sales cloud untuk jaringan franchise 200+ cabang dengan sync stok otomatis marketplace (Shopee/Tokopedia) & akuntansi.',
    client: 'Kopi & Resto Nusantara',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Docker', 'GCP'],
    image: 'https://images.unsplash.com/photo-1556742049-0a6744ad00d7?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742049-0a6744ad00d7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1200&auto=format&fit=crop'
    ],
    stats: [
      { label: 'Cabang Terhubung', value: '250+' },
      { label: 'Trans/Menit', value: '1.500+' }
    ]
  }
];
