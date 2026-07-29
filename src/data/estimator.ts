import { EstimatorCategory } from '@/types';

export const estimatorCategories: EstimatorCategory[] = [
  {
    id: 'projectType',
    title: '1. Pilih Tipe Proyek Utama',
    options: [
      { id: 'company_landing', name: 'Landing Page & Company Profile', price: 4500000, durationDays: 7, description: 'Website modern, responsif, cepat, & teroptimasi SEO.' },
      { id: 'web_app', name: 'Web Application / SaaS Portal', price: 12500000, durationDays: 21, description: 'Portal sistem web interaktif dengan akun & database.' },
      { id: 'mobile_app', name: 'Mobile App (iOS & Android)', price: 18000000, durationDays: 30, description: 'Aplikasi mobile Flutter/React Native di Play Store & App Store.' },
      { id: 'enterprise_erp', name: 'Enterprise ERP / CRM System', price: 28000000, durationDays: 45, description: 'Sistem manajemen operasional bisnis skala besar & cabang.' },
      { id: 'ai_integration', name: 'AI & Automasi Bot Custom', price: 9500000, durationDays: 14, description: 'Integrasi LLM Gemini AI, Chatbot WA, & automasi data.' }
    ]
  },
  {
    id: 'platforms',
    title: '2. Target Platform & Lingkungan',
    options: [
      { id: 'plat_web', name: 'Web Only (Desktop & Mobile Responsive)', price: 0, durationDays: 0, description: 'Optimasi antarmuka peramban modern.' },
      { id: 'plat_cross_mobile', name: 'Web + Mobile Apps (iOS & Android)', price: 7500000, durationDays: 10, description: 'Dukungan ekosistem lengkap Web & HP.' },
      { id: 'plat_cloud_k8s', name: 'High-Availability Cloud & Microservices', price: 5000000, durationDays: 5, description: 'Autoscaling server, Docker, & failover.' }
    ]
  },
  {
    id: 'addons',
    title: '3. Fitur Tambahan (Opsional)',
    options: [
      { id: 'feat_payment', name: 'Integrasi Payment Gateway', price: 2000000, durationDays: 2, description: 'Midtrans, Xendit, QRIS, & VA Bank.' },
      { id: 'feat_wa_bot', name: 'WhatsApp Notification & Gateway', price: 1500000, durationDays: 2, description: 'Kirim OTP, struk, & notifikasi transaksi otomatis.' },
      { id: 'feat_multilang', name: 'Multi-language (Bahasa & English)', price: 1200000, durationDays: 2, description: 'Dukungan bahasa ganda.' },
      { id: 'feat_analytics', name: 'Advanced Dashboard & Export PDF/Excel', price: 2500000, durationDays: 3, description: 'Laporan keuangan, grafik analytics, & cetak dokumen.' },
      { id: 'feat_priority_support', name: 'Priority Support & SLA 24/7 (1 Tahun)', price: 4000000, durationDays: 0, description: 'Dukungan insinyur siaga 24 jam & garansi diperpanjang.' }
    ]
  }
];
