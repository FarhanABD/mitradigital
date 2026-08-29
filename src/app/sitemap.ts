import { MetadataRoute } from 'next';
import { getArticles } from '@/lib/articles';

const baseUrl = 'https://mitradigital.id';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles(true);

  const newsUrls = articles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...newsUrls,
  ];
}
