'use client';

import { useState, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  PlusCircle,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Loader2,
  Sparkles,
  UploadCloud,
  X,
  Link as LinkIcon,
  Briefcase,
  Layers,
} from 'lucide-react';
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

  const [mainInputMode, setMainInputMode] = useState<'file' | 'url'>('file');
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

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

  // Kompresi otomatis gambar agar muat di database (maksimal 1200px, kualitas 80% WebP)
  const compressImage = async (file: File): Promise<File> => {
    if (file.size < 200 * 1024 || !file.type.startsWith('image/')) {
      return file;
    }
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1200;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                type: 'image/webp',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/webp',
          0.8
        );
      };

      img.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  // Upload file dari komputer ke backend API /api/upload
  const handleMainFileUpload = async (file: File) => {
    setUploadingMain(true);
    setStatusMessage(null);
    try {
      const processedFile = await compressImage(file);
      const data = new FormData();
      data.append('file', processedFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setFormData((prev) => ({ ...prev, image: result.url }));
        setStatusMessage({
          type: 'success',
          text: '✅ Gambar utama berhasil diunggah dan dioptimasi dari komputer!',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: result.message || 'Gagal mengunggah gambar.',
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Gagal mengunggah file. Pastikan ukuran file tidak melebihi 5MB.',
      });
    } finally {
      setUploadingMain(false);
    }
  };

  // Upload gambar galeri dari komputer
  const handleGalleryFileUpload = async (files: FileList) => {
    setUploadingGallery(true);
    setStatusMessage(null);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = await compressImage(files[i]);
        const data = new FormData();
        data.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });

        const result = await res.json();
        if (res.ok && result.success) {
          uploadedUrls.push(result.url);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => {
          const currentList = prev.imagesStr
            .split('\n')
            .map((u) => u.trim())
            .filter(Boolean);
          const newList = [...currentList, ...uploadedUrls].join('\n');
          return { ...prev, imagesStr: newList };
        });
        setStatusMessage({
          type: 'success',
          text: `✅ ${uploadedUrls.length} gambar tambahan berhasil diunggah!`,
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Terjadi kesalahan saat mengunggah gambar galeri.',
      });
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    if (!formData.image) {
      setStatusMessage({
        type: 'error',
        text: 'Gambar utama wajib diunggah atau diisi!',
      });
      setLoading(false);
      return;
    }

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
        // Reset form
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
        text: 'Terjadi kesalahan koneksi saat menyimpan projek.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-500 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Dashboard Navigation Tabs */}
        <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-8">
          <Link
            href="/admin/upload"
            className="pb-4 px-2 text-sm font-bold text-brand-500 flex items-center gap-2 transition-colors border-b-2 border-brand-500"
          >
            <Layers className="w-4 h-4" />
            <span>Upload Portofolio</span>
          </Link>
          <Link
            href="/admin/upload-logo"
            className="pb-4 px-2 text-sm font-semibold text-slate-500 hover:text-brand-500 flex items-center gap-2 transition-colors border-b-2 border-transparent"
          >
            <Briefcase className="w-4 h-4" />
            <span>Upload Logo Mitra</span>
          </Link>
        </div>

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
                Unggah file gambar dari komputer Anda dan tambahkan karya terbaik Mitra Digital Solution.
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

            {/* Gambar Utama (Upload Lokal vs Link) */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Gambar Utama (Cover) *
                </label>

                {/* Mode Selector */}
                <div className="flex gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setMainInputMode('file')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      mainInputMode === 'file'
                        ? 'bg-white dark:bg-slate-900 text-brand-500 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMainInputMode('url')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      mainInputMode === 'url'
                        ? 'bg-white dark:bg-slate-900 text-brand-500 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>URL Web</span>
                  </button>
                </div>
              </div>

              {mainInputMode === 'file' ? (
                <div>
                  <input
                    type="file"
                    ref={mainFileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleMainFileUpload(e.target.files[0]);
                      }
                    }}
                  />

                  {formData.image ? (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group">
                      <img
                        src={formData.image}
                        alt="Preview Main"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => mainFileInputRef.current?.click()}
                          className="px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-bold shadow-lg hover:bg-slate-100"
                        >
                          Ganti Gambar
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={uploadingMain}
                      onClick={() => mainFileInputRef.current?.click()}
                      className="w-full py-8 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 rounded-xl flex flex-col items-center justify-center gap-2 bg-white/50 dark:bg-slate-900/50 transition-colors group cursor-pointer"
                    >
                      {uploadingMain ? (
                        <>
                          <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                            Mengunggah foto dari komputer...
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="p-3 rounded-full bg-brand-500/10 text-brand-500 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Klik untuk memilih file gambar dari komputer Anda
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Format yang didukung: PNG, JPG, WEBP, GIF (Maks. 5MB)
                          </span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="Tempel URL gambar (https://...)"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-brand-500"
                  />
                  {formData.image && (
                    <div className="mt-3">
                      <img
                        src={formData.image}
                        alt="Preview URL"
                        className="w-full h-32 object-cover rounded-xl border border-slate-200 dark:border-slate-800"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Gambar Galeri Tambahan (Upload Lokal) */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Gambar Galeri Tambahan (Opsional)
              </label>

              <input
                type="file"
                multiple
                ref={galleryFileInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleGalleryFileUpload(e.target.files);
                  }
                }}
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={uploadingGallery}
                  onClick={() => galleryFileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-brand-500 hover:text-white text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {uploadingGallery ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UploadCloud className="w-4 h-4" />
                  )}
                  <span>Pilih File Gambar dari Komputer</span>
                </button>
              </div>

              <textarea
                rows={3}
                placeholder="Daftar URL gambar (1 baris per URL)..."
                value={formData.imagesStr}
                onChange={(e) => setFormData({ ...formData, imagesStr: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-mono focus:outline-none focus:border-brand-500"
              />
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
                disabled={loading || uploadingMain || uploadingGallery}
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
