'use client';

import { Mail, Phone, MapPin, MessageSquare, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
  const waNumber = '6281353401336';
  const displayWaNumber = '+62 813-5340-1336';
  const waUrl = `https://wa.me/${waNumber}?text=Halo%20Mitra%20Digital%20Solution,%20saya%20ingin%20konsultasi%20pembuatan%20software%20/%20website%20/%20tugas%20kuliah.`;

  return (
    <section id="kontak" className="py-24 relative bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hubungi Tim Kami</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Konsultasikan <span className="text-gradient">Proyek / Tugas Anda</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Apakah Anda pemilik UMKM, mahasiswa yang butuh bantuan Tugas Akhir / Skripsi, atau pemilik bisnis yang ingin promosi Digital Marketing & SEO? Kami siap membantu!
          </p>
        </div>

        {/* Contact Info Grid & Main WA CTA Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left Column: Direct Contact Info List */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="p-6 rounded-2xl glass-panel flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0 border border-brand-500/20">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-base mb-1">Alamat Kantor</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Sudirman Central Business District (SCBD), Jakarta & Bandung Tech Hub, Indonesia
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0 border border-brand-500/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-base mb-1">Email Resmi</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
                  consultation@mitradigital.id / halo@mitradigital.id
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-base mb-1">Hotline & WhatsApp</h4>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-base">
                  {displayWaNumber} <span className="text-xs text-slate-500 font-normal block sm:inline">(Respon Cepat 24 Jam)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Direct WhatsApp CTA Card */}
          <div className="lg:col-span-6 flex">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-brand-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between w-full">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Respon Langsung WhatsApp</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                  Diskusi Langsung via WhatsApp
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  Tidak perlu mengisi formulir panjang. Klik tombol di bawah untuk terhubung langsung dengan konsultan teknis kami di nomor <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{displayWaNumber}</span>.
                </p>

                <div className="space-y-2.5 mb-8 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Layanan Konsultasi Bebas 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>Ramah untuk UMKM, Mahasiswa, & Perusahaan</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 text-center"
              >
                <MessageSquare className="w-5 h-5 fill-white shrink-0" />
                <span>Chat WhatsApp ({displayWaNumber})</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
