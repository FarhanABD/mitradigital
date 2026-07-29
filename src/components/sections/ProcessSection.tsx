import { Search, Palette, Code2, Rocket } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      num: '01',
      icon: Search,
      title: '1. Diskusi & Pemahaman Bisnis',
      desc: 'Sesi konsultasi santai untuk memahami alur bisnis Anda, merumuskan solusi teknologi yang tepat, dan menyusun rencana kerja yang jelas.'
    },
    {
      num: '02',
      icon: Palette,
      title: '2. Desain Tampilan Aplikasi',
      desc: 'Pembuatan rancangan desain visual aplikasi (prototipe interaktif) agar Anda bisa melihat dan mencoba alur aplikasinya sebelum masuk tahap koding.'
    },
    {
      num: '03',
      icon: Code2,
      title: '3. Pembuatan & Pengujian Sistem',
      desc: 'Proses koding aplikasi secara rapi, integrasi fitur, serta pengujian ketat untuk memastikan tidak ada error dan sistem berjalan lancar.'
    },
    {
      num: '04',
      icon: Rocket,
      title: '4. Peluncuran & Pendampingan',
      desc: 'Aplikasi resmi dirilis, penyerahan akses penuh, pelatihan cara penggunaan untuk Anda/tim, serta garansi pendampingan jika ada kendala.'
    }
  ];

  return (
    <section id="carakerja" className="py-24 relative bg-slate-100/70 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Rocket className="w-3.5 h-3.5" />
            <span>Alur Pengerjaan</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Proses Pengerjaan Proyek <span className="text-gradient">Terstruktur</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            4 langkah metodologi pengembangan perangkat lunak yang transparan dan terukur dari awal hingga go-live.
          </p>
        </div>

        {/* Workflow steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div key={idx} className="relative p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-brand-500 font-mono opacity-80">{step.num}</span>
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
