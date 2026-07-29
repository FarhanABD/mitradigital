import { FaqItem } from '@/types';

export const faqsData: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'Berapa lama estimasi pengerjaan sebuah website atau aplikasi?',
    answer: 'Waktu pengerjaan bergantung pada skala proyek. Landing page standar membutuhkan 5 - 10 hari kerja, sedangkan aplikasi web/mobile atau sistem ERP kustom biasanya membutuhkan waktu 3 hingga 8 minggu.'
  },
  {
    id: 'faq-2',
    category: 'pricing',
    question: 'Bagaimana sistem pembayaran di Mitra Digital Solution?',
    answer: 'Kami menerapkan sistem pembayaran berbasis milestone (termin) transparan: Down Payment (DP) 30% di awal, 40% setelah pengerjaan 50% (tahap demo beta), dan sisa 30% setelah UAT & penyelesaian siap rilis.'
  },
  {
    id: 'faq-3',
    category: 'tech',
    question: 'Apakah klien mendapatkan 100% Hak Cipta & Source Code?',
    answer: 'Ya, tentu! Setelah pelunasan, 100% Hak Milik Intelektual, Master Source Code di Repository (GitHub/GitLab), aset desain Figma, dan akses Server sepenuhnya diserahkan kepada Anda.'
  },
  {
    id: 'faq-4',
    category: 'process',
    question: 'Apakah ada garansi setelah aplikasi dipublikasikan (Go-Live)?',
    answer: 'Setiap proyek mendapatkan Garansi Pemeliharaan (Maintenance SLA) Bug-Free Gratis selama 3 hingga 6 bulan. Kami juga menyediakan paket pemeliharaan berkala (Managed Support) untuk jangka panjang.'
  },
  {
    id: 'faq-5',
    category: 'general',
    question: 'Bagaimana jika kami belum memiliki acuan UI/UX atau spesifikasi rinci?',
    answer: 'Jangan khawatir! Tim Business Analyst dan UI/UX Designer kami akan mendampingi Anda melalui sesi konsultasi gratis untuk merumuskan Kebutuhan Sistem (BRD), alur pengguna, hingga prototipe fungsional.'
  },
  {
    id: 'faq-6',
    category: 'tech',
    question: 'Apakah sistem buatan Mitra Digital Solution bisa diintegrasikan dengan API pihak ketiga?',
    answer: 'Sangat bisa. Kami berpengalaman mengintegrasikan berbagai API external seperti Payment Gateway (Midtrans, Xendit), WhatsApp Gateway, Google Maps API, E-KTP/BPJS, serta LLM AI (Gemini, OpenAI).'
  }
];
