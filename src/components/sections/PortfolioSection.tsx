'use client';

import { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolio';
import { PortfolioItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Briefcase, ExternalLink, X, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

// Subcomponent Image Carousel
function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900 group/carousel">
      {/* Images track */}
      <div
        className="flex w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${title} screenshot ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Gambar sebelumnya"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover/carousel:opacity-100 transition-all z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Gambar selanjutnya"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover/carousel:opacity-100 transition-all z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-slate-950/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${currentIndex === idx
                    ? 'w-4 bg-brand-400'
                    : 'bg-white/50 hover:bg-white'
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function PortfolioSection() {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'enterprise' | 'ai'>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [projectsList, setProjectsList] = useState<PortfolioItem[]>(portfolioData);
  const { t } = useLanguage();

  // Sync data dari API /api/portfolio jika tersedia
  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
          setProjectsList(resData.data);
        }
      })
      .catch(() => { });
  }, []);

  const categories = [
    { key: 'all', label: t('Semua Projek') },
    { key: 'web', label: t('Web App') },
    { key: 'mobile', label: t('Mobile App') },
    { key: 'enterprise', label: t('Enterprise') },
    { key: 'ai', label: t('AI & Automation') },
  ];

  const filteredData = filter === 'all'
    ? projectsList
    : projectsList.filter((item) => item.category === filter);

  return (
    <section id="portofolio" className="py-24 relative bg-slate-100/70 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t('Portofolio Unggulan')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t('Hasil Karya ')}<span className="text-gradient">{t('Mitra Digital')}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {t('Beberapa hasil karya terbaik yang telah kami kerjakan untuk berbagai klien industri , personal, hingga UMKM.')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${filter === cat.key
                ? 'bg-brand-500 text-white dark:text-slate-950 font-bold shadow-lg shadow-brand-500/20'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item) => {
            const itemImages = item.images && item.images.length > 0 ? item.images : [item.image];
            return (
              <div
                key={item.id}
                className="group rounded-2xl glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Carousel Container */}
                  <div className="relative">
                    <ImageCarousel images={itemImages} title={item.title} />
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-brand-400 text-[10px] font-bold uppercase tracking-wider">
                        {t(item.categoryLabel)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {t(item.title)}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
                      {t(item.description)}
                    </p>

                    {/* Stats Badges */}
                    {item.stats && (
                      <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                        {item.stats.map((s, idx) => (
                          <div key={idx} className="text-left">
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">{t(s.label)}</div>
                            <div className="text-xs font-bold text-brand-600 dark:text-brand-400 font-mono">{t(s.value)}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.technologies.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-white/5 border border-slate-300/80 dark:border-white/10 text-slate-700 dark:text-slate-300 text-[10px] font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    onClick={() => setActiveItem(item)}
                    className="w-full py-2.5 rounded-xl bg-slate-200/70 dark:bg-white/5 hover:bg-brand-500/20 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>{t('Lihat Detail Studi Kasus')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Case Study Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto text-slate-900 dark:text-slate-100">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 z-20 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-slate-800">
              <ImageCarousel
                images={activeItem.images && activeItem.images.length > 0 ? activeItem.images : [activeItem.image]}
                title={activeItem.title}
              />
            </div>

            <div className="mb-4">
              <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
                {t(activeItem.categoryLabel)}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{t(activeItem.title)}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{t('Klien: ')}<span className="text-slate-800 dark:text-slate-200 font-semibold">{t(activeItem.client)}</span></p>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
              {t(activeItem.description)}
            </p>

            {activeItem.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6">
                {activeItem.stats.map((st, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                    <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400 font-mono mb-1">{st.value}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{t(st.label)}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-8">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">{t('Teknologi Dipergunakan:')}</h4>
              <div className="flex flex-wrap gap-2">
                {activeItem.technologies.map((tItem, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono">
                    {tItem}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/6281353401336?text=Halo%20Mitra%20Digital,%20saya%20tertarik%20membuat%20sistem%20seperti%20${encodeURIComponent(activeItem.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-400 text-white font-bold text-sm text-center shadow-lg shadow-brand-500/25"
              >
                {t('Buat Sistem Serupa untuk Bisnis Saya')}
              </a>
              <button
                onClick={() => setActiveItem(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-700"
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
