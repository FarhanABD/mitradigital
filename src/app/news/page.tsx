import { getArticles } from '@/lib/articles';
import ArticleCard from '@/components/news/ArticleCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Berita & Update Mitra Digital',
  description: 'Baca berita terbaru, tips & trik, dan update seputar dunia teknologi dan software development dari Mitra Digital Solution.',
};

export const dynamic = 'force-dynamic'; // Prevent static generation to ensure fresh articles or we can use revalidate

export default async function NewsPage() {
  const articles = await getArticles(true); // Fetch published only

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Berita & <span className="text-brand-500">Artikel</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Dapatkan informasi terbaru seputar teknologi, web development, dan inovasi dari tim Mitra Digital Solution.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            Belum ada artikel yang dipublikasikan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
