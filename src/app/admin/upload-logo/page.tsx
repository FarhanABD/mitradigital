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
  Layers
} from 'lucide-react';
import Link from 'next/link';

export default function AdminUploadLogoPage() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });

  const [mainInputMode, setMainInputMode] = useState<'file' | 'url'>('file');
  const [uploadingMain, setUploadingMain] = useState(false);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const mainFileInputRef = useRef<HTMLInputElement>(null);

  // Kompresi otomatis gambar agar muat di database/storage (maksimal 800px, kualitas 80% WebP)
  const compressImage = async (file: File): Promise<File> => {
    if (file.size < 100 * 1024 || !file.type.startsWith('image/')) {
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
        const maxDim = 800;

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
          text: '✅ Logo partner berhasil diunggah dan dioptimasi!',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: result.message || 'Gagal mengunggah logo.',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    if (!formData.name.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Nama partner/perusahaan wajib diisi!',
      });
      setLoading(false);
      return;
    }

    if (!formData.image) {
      setStatusMessage({
        type: 'error',
        text: 'Logo partner wajib diunggah atau diisi!',
      });
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        image: formData.image,
      };

      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: '🎉 Logo partner berhasil disimpan ke database!',
        });
        // Reset form
        setFormData({
          name: '',
          image: '',
        });
      } else {
        const errorText = data.errors
          ? data.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ')
          : data.message || 'Gagal menyimpan logo partner';
        setStatusMessage({ type: 'error', text: errorText });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Terjadi kesalahan koneksi saat menyimpan logo partner.',
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

        {/* Dashboard Navigation Tabs */}
        <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-8">
          <Link
            href="/admin/upload"
            className="pb-4 px-2 text-sm font-semibold text-slate-500 hover:text-brand-500 flex items-center gap-2 transition-colors border-b-2 border-transparent"
          >
            <Layers className="w-4 h-4" />
            <span>Upload Portofolio</span>
          </Link>
          <Link
            href="/admin/upload-logo"
            className="pb-4 px-2 text-sm font-bold text-brand-500 flex items-center gap-2 transition-colors border-b-2 border-brand-500"
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
                Upload Logo <span className="text-gradient">Mitra Bisnis</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Unggah logo mitra bisnis atau partner Anda agar tampil pada banner berjalan di halaman utama.
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
            {/* Nama Perusahaan / Partner */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Nama Partner / Perusahaan *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Gojek, Tokopedia, PT Maju Bersama"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Gambar Logo (Upload Lokal vs Link) */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Logo Perusahaan *
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
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group p-4 flex justify-center bg-slate-200 dark:bg-slate-850">
                      <img
                        src={formData.image}
                        alt="Preview Logo"
                        className="h-16 object-contain rounded-xl"
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
                            Mengunggah logo dari komputer...
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="p-3 rounded-full bg-brand-500/10 text-brand-500 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Klik untuk memilih file logo dari komputer Anda
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Format yang didukung: PNG, JPG, WEBP, SVG (Maks. 5MB. Direkomendasikan ratio landscape 3:1)
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
                    placeholder="Tempel URL logo (https://...)"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-brand-500"
                  />
                  {formData.image && (
                    <div className="mt-3 p-4 flex justify-center bg-slate-200 dark:bg-slate-850 rounded-xl">
                      <img
                        src={formData.image}
                        alt="Preview Logo URL"
                        className="h-16 object-contain rounded-xl border border-slate-200 dark:border-slate-800"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || uploadingMain}
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
                    <span>Simpan & Terbitkan Logo Mitra</span>
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
