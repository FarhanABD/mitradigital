import Link from 'next/link';
import { Article } from '@/types/article';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function ArticleCard({ article }: { article: Article }) {
  // Parsing date since it could be timestamp in ms
  const date = new Date(article.createdAt);

  return (
    <article className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/news/${article.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Baca artikel: {article.title}</span>
      </Link>
      
      {/* Thumbnail */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
        {article.thumbnailUrl ? (
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={date.toISOString()}>
            {format(date, 'd MMMM yyyy', { locale: id })}
          </time>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-brand-500 transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
          {article.seoDescription}
        </p>

        <div className="mt-auto flex items-center text-brand-600 dark:text-brand-400 font-medium text-sm gap-1 group-hover:gap-2 transition-all">
          Baca Selengkapnya
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
}
