'use client';

import { ArrowRight, Sparkles, ShieldCheck, Zap, Code, Bot, GraduationCap, Store } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-hero-pattern">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300 dark:border-brand-500/30 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-lg shadow-brand-500/5">
            <Sparkles className="w-4 h-4 text-brand-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{t('Mitra Digital Solution — Partner Bisnis UMKM, Skripsi Mahasiswa & Enterprise')}</span>
            <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 text-[10px] font-bold uppercase tracking-wider">
              {t('Ramah Kantong')}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
            {t('Solusi Software, ')}<span className="text-gradient">{t('Digital Marketing & SEO')}</span>{t(' untuk Bisnis Anda')}
          </h1>

          {/* Subheadline */}
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl leading-relaxed mb-10 max-w-3xl mx-auto font-normal">
            {t('Kami siap membantu pembuatan Website & Mobile Apps ramah kantong untuk UMKM, bimbingan koding Tugas Akhir / Skripsi Mahasiswa, hingga strategi Iklan Digital & ranking Google #1.')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="https://wa.me/6287810963261?text=Halo%20Mitra%20Digital%20Solution,%20saya%20ingin%20konsultasi%20pembuatan%20software%20/%20tugas%20kuliah%20/%20digital%20marketing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-brand-500/25 flex items-center justify-center gap-3 transition-all hover:scale-105"
            >
              <span>{t('Konsultasi Gratis via WA')}</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#layanan"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel hover:bg-slate-200/50 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold text-base flex items-center justify-center gap-3 transition-all"
            >
              <Zap className="w-5 h-5 text-brand-500" />
              <span>{t('Lihat Semua Layanan')}</span>
            </a>
          </div>

          {/* Key Value Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800/80">
            <div className="p-4 rounded-2xl glass-panel text-left">
              <div className="flex items-center gap-2 text-brand-500 mb-1">
                <Store className="w-5 h-5" />
                <span className="font-bold text-slate-900 dark:text-white text-lg sm:text-2xl">{t('UMKM Ready')}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('Harga Terjangkau & Cepat')}</p>
            </div>

            <div className="p-4 rounded-2xl glass-panel text-left">
              <div className="flex items-center gap-2 text-brand-500 mb-1">
                <GraduationCap className="w-5 h-5" />
                <span className="font-bold text-slate-900 dark:text-white text-lg sm:text-2xl">{t('Tugas Akhir')}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('Bimbingan Skripsi & Code')}</p>
            </div>

            <div className="p-4 rounded-2xl glass-panel text-left">
              <div className="flex items-center gap-2 text-brand-500 mb-1">
                <Code className="w-5 h-5" />
                <span className="font-bold text-slate-900 dark:text-white text-lg sm:text-2xl">100%</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('Hak Cipta Source Code')}</p>
            </div>

            <div className="p-4 rounded-2xl glass-panel text-left">
              <div className="flex items-center gap-2 text-brand-500 mb-1">
                <Bot className="w-5 h-5" />
                <span className="font-bold text-slate-900 dark:text-white text-lg sm:text-2xl">{t('SEO & Ads')}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('Rangking Google #1')}</p>
            </div>
          </div>

        </div>


      </div>
    </section>
  );
}
