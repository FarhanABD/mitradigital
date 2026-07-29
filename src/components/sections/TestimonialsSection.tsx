import { testimonialsData } from '@/data/testimonials';
import { Star, MessageCircle, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Testimoni Klien</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Kepercayaan Dari <span className="text-gradient">Mitra Bisnis</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Dengarkan langsung ulasan dari para pemimpin perusahaan dan founder yang telah sukses mentransformasi bisnis bersama kami.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonialsData.map((item) => (
            <div key={item.id} className="p-8 rounded-2xl glass-panel glass-panel-hover relative flex flex-col justify-between">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-500/10" />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm italic leading-relaxed mb-6">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-500/40"
                />
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">{item.name}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{item.role} — <span className="text-brand-600 dark:text-brand-400">{item.company}</span></p>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 block">{item.projectType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
