'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import { Article } from '@/types/article';
import { createArticle, updateArticle } from '@/lib/articles';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ArticleFormProps {
  initialData?: Partial<Article>;
  isEdit?: boolean;
}

export default function ArticleForm({ initialData, isEdit = false }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState<Partial<Article>>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    thumbnailUrl: initialData?.thumbnailUrl || '',
    seoKeywords: initialData?.seoKeywords || '',
    seoDescription: initialData?.seoDescription || '',
    isPublished: initialData?.isPublished ?? false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const generateSlug = () => {
    if (!formData.title) return;
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const data = new FormData();
      data.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      
      const result = await response.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, thumbnailUrl: result.url }));
      } else {
        alert(result.message || 'Gagal mengunggah gambar');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengunggah gambar');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      alert('Judul, Slug, dan Konten harus diisi!');
      return;
    }

    setLoading(true);
    try {
      if (isEdit && initialData?.id) {
        const res = await updateArticle(initialData.id, formData as Omit<Article, 'id' | 'createdAt' | 'updatedAt'>);
        if (res.success) {
          router.push('/admin/news');
          router.refresh();
        } else {
          alert('Gagal update artikel: ' + res.error);
        }
      } else {
        const res = await createArticle(formData as Omit<Article, 'id' | 'createdAt' | 'updatedAt'>);
        if (res.success) {
          router.push('/admin/news');
          router.refresh();
        } else {
          alert('Gagal membuat artikel: ' + res.error);
        }
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pt-24 pb-20 px-6 max-w-5xl mx-auto space-y-8 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/news" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isEdit ? 'Edit Artikel' : 'Buat Artikel Baru'}
          </h1>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Judul Artikel</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={!isEdit ? generateSlug : undefined}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                placeholder="Masukkan judul artikel"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Konten Artikel</label>
              <RichTextEditor 
                content={formData.content || ''} 
                onChange={(content) => setFormData(prev => ({ ...prev, content }))} 
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-semibold text-lg border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">Pengaturan Utama</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">URL Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="contoh: artikel-baru-saya"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gambar Cover</label>
              {formData.thumbnailUrl ? (
                <div className="relative mb-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.thumbnailUrl} alt="Cover" className="w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, thumbnailUrl: '' }))}
                      className="px-3 py-1.5 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Ganti Gambar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="w-full text-sm text-slate-500 dark:text-slate-400
                      file:mr-4 file:py-2.5 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-brand-50 file:text-brand-700
                      dark:file:bg-brand-900/30 dark:file:text-brand-400
                      hover:file:bg-brand-100 dark:hover:file:bg-brand-900/50
                      cursor-pointer outline-none border border-slate-200 dark:border-slate-800 rounded-lg p-1.5"
                  />
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-lg flex items-center justify-center text-sm font-semibold text-brand-600 dark:text-brand-400 z-10">
                      Sedang Mengunggah...
                    </div>
                  )}
                </div>
              )}
            </div>

            <label className="flex items-center gap-3 cursor-pointer pt-2">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${formData.isPublished ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.isPublished ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-medium">{formData.isPublished ? 'Published' : 'Draft'}</span>
            </label>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-semibold text-lg border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">Optimasi SEO</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description (Maks 160 char)</label>
              <textarea
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleChange}
                rows={3}
                maxLength={160}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                placeholder="Deskripsi singkat untuk Google..."
              />
              <div className="text-right text-xs mt-1 text-slate-500">
                {formData.seoDescription?.length || 0}/160
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Keywords (Pisahkan dengan koma)</label>
              <textarea
                name="seoKeywords"
                value={formData.seoKeywords}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                placeholder="software house, jasa website, aplikasi android..."
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
