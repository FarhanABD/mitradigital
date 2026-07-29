'use client';

import { useState } from 'react';
import { estimatorCategories } from '@/data/estimator';
import { Calculator, Check, ArrowRight, MessageSquare, Clock, Sparkles } from 'lucide-react';

export default function EstimatorSection() {
  const [selectedProjectType, setSelectedProjectType] = useState<string>(estimatorCategories[0].options[0].id);
  const [selectedPlatform, setSelectedPlatform] = useState<string>(estimatorCategories[1].options[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Toggle addon checkbox
  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Calculate Price & Duration
  const getSelectedOptions = () => {
    const mainTypeObj = estimatorCategories[0].options.find((o) => o.id === selectedProjectType);
    const platformObj = estimatorCategories[1].options.find((o) => o.id === selectedPlatform);
    const addonObjs = estimatorCategories[2].options.filter((o) => selectedAddons.includes(o.id));

    let totalPrice = (mainTypeObj?.price || 0) + (platformObj?.price || 0);
    let totalDays = (mainTypeObj?.durationDays || 0) + (platformObj?.durationDays || 0);

    addonObjs.forEach((addon) => {
      totalPrice += addon.price;
      totalDays += addon.durationDays;
    });

    return {
      mainTypeObj,
      platformObj,
      addonObjs,
      totalPrice,
      totalDays,
    };
  };

  const { mainTypeObj, platformObj, addonObjs, totalPrice, totalDays } = getSelectedOptions();

  // Format currency
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Generate WhatsApp Order String
  const generateWAUrl = () => {
    const text = `Halo Mitra Digital Solution, saya telah menghitung estimasi proyek di website:\n\n` +
      `📌 *Tipe Proyek:* ${mainTypeObj?.name}\n` +
      `📌 *Platform:* ${platformObj?.name}\n` +
      `📌 *Fitur Tambahan:* ${addonObjs.map((a) => a.name).join(', ') || 'Tidak ada'}\n\n` +
      `💰 *Estimasi Biaya:* ~${formatIDR(totalPrice)}\n` +
      `⏱ *Estimasi Waktu:* ~${totalDays} Hari Kerja\n\n` +
      `Saya ingin berdiskusi lebih lanjut mengenai jadwal dan pengerjaannya. Terima kasih!`;
    return `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="kalkulator" className="py-24 relative bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Kalkulator Biaya & <span className="text-gradient">Durasi Proyek</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Simulasikan kebutuhan perangkat lunak Anda secara transparan. Pilih spesifikasi dan dapatkan estimasi harga dan waktu pengerjaan secara instan.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Project Type */}
            <div className="p-6 rounded-2xl glass-panel">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-500 text-white dark:text-slate-950 font-bold text-xs flex items-center justify-center">1</span>
                {estimatorCategories[0].title}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {estimatorCategories[0].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedProjectType(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      selectedProjectType === opt.id
                        ? 'bg-brand-500/10 border-brand-500 text-slate-900 dark:text-white shadow-md'
                        : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">{opt.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{opt.description}</div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-xs font-mono font-semibold text-brand-600 dark:text-brand-400">
                        {opt.price > 0 ? formatIDR(opt.price) : 'Custom'}
                      </div>
                      <div className="text-[10px] text-slate-400">~{opt.durationDays} hari</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target Platform */}
            <div className="p-6 rounded-2xl glass-panel">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-500 text-white dark:text-slate-950 font-bold text-xs flex items-center justify-center">2</span>
                {estimatorCategories[1].title}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {estimatorCategories[1].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedPlatform(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      selectedPlatform === opt.id
                        ? 'bg-brand-500/10 border-brand-500 text-slate-900 dark:text-white shadow-md'
                        : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">{opt.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{opt.description}</div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-xs font-mono font-semibold text-brand-600 dark:text-brand-400">
                        {opt.price > 0 ? `+ ${formatIDR(opt.price)}` : 'Termasuk'}
                      </div>
                      <div className="text-[10px] text-slate-400">+{opt.durationDays} hari</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Addons */}
            <div className="p-6 rounded-2xl glass-panel">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-500 text-white dark:text-slate-950 font-bold text-xs flex items-center justify-center">3</span>
                {estimatorCategories[2].title}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {estimatorCategories[2].options.map((opt) => {
                  const isChecked = selectedAddons.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleAddon(opt.id)}
                      className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-brand-500/10 border-brand-500 text-slate-900 dark:text-white shadow-md'
                          : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-brand-500 border-brand-500 text-white dark:text-slate-950' : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 font-bold" />}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">{opt.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{opt.description}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <div className="text-xs font-mono font-semibold text-brand-600 dark:text-brand-400">
                          + {formatIDR(opt.price)}
                        </div>
                        <div className="text-[10px] text-slate-400">+{opt.durationDays} hari</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Price Summary Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-brand-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Ringkasan Estimasi</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                  Perhitungan Realtime
                </span>
              </div>

              {/* Total Price Display */}
              <div className="mb-6">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Perkiraan Biaya Investasi:</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight text-gradient">
                  {formatIDR(totalPrice)}
                </div>
                <div className="text-xs text-slate-400 mt-1">*Harga dapat disesuaikan kembali setelah sesi penajaman BRD.</div>
              </div>

              {/* Total Duration Display */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-6">
                <Clock className="w-6 h-6 text-brand-500 shrink-0" />
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Estimasi Durasi Pengerjaan:</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white font-mono">
                    ~{totalDays} Hari Kerja <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">({Math.ceil(totalDays / 5)} Minggu)</span>
                  </div>
                </div>
              </div>

              {/* Selected List */}
              <div className="space-y-3 mb-8 text-xs border-t border-slate-200 dark:border-slate-800 pt-4">
                <div className="text-slate-500 dark:text-slate-400 font-semibold mb-2">Item Terpilih:</div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Proyek:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{mainTypeObj?.name}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Platform:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{platformObj?.name}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Fitur Tambahan:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{addonObjs.length} Fitur</span>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <a
                href={generateWAUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Kirim Estimasi ke WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
