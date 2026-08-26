'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Briefcase } from 'lucide-react';
import { partnersData, PartnerItem } from '@/data/partners';

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [partners, setPartners] = useState<PartnerItem[]>(partnersData);

  useEffect(() => {
    fetch('/api/partners')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
          setPartners(resData.data);
        }
      })
      .catch(() => {});
  }, []);

  // Duplikasi logo agar efek scrolling marquee berjalan mulus tanpa celah kosong
  const marqueeLogos = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="py-24 relative bg-slate-50 dark:bg-dark-bg transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t('Mitra Bisnis Kami')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t('Kepercayaan Dari ')}<span className="text-gradient">{t('Mitra Bisnis')}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {t('Kami bangga telah dipercaya oleh berbagai perusahaan, startup, dan institusi untuk mewujudkan solusi digital terbaik.')}
          </p>
        </div>

        {/* Moving Logo Marquee Ticker */}
        <div className="relative w-full overflow-hidden py-10 bg-slate-100/50 dark:bg-slate-950/40 rounded-3xl border border-slate-200 dark:border-slate-900">
          {/* Blur Gradasi Sisi Kiri & Kanan */}
          <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-dark-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-dark-bg to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-infinite gap-8 flex items-center">
            {marqueeLogos.map((partner, idx) => (
              <div
                key={`${partner.id}-${idx}`}
                className="h-20 w-48 shrink-0 flex items-center justify-center p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800/50 hover:border-brand-500/40 transition-all duration-300 hover:scale-105 group"
              >
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 dark:brightness-110"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
