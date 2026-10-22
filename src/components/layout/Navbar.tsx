'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Code2, Menu, X, ArrowUpRight, PhoneCall, Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Sync saved theme state
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const navLinks = [
    { name: t('Layanan'), href: '/#layanan' },
    { name: t('Standar Kualitas'), href: '/#techstack' },
    { name: t('Portofolio'), href: '/#portofolio' },
    { name: t('Keunggulan'), href: '/#keunggulan' },
    { name: t('FAQ'), href: '/#faq' },
    { name: t('Berita'), href: '/news' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md py-3 border-b border-slate-200 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with public/img/logo.png */}
          <Link href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-tr from-brand-500 to-blue-600 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform p-0.5 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/logo-1.png"
                alt="Mitra Digital Solution Logo"
                className="w-full h-full object-cover rounded-lg bg-slate-950"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Code2 className="w-6 h-6 text-white hidden" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                Mitra Digital <span className="text-brand-500">Solution</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-500 dark:text-slate-400 uppercase font-medium">
                {t('Software House & AI Agency')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-200/60 dark:bg-white/5 border border-slate-300/80 dark:border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-300/50 dark:hover:bg-white/5 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Theme Switcher, Language Switcher & WA CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
              aria-label="Toggle Language"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300 text-xs font-bold shadow-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark / Light Theme"
              className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <a
              href="https://wa.me/6287810963261?text=Halo%20Mitra%20Digital%20Solution,%20saya%20ingin%20konsultasi%20pembuatan%20software"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-400 hover:to-blue-500 rounded-full shadow-lg shadow-brand-500/25 transition-all hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t('Konsultasi Gratis')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button, Theme toggle & Language switcher */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
              aria-label="Toggle Language"
              className="flex items-center px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold"
            >
              <Globe className="w-3.5 h-3.5 mr-1" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark / Light Theme"
              className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-amber-400"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 mt-2 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-brand-500/10 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://wa.me/6287810963261?text=Halo%20Mitra%20Digital%20Solution,%20saya%20ingin%20konsultasi%20pembuatan%20software"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-brand-500 to-blue-600 rounded-xl shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t('Konsultasi WhatsApp')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
