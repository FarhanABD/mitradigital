'use client';

import { useState } from 'react';
import { servicesData } from '@/data/services';
import { ServiceItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { 
   Globe, Smartphone, Bot, Building2, Palette, Server, 
   TrendingUp, SearchCheck, CheckCircle2, ArrowRight, X, Sparkles 
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Bot,
  Building2,
  Palette,
  Server,
  TrendingUp,
  SearchCheck
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { t } = useLanguage();

  return (
    <section id="layanan" className="py-24 relative bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('Layanan Digital Lengkap')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t('Solusi Software, SEO & ')}<span className="text-gradient">{t('Digital Marketing')}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {t('Dari pembuatan Website & Mobile Apps, Bimbingan Tugas Kuliah / Skripsi, hingga Pemasaran Digital & SEO untuk Melejitkan UMKM Anda.')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.iconName] || Globe;
            return (
              <div
                key={service.id}
                className={`relative p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between group ${
                  service.popular ? 'border-brand-500/40 shadow-lg shadow-brand-500/10' : ''
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-brand-500 to-blue-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-full shadow-md">
                    {t('Paling Diminati')}
                  </span>
                )}

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500 mb-6 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {t(service.title)}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {t(service.shortDesc)}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                        <span>{t(feat)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-200/70 dark:bg-white/5 hover:bg-brand-500/20 border border-slate-300 dark:border-white/10 hover:border-brand-500/40 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>{t('Lihat Detail Spesifikasi')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal Detail Layanan */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-slate-900 dark:text-slate-100">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                {(() => {
                  const IconComp = iconMap[selectedService.iconName] || Globe;
                  return <IconComp className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t(selectedService.title)}</h3>
                <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">{t('Rekomendasi: ')}{t(selectedService.recommendedFor)}</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
              {t(selectedService.fullDesc)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-3">{t('Fitur Kunci:')}</h4>
                <ul className="space-y-2">
                  {selectedService.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t(f)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-3">{t('Deliverables & Garansi:')}</h4>
                <ul className="space-y-2">
                  {selectedService.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <span>{t(d)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/6281353401336?text=Halo%20Mitra%20Digital,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(selectedService.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-400 text-white font-bold text-sm text-center shadow-lg shadow-brand-500/25"
              >
                {t('Pesan Layanan Ini via WA')}
              </a>
              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 text-sm font-semibold"
              >
                {t('Tutup')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
