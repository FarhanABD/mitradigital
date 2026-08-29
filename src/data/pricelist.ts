export interface ServicePackage {
  id: string;
  name: string;
  price?: string;
  period?: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  features: string[];
  deliverables: string[];
  estimateTime: string;
  waMessage: string;
}

export interface AddOnItem {
  name: string;
  description: string;
}

export interface ServicePricelistData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  heroBadge: string;
  packages: ServicePackage[];
  addons?: AddOnItem[];
  faq: { question: string; answer: string }[];
}

export const pricelistData: Record<string, ServicePricelistData> = {
  'web-dev': {
    id: 'web-dev',
    title: 'Pengembangan WebApp',
    subtitle: 'Pricelist & Paket Pembuatan WebApp Modern',
    description: 'Pilih paket pengembangan WebApp yang sesuai dengan kebutuhan bisnis UMKM, Startup, atau Perusahaan Anda. Didukung garansi 1 tahun dan optimasi penuh.',
    iconName: 'Globe',
    heroBadge: 'Pilihan Paket WebApp',
    packages: [
      {
        id: 'webapp-standart',
        name: 'WebApp Standart',
        badge: 'Standar & Optimal',
        isPopular: false,
        description: 'Solusi pembuatan WebApp standar lengkap dengan Landing Page, Database, dan optimasi dasar.',
        features: [
          'Landing Page Design & Setup',
          'Database Integration',
          'Garansi System 1 Tahun',
          'Hosting & Domain 1 Tahun',
          'Setup Google My Business',
          'Basic SEO Setup',
          'Copywriting Teks Web Professional'
        ],
        deliverables: ['Full Source Code', 'Akses Hosting & Domain 1 Tahun', 'Garansi System 1 Tahun'],
        estimateTime: '5 - 7 Hari Kerja',
        waMessage: 'Halo Mitra Digital, saya mau konsultasi & pesan Paket WebApp Standart.'
      },
      {
        id: 'webapp-premium',
        name: 'WebApp Premium',
        badge: 'Paling Populer',
        isPopular: true,
        description: 'Solusi profesional dengan Profesional Dashboard Admin, Advanced SEO, dan tracking iklan lengkap.',
        features: [
          'Landing Page Design',
          'Profesional Dashboard Admin',
          'Hosting & Domain 1 Tahun',
          'Garansi System 1 Tahun',
          'Free Semua Fitur Standar',
          'Advance SEO Setup',
          'Pemasangan Meta Pixel (FB & IG Ads)',
          'Google Analytics Integration',
          'Setup Google My Business',
          'Professional Copywriting Teks Web'
        ],
        deliverables: ['Full Source Code', 'Akses Dashboard Admin', 'Tracking & Analytics Setup', 'Garansi System 1 Tahun'],
        estimateTime: '7 - 14 Hari Kerja',
        waMessage: 'Halo Mitra Digital, saya mau konsultasi & pesan Paket WebApp Premium.'
      },
      {
        id: 'webapp-luxury',
        name: 'WebApp Luxury',
        badge: 'Full Custom & Growth',
        isPopular: false,
        description: 'Solusi WebApp skala besar dengan custom fitur, analisa kompetitor, strategi funneling, dan full tracking setup.',
        features: [
          'Custom Fitur Sesuai Kebutuhan Bisnis',
          'Hosting & Domain 1 Tahun',
          'Garansi System 1 Tahun',
          'Setup Google Analytics & Google My Business',
          'Comprehensive SEO Setup',
          'Strategic Copywriting Teks Web',
          'Brand & Competitor Analysis',
          'Funneling Strategy Setup',
          'Full Event Tracking Setup'
        ],
        deliverables: ['Full Custom Source Code', 'Strategic Competitor Report', 'Full Event Tracking Setup', 'Garansi System 1 Tahun'],
        estimateTime: '2 - 4 Minggu',
        waMessage: 'Halo Mitra Digital, saya mau konsultasi & pesan Paket WebApp Luxury.'
      }
    ],
    addons: [
      {
        name: 'Add-Ons Fitur Tambahan Custom',
        description: 'Penambahan modul atau fitur custom spesifik sesuai permintaan bisnis Anda.'
      },
      {
        name: 'Add-Ons Content Strategy & Technical SEO Roadmap',
        description: 'Perencanaan strategi konten berkala serta peta jalan (roadmap) optimasi teknikal SEO jangka panjang.'
      }
    ],
    faq: [
      {
        question: 'Apakah ada garansi sistem setelah website jadi?',
        answer: 'Ya! Setiap paket pengembangan WebApp kami sudah termasuk Garansi System selama 1 Tahun untuk memastikan sistem berjalan lancar bebas bug.'
      },
      {
        question: 'Apakah saya mendapatkan source code dan akses hosting?',
        answer: 'Tentu saja! Kami memberikan full akses source code dan akun hosting/domain yang 100% menjadi milik Anda.'
      },
      {
        question: 'Bagaimana cara menambahkan fitur tambahan (Add-Ons)?',
        answer: 'Anda dapat memilih layanan Add-Ons Fitur Tambahan Custom atau Content Strategy & Technical SEO Roadmap sesuai kebutuhan bisnis Anda saat konsultasi.'
      }
    ]
  },
  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing & Social Media',
    subtitle: 'Pricelist & Paket Promosi Digital',
    description: 'Tingkatkan brand awareness dan omzet penjualan bisnis Anda dengan strategi iklan tertarget dan pengelolaan media sosial profesional.',
    iconName: 'TrendingUp',
    heroBadge: 'Pilihan Paket Marketing & Iklan',
    packages: [
      {
        id: 'mkt-standard',
        name: 'Paket Standard',
        badge: 'Branding Dasar',
        isPopular: false,
        description: 'Dikerjakan oleh 1 all-in-one content creator atau menggunakan bantuan alat AI untuk efisiensi.',
        features: [
          'Total 9 Konten Berkualitas',
          'Dikelola oleh 1 All-in-one Content Creator',
          'Desain & Editing menggunakan Tools (Canva, CapCut, AI)',
          'Operasional & Optimasi Dasar',
          'Laporan Performa Bulanan'
        ],
        deliverables: ['Aset Konten', 'Jadwal Posting Content Planner', 'Laporan Bulanan'],
        estimateTime: 'Pengerjaan Bulanan',
        waMessage: 'Halo Mitra Digital, saya tertarik dengan Paket Standard Digital Marketing.'
      },
      {
        id: 'mkt-premium',
        name: 'Paket Premium',
        badge: 'Paling Diminati',
        isPopular: true,
        description: 'Dikelola secara profesional oleh tim kecil yang terdiri dari 1 Editor/Designer dan 1 Advertiser/Admin.',
        features: [
          'Desain Grafis & Video Editing Profesional',
          'Dikelola oleh Dedicated Designer & Video Editor',
          'Pengelolaan Iklan oleh Meta Ads Specialist',
          'Akses Tools Premium & Eksekusi Admin',
          'Laporan Analitik Iklan Mingguan & Bulanan'
        ],
        deliverables: ['Aset Video & Banner', 'Optimasi Iklan Berkala', 'Laporan Analitik Lengkap'],
        estimateTime: 'Pengerjaan Bulanan',
        waMessage: 'Halo Mitra Digital, saya mau pesan Paket Premium Digital Marketing.'
      },
      {
        id: 'mkt-luxury',
        name: 'Paket Luxury',
        badge: 'Full Scale',
        isPopular: false,
        description: 'Paket lengkap dengan volume konten tinggi dan pengelolaan iklan multi-channel oleh tim spesialis.',
        features: [
          'Volume Konten Skala Tinggi',
          'Dikelola oleh Tim Lengkap (Creator, Editor, Advertiser, Copywriter & Strategist)',
          'Pengelolaan Iklan Multi-Channel (Omnichannel)',
          'Akses Tools Premium (Analytics, Asset Stock Pro)',
          'Client Service & Operasional Eksekutif'
        ],
        deliverables: ['Aset Konten Premium', 'Manajemen Iklan Multi-Channel', 'Laporan Analytics Mendalam'],
        estimateTime: 'Pengerjaan Bulanan',
        waMessage: 'Halo Mitra Digital, saya ingin konsultasi Paket Luxury Digital Marketing.'
      }
    ],
    faq: [
      {
        question: 'Apakah harga sudah termasuk budget iklan?',
        answer: 'Harga paket di atas adalah untuk jasa manajemen, desain, riset, dan optimasi kampanye. Budget iklan disesuaikan langsung dengan kemampuan dan target bisnis Anda.'
      },
      {
        question: 'Bagaimana cara memantau hasil iklannya?',
        answer: 'Kami mengirimkan laporan mingguan & bulanan yang transparan mencakup jumlah tayangan, klik, leads/WA masuk, hingga konversi penjualan.'
      }
    ]
  },
  'mobile-dev': {
    id: 'mobile-dev',
    title: 'Pengembangan Aplikasi Mobile',
    subtitle: 'Pricelist & Paket Pembuatan Aplikasi Android & iOS',
    description: 'Solusi pengembangan aplikasi mobile Android dan iOS yang stabil, responsif, dan mudah digunakan untuk bisnis atau penyelesaian project kuliah.',
    iconName: 'Smartphone',
    heroBadge: 'Pilihan Paket Mobile App Development',
    packages: [
      {
        id: 'app-student',
        name: 'Paket Standart (Task Kuliah & Prototipe)',
        badge: 'Mahasiswa / Tugas Akhir',
        isPopular: false,
        description: 'Cocok untuk kebutuhan Tugas Akhir, Skripsi, atau Prototipe MVP Startup.',
        features: [
          'Multi Screen (Hingga 5 Tampilan Utama)',
          'Integrasi Autentikasi Login/Register & Database (Firebase/Supabase)',
          'Fitur CRUD (Create, Read, Update, Delete) Lengkap',
          'Full Source Code (Flutter / React Native)',
          'Bimbingan Alur Logic & Penjelasan Struktur Kode'
        ],
        deliverables: ['File Installer (.APK)', 'Full Source Code Project', 'Dokumentasi Modul Program', 'Garansi Maintenance 1 Bulan'],
        estimateTime: '5 - 10 Hari Kerja',
        waMessage: 'Halo Mitra Digital, saya mau pesan Paket Standart Mobile App.'
      },
      {
        id: 'app-business',
        name: 'Paket Profesional (Android & iOS)',
        badge: 'Paling Diminati',
        isPopular: true,
        description: 'Cocok untuk bisnis toko online, kasir mobile, layanan jasa, atau sistem operasional internal.',
        features: [
          'Support Multi-Platform: Android (.apk) & iOS (.ipa)',
          'Integrasi Push Notification Real-time',
          'Integrasi GPS, Kamera HP, & Payment Gateway (GoPay, QRIS, Transfer)',
          'Dashboard Admin Web untuk Kelola Konten & Transaksi App',
          'Bantuan Upload & Publish ke Google Play Store & Apple App Store'
        ],
        deliverables: ['Build APK & IPA', 'Source Code Frontend & Backend API', 'Garansi Bug 3 Bulan'],
        estimateTime: '2 - 3 Minggu',
        waMessage: 'Halo Mitra Digital, saya tertarik dengan Paket Profesional Mobile App.'
      },
      {
        id: 'app-custom',
        name: 'Paket Custom (Advanced Mobile App)',
        badge: 'Scale Up',
        isPopular: false,
        description: 'Cocok untuk aplikasi kompleks sekelas Ride-Hailing, Marketplace E-Commerce, atau Pelacakan Real-time.',
        features: [
          'High-Performance Architecture (Flutter / React Native)',
          'Real-time GPS Tracking, WebSocket Chat, & Live Audio/Video',
          'Keamanan Data Tingkat Tinggi (Encryption & Secure Storage)',
          'Server Infrastructure Cloud (GCP/AWS/VPS) Setup',
          'Fitur & Halaman Custom Sesuai SRS / Dokumen Kebutuhan'
        ],
        deliverables: ['Complete Mobile Architecture & REST API', 'Play Store & App Store Distribution', 'Maintenance SLA & Garansi 6 Bulan'],
        estimateTime: '3 - 8 Minggu',
        waMessage: 'Halo Mitra Digital, saya ingin konsultasi Paket Custom Mobile App.'
      }
    ],
    faq: [
      {
        question: 'Apakah satu kali pengerjaan langsung bisa untuk Android dan iOS?',
        answer: 'Ya! Kami menggunakan teknologi cross-platform modern (Flutter / React Native) sehingga aplikasi dapat berjalan mulus baik di Google Play Store maupun Apple App Store.'
      },
      {
        question: 'Apakah dibantu pengunggahan ke Google Play Store & App Store?',
        answer: 'Tentu saja! Kami mendampingi proses rilis hingga aplikasi Anda resmi tayang di Play Store & App Store.'
      }
    ]
  },
  'enterprise-system': {
    id: 'enterprise-system',
    title: 'Custom ERP & POS Kasir',
    subtitle: 'Pricelist & Paket Perangkat Lunak Bisnis',
    description: 'Kelola pembukuan, inventaris stok barang, manajemen karyawan, hingga kasir (POS) secara otomatis dan terintegrasi.',
    iconName: 'Building2',
    heroBadge: 'Pilihan Paket Enterprise System',
    packages: [
      {
        id: 'pos-umkm',
        name: 'Paket Smart POS Kasir UMKM',
        badge: 'Siap Pakai & Ringkas',
        isPopular: false,
        description: 'Cocok untuk Toko Retail, Cafe, Restoran, FnB, atau Laundry.',
        features: [
          'Aplikasi Penjualan Kasir (Bisa akses via Laptop, Tablet, & HP)',
          'Fitur Cetak Struk / Resi (Bluetooth & Thermal Printer)',
          'Dukungan Multi Kasir & Multi Metode Pembayaran (Cash, QRIS, Transfer)',
          'Manajemen Stok Barang & Peringatan Stok Menipis',
          'Laporan Omset Penjualan Harian, Mingguan, & Bulanan'
        ],
        deliverables: ['Support Scan Barcode & Thermal Printer Struk', 'Buku Panduan Penggunaan', 'Garansi Technical Support 2 Bulan'],
        estimateTime: '3 - 7 Hari Kerja',
        waMessage: 'Halo Mitra Digital, saya mau pesan Paket Smart POS Kasir UMKM.'
      },
      {
        id: 'system-pro',
        name: 'Paket Custom Management System & ERP',
        badge: 'Paling Diminati',
        isPopular: true,
        description: 'Cocok untuk Perusahaan Menengah, Distributor, Gudang, atau Toko Multi-Cabang.',
        features: [
          'Terintegrasi Langsung Kasir POS + Hardware Device (Barcode, Thermal Printer)',
          'Multi-Level Privilege Akses (Super Admin, Gudang, Kasir, Keuangan, Owner)',
          'Manajemen Stok Multi-Gudang & Multi-Cabang',
          'Laporan Keuangan Otomatis (Laba Rugi, Neraca, Cashflow)',
          'Ekspor Data Lengkap ke PDF & Excel dalam 1 Klik'
        ],
        deliverables: ['Full Custom ERP Source Code & Cloud Server Setup', 'Training Karyawan & Staff Kasir', 'Garansi Bug & Support 4 Bulan'],
        estimateTime: '2 - 3 Minggu',
        waMessage: 'Halo Mitra Digital, saya tertarik dengan Paket Custom Management System & ERP.'
      },
      {
        id: 'system-enterprise',
        name: 'Paket Enterprise Ecosystem Custom',
        badge: 'Full Automation',
        isPopular: false,
        description: 'Ekosistem software terpadu untuk skala besar (Toko Rantai, Pabrik, / Franchise).',
        features: [
          'Modul ERP Lengkap Disesuaikan Alur Bisnis (Custom Workflow)',
          'Integrasi POS Kasir + Scanner Barcode + Printer Struk + Timbangan Digital',
          'Integrasi API ke WhatsApp Gateway, Accounting Third-Party, & Banking',
          'Dashboard Analytics & Executive Decision Support System',
          'Arsitektur Database Terenkripsi & Backup Otomatis Harian'
        ],
        deliverables: ['Enterprise Source Code & Infrastructure Design', 'Dedicated SLA Maintenance & Support Prioritas 6 Bulan'],
        estimateTime: '4 - 8 Minggu',
        waMessage: 'Halo Mitra Digital, saya ingin konsultasi Paket Enterprise Ecosystem Custom.'
      }
    ],
    faq: [
      {
        question: 'Apakah sistem bisa disesuaikan dengan alur bisnis kami?',
        answer: 'Sangat bisa! Kami mengkhususkan diri pada pengembangan software custom yang 100% mengikuti alur kerja dan aturan bisnis perusahaan Anda.'
      },
      {
        question: 'Apakah ada pelatihan untuk staf/karyawan kami?',
        answer: 'Ya, kami menyediakan sesi pelatihan (online/offline) dan video panduan agar staf Anda dapat mengoperasikan sistem dengan lancar.'
      }
    ]
  }
};
