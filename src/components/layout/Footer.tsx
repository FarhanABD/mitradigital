'use client';

import Link from 'next/link';
import { Code2, Mail, Phone, MapPin, Github, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-t border-slate-300 dark:border-slate-800/80 pt-16 pb-12 overflow-hidden transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-300 dark:border-slate-800">
          
          {/* Company Bio & Logo */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-tr from-brand-500 to-blue-600 flex items-center justify-center shadow-lg shadow-brand-500/20 p-0.5 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/logo-1.png"
                  alt="Mitra Digital Solution Logo"
                  className="w-full h-full object-cover rounded-lg bg-slate-950"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Mitra Digital <span className="text-brand-500">Solution</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              {t('Mitra Digital Solution adalah Software House & Digital Agency profesional yang berfokus pada pembuatan Website, Aplikasi Mobile, Custom Enterprise System, dan Integrasi AI untuk mendorong efisiensi dan akselerasi bisnis Anda.')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-brand-500 hover:border-brand-500/50 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-brand-500 hover:border-brand-500/50 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-brand-500 hover:border-brand-500/50 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-sm tracking-wider uppercase mb-4">{t('Layanan Utama')}</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#layanan" className="hover:text-brand-500 transition-colors">{t('Pengembangan Web & WebApp')}</a></li>
              <li><a href="#layanan" className="hover:text-brand-500 transition-colors">{t('Pengembangan Aplikasi Mobile')}</a></li>
              <li><a href="#layanan" className="hover:text-brand-500 transition-colors">{t('Custom Enterprise System')}</a></li>
              <li><a href="#layanan" className="hover:text-brand-500 transition-colors">{t('Digital Marketing & Social Media')}</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-sm tracking-wider uppercase mb-4">{t('Navigasi Site')}</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#hero" className="hover:text-brand-500 transition-colors">{t('Beranda')}</a></li>
              <li><a href="#layanan" className="hover:text-brand-500 transition-colors">{t('Layanan')}</a></li>
              <li><a href="#portofolio" className="hover:text-brand-500 transition-colors">{t('Portofolio Proyek')}</a></li>
              <li><a href="#keunggulan" className="hover:text-brand-500 transition-colors">{t('Keunggulan Kami')}</a></li>
              <li><a href="#faq" className="hover:text-brand-500 transition-colors">{t('FAQ & Tanya Jawab')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-sm tracking-wider uppercase mb-4">{t('Kontak Kami')}</h4>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>{t('Grand Duta City, Cluster Ladera No j20/40, Iwul, Kec. Parung, Kabupaten Bogor, Jawa Barat 16330')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="mailto:mitradigital@gmail.com" className="hover:text-brand-500 transition-colors">mitradigital@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="https://wa.me/6287810963261" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">+62 878 1096 3261</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {t('PT Mitra Digital Solution. All rights reserved.')}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">{t('Privacy Policy')}</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">{t('Terms of Service')}</a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center hover:border-brand-500 hover:text-brand-500 transition-all" aria-label="Scroll to top">
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
