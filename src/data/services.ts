import { ServiceItem } from '@/types';

export const servicesData: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Pengembangan WebApp',
    shortDesc: 'Bikin website modern yang cepat, tampil rapi di HP, dan siap pakai. Cocok untuk menaikkan citra bisnis UMKM/Startup, hingga kebutuhan tugas akhir & skripsi.',
    fullDesc: 'Kami membangun website Landing Page, Web Portal, hingga Sistem Tugas Akhir / Skripsi Mahasiswa & Aplikasi UMKM dengan Next.js / React modern, lengkap dengan bimbingan dan dokumentasi.',
    iconName: 'Globe',
    popular: true,
    features: [
      'Teknologi modern (Next.js & React), loading super cepat',
      'Tampilan custom menarik & nyaman digunakan (UI/UX)',
      'Siap pakai + dibimbing sampai paham (khusus skripsi)',
      'Sudah dioptimasi SEO dasar agar mudah dicari di Google'
    ],
    deliverables: ['Full Source Code GitHub', 'Dokumentasi & Penjelasan Sistem', 'Deployment Gratis', 'Garansi Revision & Bug Free'],
    recommendedFor: 'UMKM Naik Kelas, Mahasiswa / Tugas Kuliah, Startup & Perusahaan'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Social Media',
    shortDesc: 'Dongkrak penjualan dan jangkau lebih banyak pembeli lewat iklan tertarget serta pengelolaan konten media sosial yang rapi dan profesional.',
    fullDesc: 'Tingkatkan penjualan UMKM & brand bisnis Anda melalui kampanye iklan terukur (Google Ads, TikTok Ads, Meta Ads) dan manajemen konten media sosial profesional.',
    iconName: 'TrendingUp',
    popular: true,
    features: [
      'Setting & optimasi iklan Google Ads, Meta (FB & IG Ads)',
      'Riset target pasar & penulisan teks penawaran (copywriting)',
      'Pembuatan desain konten visual & video Reels/TikTok',
      'Laporan performa & analisis hasil penjualan berkala'
    ],
    deliverables: ['Laporan Kampanye Mingguan', 'Aset Desain & Copywriting', 'Optimasi Target Audiens'],
    recommendedFor: 'Pemilik Bisnis UMKM, Online Shop, Brand Lokal & Jasa'
  },
  {
    id: 'mobile-dev',
    title: 'Pengembangan Aplikasi Mobile',
    shortDesc: 'Buat aplikasi Android dan iOS yang ringan, mudah digunakan, dan kaya fitur untuk mendukung operasional bisnis Anda atau penyelesaian project kuliah.',
    fullDesc: 'Solusi pembuatan aplikasi mobile Android & iOS. Sangat cocok untuk sistem operasional UMKM maupun mahasiswa yang membutuhkan pengerjaan aplikasi mobile untuk tugas akhir/skripsi.',
    iconName: 'Smartphone',
    popular: false,
    features: [
      'Satu aplikasi langsung bisa untuk Android & iOS',
      'Fitur notifikasi otomatis & database real-time',
      'Integrasi GPS, kamera HP, dan sistem pembayaran (Payment Gateway)',
      'Pendampingan alur sistem dari awal sampai siap rilis'
    ],
    deliverables: ['Build APK & IPA', 'Publishing Store / File Installer', 'Source Code Full'],
    recommendedFor: 'Bisnis UMKM, Retail, & Tugas Akhir / Skripsi Mahasiswa'
  },
  {
    id: 'enterprise-system',
    title: 'Custom ERP, POS Kasir & Sistem Informasi',
    shortDesc: 'Kelola pembukuan, stok barang, hingga laporan penjualan dengan sistem kasir (POS) dan perangkat lunak bisnis yang dibuat sesuai kebutuhan Anda.',
    fullDesc: 'Sistem manajemen bisnis & informasi yang ramah kantong untuk UMKM dan mahasiswa, dari Aplikasi Kasir POS, Gudang, hingga Portal Manajemen Internal.',
    iconName: 'Building2',
    popular: false,
    features: [
      'Akses berlapang (Admin, Kasir, Owner) dalam satu sistem',
      'Pantau stok barang & laporan keuangan secara real-time',
      'Cetak struk otomatis & ekspor data ke Excel/PDF',
      'Solusi fleksibel dan ramah kantong untuk UMKM maupun kebutuhan Tugas Akhir'
    ],
    deliverables: ['Source Code Full', 'Dokumentasi Sistem', 'Garansi Bug Free'],
    recommendedFor: 'Toko UMKM, Resto/Kafe, & Tugas Akhir Kuliah'
  }
];
