'use client';

import { MessageSquare, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingWA() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      {/* Tooltip badge */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-brand-500/30 text-slate-200 text-xs shadow-xl backdrop-blur-md animate-bounce">
        <Sparkles className="w-3.5 h-3.5 text-brand-500" />
        <span>{t('Konsultasi Gratis via WA')}</span>
      </div>

      {/* Button */}
      <a
        href="https://wa.me/6281353401336?text=Halo%20Mitra%20Digital%20Solution,%20saya%20tertarik%20untuk%20diskusi%20proyek%20perangkat%20lunak%20/%20tugas%20kuliah."
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 relative"
        aria-label="Contact via WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20 pointer-events-none" />
        <MessageSquare className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
