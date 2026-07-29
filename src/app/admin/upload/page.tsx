'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PlusCircle, Image as ImageIcon, Trash2, CheckCircle2, AlertCircle, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminUploadPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'web' as 'web' | 'mobile' | 'enterprise' | 'ai',
    categoryLabel: 'Web Application',
    description: '',
    client: '',
    technologiesStr: 'Next.js, Tailwind CSS, TypeScript, Node.js',
    image: '',
    imagesStr: '',
    liveUrl: '',
    stat1Label: 'Efisiensi',
    stat1Value: '+40%',
    stat2Label: 'Pengguna',
    stat2Value: '10.000+',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCategoryChange = (cat: 'web' | 'mobile' | 'enterprise' | 'ai') => {
    const labelsMap: Record<string, string> = {
      web: 'Web Application',
      mobile: 'Mobile Apps',
      enterprise: 'Enterprise ERP',
      ai: 'Artificial Intelligence',
    };
    setFormData((prev) => ({
      ...prev,
      category: cat,
      categoryLabel: labelsMap[cat],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      // Parse technologies
      const technologies = formData.technologiesStr
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      // Parse images
      const extraImages = formData.imagesStr
        .split('\n')
        .map((url) => url.trim())
        .filter(Boolean);

      const images = [formData.image, ...extraImages];

      // Parse stats
      const stats = [];
      if (formData.stat1Label && formData.stat1Value) {
        stats.push({ label: formData.stat1Label, value: formData.stat1Value });
      }
      if (formData.stat2Label && formData.stat2Value) {
        stats.push({ label: formData.stat2Label, value: formData.stat2Value });
      }

      const payload = {
        title: formData.title,
        category: formData.category,
        categoryLabel: formData.categoryLabel,
        description: formData.description,
        client: formData.client,
        technologies,
        image: formData.image,
        images,
        stats,
        liveUrl: formData.liveUrl || undefined,
      };

      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: '🎉 Projek portofolio berhasil disimpan ke database!',
        });
        // Reset form ringkas
        setFormData((prev) => ({
          ...prev,
          title: '',
          description: '',
          client: '',
          image: '',
          imagesStr: '',
          liveUrl: '',
        }));
      } else {
        const errorText = data.errors
          ? data.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ')
          : data.message || 'Gagal menyimpan projek';
        setStatusMessage({ type: 'error', text: errorText });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Terjadi kesalahan koneksi. Pastikan database PostgreSQL di Vercel sudah terhubung.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-500 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Upload Projek <span className="text-gradient">Portofolio Baru</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Tambahkan hasil karya terbaik Mitra Digital Solution langsung ke database secara dinamis.
              </p>
            </div>
          </div>

          <hr className="my-6 border-slate-200 dark:border-slate-800" />

          {/* Status Alert */}
          {statusMessage && (
            <div
              className={`p-4 rounded-2xl mb-8 flex items-start gap-3 border ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <span className="text-sm font-medium">{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul & Klien */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Nama / Judul Projek *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Smart Fleet & Delivery SaaS"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Nama Klien / Perusahaan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT Logistik Nusantara"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Kategori Projek *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'web', label: 'Web Application' },
                  { key: 'mobile', label: 'Mobile Apps' },
                  { key: 'enterprise', label: 'Enterprise ERP' },
                  { key: 'ai', label: 'AI Solution' },
                ].map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => handleCategoryChange(c.key as any)}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      formData.category === c.key
                        ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-400'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Deskripsi Singkat Projek *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Jelaskan fitur utama, solusi yang diberikan, dan hasil akhir untuk klien..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Gambar Utama & Multi-Images */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  URL Gambar Utama (Cover Thumbnail) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Tips: Anda bisa menggunakan URL Unsplash, Cloudinary, Imgur, atau file static publik.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  URL Gambar Tambahan untuk Carousel (1 URL per baris)
                </label>
                <textarea
                  rows={3}
                  placeholder="https://images.unsplash.com/photo-1&#10;https://images.unsplash.com/photo-2"
                  value={formData.imagesStr}
                  onChange={(e) => setFormData({ ...formData, imagesStr: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-brand-500 font-mono text-xs"
                />
              </div>
            </div>

            {/* Teknologi (Pisahkan Koma) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Teknologi yang Digunakan (Pisahkan dengan koma) *
              </label>
              <input
                type="text"
                required
                placeholder="Next.js, React, Tailwind CSS, PostgreSQL, Flutter"
                value={formData.technologiesStr}
                onChange={(e) => setFormData({ ...formData, technologiesStr: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-brand-500 font-mono"
              />
            </div>

            {/* Statistics / Impact Badges */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Statistik Hasil Projek (Opsional)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Label 1 (Misal: Efisiensi Rute)"
                    value={formData.stat1Label}
                    onChange={(e) => setFormData({ ...formData, stat1Label: e.target.value })}
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Nilai 1 (Misal: +35%)"
                    value={formData.stat1Value}
                    onChange={(e) => setFormData({ ...formData, stat1Value: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold text-brand-500 font-mono"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Label 2 (Misal: Pengguna Aktif)"
                    value={formData.stat2Label}
                    onChange={(e) => setFormData({ ...formData, stat2Label: e.target.value })}
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Nilai 2 (Misal: 50.000+)"
                    value={formData.stat2Value}
                    onChange={(e) => setFormData({ ...formData, stat2Value: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold text-brand-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Live URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                URL Demo / Website Live (Opsional)
              </label>
              <input
                type="url"
                placeholder="https://client-website.com"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-400 text-white font-bold text-sm shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Menyimpan ke Database...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Simpan & Terbitkan Projek Baru</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
