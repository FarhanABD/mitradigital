'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Newspaper, ArrowRight, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { Article } from '@/types/article';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

// Fallback articles in case database is empty
const fallbackArticles: Article[] = [
  {
    id: '1',
    title: 'Strategi Optimasi Website UMKM untuk Tingkatkan Konversi Penjualan',
    slug: 'strategi-optimasi-website-umkm',
    content: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    seoKeywords: 'umkm, website, bisnis digital',
    seoDescription: 'Pelajari bagaimana memiliki website yang cepat dan user-friendly dapat melipatgandakan omset usaha kecil dan menengah.',
    isPublished: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    updatedAt: Date.now(),
  },
  {
    id: '2',
    title: 'Panduan Lengkap Memilih Topik Skripsi dan Tugas Akhir IT Populer 2025',
    slug: 'panduan-topik-skripsi-it-2025',
    content: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    seoKeywords: 'skripsi it, bimbingan koding, mahasiswa',
    seoDescription: 'Kumpulan ide judul skripsi teknik informatika dan sistem informasi yang relevan dengan kebutuhan industri saat ini.',
    isPublished: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    updatedAt: Date.now(),
  },
  {
    id: '3',
    title: 'Mengapa Next.js dan TailwindCSS Jadi Pilihan Utama Pengembangan Web Modern?',
    slug: 'nextjs-tailwindcss-web-modern',
    content: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    seoKeywords: 'nextjs, tailwindcss, react',
    seoDescription: 'Eksplorasi keunggulan performa, SEO, dan efisiensi pengembangan aplikasi web berskala enterprise.',
    isPublished: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
    updatedAt: Date.now(),
  },
  {
    id: '4',
    title: 'Cara Meningkatkan Ranking Google ke Halaman 1 dengan SEO On-Page',
    slug: 'ranking-google-seo-on-page',
    content: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=800&q=80',
    seoKeywords: 'seo google, ranking 1, digital marketing',
    seoDescription: 'Langkah praktis optimasi konten dan struktur metadata agar website bisnis Anda mudah ditemukan calon pelanggan.',
    isPublished: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
    updatedAt: Date.now(),
  },
];

export default function NewsSection() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            setArticles(data.data);
          } else {
            setArticles(fallbackArticles);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setArticles(fallbackArticles);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [articles]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="news" className="py-24 relative bg-slate-50/50 dark:bg-dark-bg/60 border-t border-slate-200 dark:border-slate-800/60 transition-colors duration-300 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{t('Wawasan & Berita')}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {t('Artikel & Update ')}<span className="text-gradient">{t('Terbaru')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              {t('Dapatkan wawasan seputar inovasi teknologi, tips bisnis digital UMKM dan strategi SEO.')}
            </p>
          </div>

          {/* Desktop Controls & View All Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Carousel Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Artikel sebelumnya"
                className={`p-2.5 rounded-xl border transition-all duration-200 ${canScrollLeft
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand-500 hover:text-brand-500 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/40 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Artikel selanjutnya"
                className={`p-2.5 rounded-xl border transition-all duration-200 ${canScrollRight
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand-500 hover:text-brand-500 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/40 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                  }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View All Button */}
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-brand-600 dark:hover:bg-brand-400 hover:text-white dark:hover:text-slate-950 transition-all duration-300 shadow-md group"
            >
              <span>{t('Lihat Semua Berita')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-200/60 dark:bg-slate-900/60 animate-pulse border border-slate-200 dark:border-slate-800" />
            ))}
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {articles.map((article) => {
              const date = new Date(article.createdAt);
              const formattedDate = !isNaN(date.getTime())
                ? format(date, 'd MMMM yyyy', { locale: idLocale })
                : 'Terbaru';

              return (
                <div
                  key={article.id}
                  className="w-[85vw] sm:w-[360px] md:w-[380px] shrink-0 snap-start flex flex-col"
                >
                  <article className="group relative h-full flex flex-col bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                    {/* Clickable Card Overlay */}
                    <Link
                      href={`/news/${article.slug}`}
                      className="absolute inset-0 z-10"
                      aria-label={`Baca artikel: ${article.title}`}
                    />

                    {/* Thumbnail Image */}
                    <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      {article.thumbnailUrl ? (
                        <img
                          src={article.thumbnailUrl}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800">
                          <Newspaper className="w-10 h-10 opacity-40" />
                        </div>
                      )}

                      {/* Badge on Image */}
                      <div className="absolute top-3 left-3 z-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-950/70 text-white backdrop-blur-md border border-white/10">
                          <Calendar className="w-3 h-3 text-brand-400" />
                          {formattedDate}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow p-5 sm:p-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-brand-500 transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 line-clamp-3 leading-relaxed">
                        {article.seoDescription || 'Baca ulasan dan tips lengkap seputar artikel ini.'}
                      </p>

                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-brand-600 dark:text-brand-400 font-semibold text-xs uppercase tracking-wider">
                        <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
                          {t('Baca Selengkapnya')}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal lowercase">
                          {t('mitradigital.id')}
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile View All Button (visible only on small mobile screens) */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm shadow-md"
          >
            <span>{t('Lihat Semua Berita')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
