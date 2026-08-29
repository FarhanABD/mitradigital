import { getArticleBySlug } from '@/lib/articles';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

interface Props {
  params: { slug: string };
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  return {
    title: `${article.title} | Mitra Digital Solution`,
    description: article.seoDescription,
    keywords: article.seoKeywords,
    openGraph: {
      title: article.title,
      description: article.seoDescription,
      type: 'article',
      publishedTime: new Date(article.createdAt).toISOString(),
      modifiedTime: new Date(article.updatedAt).toISOString(),
      images: article.thumbnailUrl ? [article.thumbnailUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.seoDescription,
      images: article.thumbnailUrl ? [article.thumbnailUrl] : [],
    }
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const date = new Date(article.createdAt);

  // Structured Data / JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: article.thumbnailUrl ? [article.thumbnailUrl] : [],
    datePublished: date.toISOString(),
    dateModified: new Date(article.updatedAt).toISOString(),
    author: [{
      '@type': 'Organization',
      name: 'Mitra Digital Solution',
      url: 'https://mitradigital.id'
    }],
    description: article.seoDescription,
  };

  return (
    <article className="pt-24 pb-20 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/news" 
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Berita
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={date.toISOString()}>
              {format(date, 'EEEE, d MMMM yyyy', { locale: localeId })}
            </time>
            <span className="mx-2">•</span>
            <span>Mitra Digital Solution</span>
          </div>
        </header>

        {article.thumbnailUrl && (
          <div className="w-full h-64 sm:h-80 md:h-[400px] mb-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img 
              src={article.thumbnailUrl} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg dark:prose-invert prose-brand max-w-none prose-img:rounded-xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
  );
}
