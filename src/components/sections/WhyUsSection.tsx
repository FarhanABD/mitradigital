import { ShieldCheck, Code, Zap, Lock, RefreshCw, Headphones } from 'lucide-react';

export default function WhyUsSection() {
  const advantages = [
    {
      icon: Code,
      title: 'Sistem Rapi & Mudah Ditingkatkan',
      desc: 'Aplikasi dibangun dengan standar terbaik sehingga fleksibel dan siap untuk terus ditambah fiturnya seiring perkembangan bisnis Anda.'
    },
    {
      icon: ShieldCheck,
      title: '100% Hak Milik Anda',
      desc: 'Seluruh kode program, data bisnis, dan akses akun sepenuhnya menjadi milik Anda tanpa ada biaya sewa atau lisensi tersembunyi.'
    },
    {
      icon: Zap,
      title: 'Akses Super Cepat & Ringan',
      desc: 'Website dan aplikasi dirancang sangat cepat saat dibuka di HP maupun laptop, membuat pelanggan betah dan tidak kabur.'
    },
    {
      icon: Lock,
      title: 'Keamanan Data Terjamin',
      desc: 'Data transaksi dan informasi pelanggan Anda terlindungi dengan sistem enkripsi aman dari risiko peretasan atau kebocoran data.'
    },
    {
      icon: RefreshCw,
      title: 'Pantau Proses Pembuatan Real-Time',
      desc: 'Anda bisa melihat perkembangan aplikasi setiap minggu dan memberikan masukan langsung sebelum sistem resmi diluncurkan.'
    },
    {
      icon: Headphones,
      title: 'Garansi & Bantuan Teknis Siap Sedia',
      desc: 'Kami siap memberikan perawatan berkala, perbaikan kendala gratis, dan bantuan cepat jika Anda mengalami kesulitan.'
    }
  ];

  return (
    <section id="keunggulan" className="py-24 relative bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mengapa Memilih Kami</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Komitmen Kualitas & <span className="text-gradient">Standar Rekayasa</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Kami menghadirkan nilai tambah nyata melebihi sekadar penulisan baris kode, memastikan investasi digital Anda membuahkan hasil optimal.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500 mb-6">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
