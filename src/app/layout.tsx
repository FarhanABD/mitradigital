import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWA from '@/components/layout/FloatingWA';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mitra Digital Solution — Software House, Aplikasi Web, Mobile & AI Solutions',
  description: 'Mitra Digital Solution adalah Software House & Digital Agency profesional yang menyediakan jasa pembuatan website, aplikasi mobile, custom enterprise ERP/CRM, dan integrasi Artificial Intelligence (AI).',
  keywords: [
    'Mitra Digital Solution',
    'software house indonesia',
    'jasa pembuatan website',
    'jasa pembuatan aplikasi mobile',
    'pengembangan web react nextjs',
    'integrasi AI gemini',
    'custom ERP CRM indonesia',
    'software house jakarta bandung'
  ],
  authors: [{ name: 'Mitra Digital Solution' }],
  openGraph: {
    title: 'Mitra Digital Solution — Software House & AI Agency',
    description: 'Solusi rekayasa perangkat lunak modern untuk akselerasi bisnis Anda. Web, Mobile Apps, Enterprise ERP, & AI Integration.',
    url: 'https://mitradigital.id',
    siteName: 'Mitra Digital Solution',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mitra Digital Solution — Software House & AI Agency',
    description: 'Solusi rekayasa perangkat lunak modern untuk akselerasi bisnis Anda.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
 }) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body className={`${inter.className} bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-slate-950 transition-colors duration-300`}>
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingWA />
        </LanguageProvider>
      </body>
    </html>
  );
}
