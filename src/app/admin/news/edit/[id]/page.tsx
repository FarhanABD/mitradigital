import ArticleForm from '@/components/news/ArticleForm';
import { getArticleById } from '@/lib/articles';
import { notFound } from 'next/navigation';

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  return <ArticleForm initialData={article} isEdit={true} />;
}
