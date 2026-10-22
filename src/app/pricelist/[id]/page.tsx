import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWA from '@/components/layout/FloatingWA';
import { pricelistData } from '@/data/pricelist';
import { 
  Globe, Smartphone, Building2, TrendingUp, 
  CheckCircle2, ArrowLeft, Clock, PackageCheck, 
  MessageCircle, Sparkles, HelpCircle, ArrowRight, PlusCircle, Layers
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Building2,
  TrendingUp
};

export async function generateStaticParams() {
  return [
    { id: 'web-dev' },
    { id: 'digital-marketing' },
    { id: 'mobile-dev' },
    { id: 'enterprise-system' }
  ];
}

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const service = pricelistData[params.id];
  if (!service) return { title: 'Pricelist Layanan - Mitra Digital Solution' };
  
  return {
    title: `${service.title} | Pricelist & Paket - Mitra Digital Solution`,
    description: service.description
  };
}

export default function PricelistPage({ params }: PageProps) {
  const service = pricelistData[params.id];

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.iconName] || Globe;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-brand-500/10 via-slate-50 to-slate-50 dark:from-brand-950/30 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back link */}
          <Link 
            href="/#layanan" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-brand-500 hover:text-brand-500 transition-all mb-8 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <IconComponent className="w-4 h-4" />
              <span>{service.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
              {service.title}
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-6">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.packages.map((pkg) => {
              const waUrl = `https://wa.me/6287810963261?text=${encodeURIComponent(pkg.waMessage)}`;

              return (
                <div
                  key={pkg.id}
                  className={`relative p-8 rounded-3xl bg-white dark:bg-slate-900 border flex flex-col justify-between transition-all duration-300 shadow-xl ${
                    pkg.isPopular
                      ? 'border-brand-500 ring-2 ring-brand-500/30 scale-105 z-10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-brand-500/50'
                  }`}
                >
                  {pkg.badge && (
                    <span
                      className={`absolute -top-3.5 right-6 px-4 py-1 font-bold text-xs uppercase tracking-wider rounded-full shadow-md ${
                        pkg.isPopular
                          ? 'bg-gradient-to-r from-brand-500 to-blue-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  )}

                  <div>
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed min-h-[40px]">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Price / Estimate Block */}
                    <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                      {pkg.price ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {pkg.price}
                          </span>
                          {pkg.period && (
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                              {pkg.period}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold text-xs">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Spesifikasi Paket Lengkap</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 mt-3 text-xs text-brand-600 dark:text-brand-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Estimasi Pengerjaan: {pkg.estimateTime}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mb-8">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                        Benefit & Fitur Utama:
                      </h4>
                      <ul className="space-y-3">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div className="mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-200 mb-2">
                        <PackageCheck className="w-4 h-4 text-brand-500" />
                        <span>Deliverables & Garansi:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.deliverables.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 text-[11px] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2.5 transition-all shadow-md ${
                      pkg.isPopular
                        ? 'bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-400 text-white shadow-brand-500/25'
                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-brand-500 dark:hover:bg-brand-400 dark:hover:text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pesan / Konsultasi Paket via WA</span>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Add-Ons Section */}
          {service.addons && service.addons.length > 0 && (
            <div className="mt-16 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Layanan & Add-Ons Tambahan (Opsional)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Lengkapi paket WebApp Anda dengan fitur custom tambahan & strategi optimasi jangka panjang.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.addons.map((addon, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                        {addon.name}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                        {addon.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 text-xs font-semibold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tanya Jawab</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Pertanyaan Sering Diajukan
            </h2>
          </div>

          <div className="space-y-4">
            {service.faq.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-brand-500/10 text-brand-500 text-xs flex items-center justify-center shrink-0">
                    Q
                  </span>
                  {item.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-9">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-600 to-blue-700 text-white shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left z-10 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Butuh Kebutuhan Custom atau Diskusi Anggaran?
              </h3>
              <p className="text-blue-100 text-sm">
                Konsultasikan ide project atau kebutuhan sistem Anda secara gratis dengan tim teknis Mitra Digital.
              </p>
            </div>
            <a
              href={`https://wa.me/6287810963261?text=Halo%20Mitra%20Digital,%20saya%20mau%20konsultasi%20custom%20layanan%20${encodeURIComponent(service.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-all shrink-0 flex items-center gap-2 shadow-lg z-10"
            >
              <span>Konsultasi Gratis via WA</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWA />
    </main>
  );
}
