'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
   Zap, ShieldCheck, Cpu, Search, Sparkles, Scale,
   Clock, CheckCircle2, ArrowRight
} from 'lucide-react';

const valueProps = [
  {
    id: 'performance',
    tabName: '⚡ Kecepatan & Performa',
    badge: 'Performa Unggulan',
    title: 'Aplikasi Super Cepat & Tanpa Lemot',
    subtitle: 'Pengunjung tidak suka menunggu. Kami memastikan sistem Anda dimuat dalam hitungan milidetik.',
    icon: Zap,
    benefits: [
      { title: 'Load Time Kilat', desc: 'Halaman terbuka kurang dari 2 detik untuk pengalaman pengunjung terbaik.' },
      { title: 'Bebas Hambatan (Zero Lag)', desc: 'Navigasi antarmuka yang mulus tanpa delay saat digunakan.' },
      { title: 'Hemat Kuota & Ringan', desc: 'Optimasi aset digital agar aplikasi ringan diakses dari jaringan mana saja.' }
    ],
    highlightStat: '99.9%',
    highlightLabel: 'Uptime & Akses Cepat'
  },
  {
    id: 'security',
    tabName: '🛡️ Keamanan Data',
    badge: 'Proteksi Maksimal',
    title: 'Sistem Aman & Terlindungi dari Peretas',
    subtitle: 'Keamanan data bisnis dan privasi pengguna Anda adalah prioritas utama yang kami proteksi.',
    icon: ShieldCheck,
    benefits: [
      { title: 'Enkripsi Data Standar Industri', desc: 'Informasi sensitif dan data transaksi Anda dienkripsi secara aman.' },
      { title: 'Perlindungan dari Serangan Cyber', desc: 'Dilengkapi proteksi dari malware, leak data, dan akses ilegal.' },
      { title: 'Backup Otomatis Berkala', desc: 'Data Anda selalu memiliki cadangan aman sehingga tidak perlu khawatir hilang.' }
    ],
    highlightStat: '100%',
    highlightLabel: 'Enkripsi Standar Aman'
  },
  {
    id: 'scalability',
    tabName: '📈 Siap Berkembang',
    badge: 'Investasi Jangka Panjang',
    title: 'Siap Menampung Ribuan Pengguna',
    subtitle: 'Sistem dirancang modular sehingga siap dibesarkan kapan saja seiring bertumbuhnya bisnis Anda.',
    icon: Scale,
    benefits: [
      { title: 'Kapasitas Tanpa Batas', desc: 'Aplikasi tetap stabil meski diakses ribuan pengguna bersamaan.' },
      { title: 'Mudah Ditambah Fitur Baru', desc: 'Arsitektur rapi memudahkan penambahan fitur bisnis di masa depan.' },
      { title: 'Bebas Biaya Perbaikan Ulang', desc: 'Tidak perlu merombak ulang sistem dari awal saat bisnis berkembang pesat.' }
    ],
    highlightStat: '10x',
    highlightLabel: 'Kapasitas Skalabilitas'
  },
  {
    id: 'seo',
    tabName: '🎯 SEO & Kemudahan Ditemukan',
    badge: 'Pemasaran Digital',
    title: 'Mudah Ditemukan di Google',
    subtitle: 'Struktur web dirancang ramah mesin pencari untuk membantu meningkatkan calon pelanggan Anda.',
    icon: Search,
    benefits: [
      { title: 'Struktur SEO-Friendly', desc: 'Memudahkan mesin pencari Google mengenali dan melirik bisnis Anda.' },
      { title: 'Tampilan Mobile Sempurna', desc: 'Tampilan menyesuaikan secara otomatis di layar HP, Tablet, dan Komputer.' },
      { title: 'Siap Integrasi Meta & Google Ads', desc: 'Mudah dihubungkan dengan piksel iklan untuk kampanye pemasaran.' }
    ],
    highlightStat: 'Top #1',
    highlightLabel: 'Struktur Ramah Google'
  },
  {
    id: 'ai-smart',
    tabName: '🤖 Otomasi & Fitur Pintar',
    badge: 'Inovasi AI',
    title: 'Efisiensi Operasional dengan AI',
    subtitle: 'Hemat waktu dan biaya operasional dengan otomasi tugas berulang serta integrasi teknologi kecerdasan buatan.',
    icon: Sparkles,
    benefits: [
      { title: 'Chatbot & Layanan 24/7', desc: 'Melayani pertanyaan pelanggan secara otomatis tanpa henti.' },
      { title: 'Otomasi Pekerjaan Rutin', desc: 'Memangkas proses manual agar tim Anda bisa fokus pada strategi bisnis.' },
      { title: 'Analisis Data Otomatis', desc: 'Dapatkan laporan dan rangkuman data bisnis secara instan.' }
    ],
    highlightStat: '24/7',
    highlightLabel: 'Otomasi Bisnis Aktif'
  }
];

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useLanguage();
  const currentProp = valueProps[activeTab];
  const IconComponent = currentProp.icon;

  return (
    <section id="techstack" className="py-24 relative bg-slate-100/70 dark:bg-slate-950/60 border-y border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t('Standar Kualitas Kami')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t('Jaminan Hasil & ')}<span className="text-gradient">{t('Kualitas Terbaik')}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {t('Anda fokus pada pertumbuhan bisnis, kami pastikan sistem aplikasi Anda dibangun dengan standar kualitas tertinggi yang aman, cepat, dan handal.')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {valueProps.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === idx
                  ? 'bg-gradient-to-r from-brand-500 to-blue-600 text-white shadow-lg shadow-brand-500/25 scale-105'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t(item.tabName)}
            </button>
          ))}
        </div>

        {/* Highlighted Feature Box */}
        <div className="max-w-5xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-4">
                <span>{t(currentProp.badge)}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                {t(currentProp.title)}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-8">
                {t(currentProp.subtitle)}
              </p>

              {/* Benefits List */}
              <div className="space-y-4">
                {currentProp.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {t(b.title)}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {t(b.desc)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card / Visual Stat */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-brand-500/10 via-blue-500/5 to-transparent border border-brand-500/20 text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/30 mb-4">
                <IconComponent className="w-8 h-8" />
              </div>
              <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                {currentProp.highlightStat}
              </span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {t(currentProp.highlightLabel)}
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
