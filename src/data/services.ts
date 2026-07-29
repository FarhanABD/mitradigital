import { ServiceItem } from '@/types';

export const servicesData: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Pengembangan Web & WebApp',
    shortDesc: 'Website modern, responsif, & cepat untuk UMKM, Startup, hingga Tugas Akhir & Skripsi Mahasiswa.',
    fullDesc: 'Kami membangun website Landing Page, Web Portal, hingga Sistem Tugas Akhir / Skripsi Mahasiswa & Aplikasi UMKM dengan Next.js / React modern, lengkap dengan bimbingan dan dokumentasi.',
    iconName: 'Globe',
    popular: true,
    features: [
      'Next.js 14 & React Responsive',
      'Desain UI/UX Custom & Fast Loading',
      'Bimbingan Koding & Dokumentasi Sistem',
      'Optimasi SEO On-Page & Performance 95+'
    ],
    deliverables: ['Full Source Code GitHub', 'Dokumentasi & Penjelasan Sistem', 'Deployment Gratis', 'Garansi Revision & Bug Free'],
    recommendedFor: 'UMKM Naik Kelas, Mahasiswa / Tugas Kuliah, Startup & Perusahaan'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Social Media',
    shortDesc: 'Strategi pemasaran digital, Google Ads, Meta Ads (FB & IG), serta manajemen konten sosmed untuk dongkrak omzet.',
    fullDesc: 'Tingkatkan penjualan UMKM & brand bisnis Anda melalui kampanye iklan terukur (Google Ads, TikTok Ads, Meta Ads) dan manajemen konten media sosial profesional.',
    iconName: 'TrendingUp',
    popular: true,
    features: [
      'Manajemen Iklan Meta (FB & IG Ads) & Google Ads',
      'Riset Target Audiens & High-Converting Copywriting',
      'Desain Konten & Video Reels / TikTok Marketing',
      'Laporan Analytics ROI & Optimasi Konversi'
    ],
    deliverables: ['Laporan Kampanye Mingguan', 'Aset Desain & Copywriting', 'Optimasi Target Audiens'],
    recommendedFor: 'Pemilik Bisnis UMKM, Online Shop, Brand Lokal & Jasa'
  },
  {
    id: 'seo-optimization',
    title: 'SEO (Search Engine Optimization)',
    shortDesc: 'Optimasi Google Search agar website bisnis atau UMKM Anda muncul di halaman #1 Google secara organik.',
    fullDesc: 'Layanan SEO lengkap dari Technical SEO, On-Page Optimization, hingga strategi Link Building untuk mendatangkan ribuan pengunjung potensial setiap hari tanpa biaya iklan.',
    iconName: 'SearchCheck',
    popular: true,
    features: [
      'Audit Technical SEO & Speed Optimization',
      'Riset Keyword Berdaya Beli Tinggi (Commercial Intent)',
      'Optimasi Konten & Meta Tags',
      'Google My Business / Local SEO UMKM'
    ],
    deliverables: ['Laporan Ranking Google', 'Dokumen Strategi Keyword', 'Optimasi Kecepatan Web'],
    recommendedFor: 'UMKM, Jasa Profesional, Portal Berita, & E-Commerce'
  },
  {
    id: 'mobile-dev',
    title: 'Pengembangan Aplikasi Mobile',
    shortDesc: 'Aplikasi Android & iOS Flutter/React Native untuk bisnis UMKM maupun Project Kuliah/Tugas Akhir.',
    fullDesc: 'Solusi pembuatan aplikasi mobile Android & iOS. Sangat cocok untuk sistem operasional UMKM maupun mahasiswa yang membutuhkan pengerjaan aplikasi mobile untuk tugas akhir/skripsi.',
    iconName: 'Smartphone',
    popular: false,
    features: [
      'Cross-Platform (iOS & Android)',
      'Push Notification & Realtime Database',
      'Integrasi GPS, Kamera, & Payment Gateway',
      'Bimbingan & Pemaparan Alur Aplikasi'
    ],
    deliverables: ['Build APK & IPA', 'Publishing Store / File Installer', 'Source Code Full'],
    recommendedFor: 'Bisnis UMKM, Retail, & Tugas Akhir / Skripsi Mahasiswa'
  },
  {
    id: 'ai-ml',
    title: 'Integrasi AI & Automasi Bot',
    shortDesc: 'Integrasi OpenAI/Gemini AI, WhatsApp CS Bot 24/7, serta automasi tugas berulang.',
    fullDesc: 'Automasi bisnis Anda dengan Chatbot WhatsApp cerdas, automasi dokumen, dan integrasi AI Gemini/GPT-4 untuk melayani pelanggan secara instan 24 jam.',
    iconName: 'Bot',
    popular: false,
    features: [
      'Custom AI Chatbot (WhatsApp & Web)',
      'Automasi Pemrosesan Dokumen',
      'Integrasi Gemini AI & OpenAI GPT-4',
      'Bot Jawab Otomatis 24/7'
    ],
    deliverables: ['AI Integration Engine', 'Dashboard Admin', 'Panduan Penggunaan'],
    recommendedFor: 'UMKM High-Traffic CS, E-Commerce, & Startup'
  },
  {
    id: 'enterprise-system',
    title: 'Custom ERP, POS Kasir & Sistem Informasi',
    shortDesc: 'Sistem Kasir POS, Inventori UMKM, CRM, atau Sistem Informasi Tugas Akhir.',
    fullDesc: 'Sistem manajemen bisnis & informasi yang ramah kantong untuk UMKM dan mahasiswa, dari Aplikasi Kasir POS, Gudang, hingga Portal Manajemen Internal.',
    iconName: 'Building2',
    popular: false,
    features: [
      'Multi-user Role & Akses Kasir/Admin',
      'Laporan Penjualan & Stok Realtime',
      'Cetak Struk & Export Excel/PDF',
      'Ramah Kantong UMKM & Mahasiswa'
    ],
    deliverables: ['Source Code Full', 'Dokumentasi Sistem', 'Garansi Bug Free'],
    recommendedFor: 'Toko UMKM, Resto/Kafe, & Tugas Akhir Kuliah'
  }
];
