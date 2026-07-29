# 🚀 Panduan Lengkap Deployment & Integrasi Backend (Vercel + Neon Postgres + Prisma)

Dokumentasi ini berisi panduan langkah demi langkah (step-by-step) untuk melakukan deployment aplikasi **Mitra Digital Solution** ke **Vercel Platform** secara **100% Gratis**, lengkap dengan integrasi Database PostgreSQL Serverless (Neon / Supabase), Notifikasi Email (Resend), dan Manajemen Portofolio Dinamis.

---

## 📋 Daftar Isi
1. [Arsitektur Aplikasi & Teknologi](#1-arsitektur-aplikasi--teknologi)
2. [Prasyarat (Prerequisites)](#2-prasyarat-prerequisites)
3. [Langkah 1: Membuat Database Serverless (Neon / Supabase)](#langkah-1-membuat-database-serverless-neon--supabase)
4. [Langkah 2: Menyiapkan Resend API untuk Email Notifikasi (Opsional)](#langkah-2-menyiapkan-resend-api-untuk-email-notifikasi-opsional)
5. [Langkah 3: Push Code ke Repository GitHub](#langkah-3-push-code-ke-repository-github)
6. [Langkah 4: Deploy Aplikasi ke Vercel](#langkah-4-deploy-aplikasi-ke-vercel)
7. [Langkah 5: Inisialisasi Skema Database di Server Production](#langkah-5-inisialisasi-skema-database-di-server-production)
8. [Langkah 6: Pengujian Fitur & Penggunaan Admin Upload](#langkah-6-pengujian-fitur--penggunaan-admin-upload)
9. [Maintenance & Troubleshooting](#maintenance--troubleshooting)

---

## 1. Arsitektur Aplikasi & Teknologi

- **Frontend & Fullstack Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend API Layer**: Next.js Serverless Route Handlers (`src/app/api/...`)
- **Database ORM**: Prisma ORM v5
- **Primary Database**: PostgreSQL Serverless (Neon Postgres / Supabase)
- **Deployment Platform**: Vercel Serverless Hosting
- **Email Gateway**: Resend API

---

## 2. Prasyarat (Prerequisites)

Sebelum memulai deployment, pastikan Anda telah memiliki akun di layanan berikut (semuanya gratis):
- [GitHub Account](https://github.com)
- [Vercel Account](https://vercel.com)
- [Neon.tech](https://neon.tech) atau [Supabase.com](https://supabase.com)
- [Resend.com](https://resend.com) (Opsional, untuk fitur kirim email dari form kontak)

---

## Langkah 1: Membuat Database Serverless (Neon / Supabase)

### Menggunakan Neon Postgres (Direkomendasikan):
1. Buka [neon.tech](https://neon.tech) dan login dengan akun GitHub Anda.
2. Klik **Create a Project**, masukkan nama projek: `mitra-digital-db`.
3. Pilih region terdekat (misalnya: `Singapore - ap-southeast-1`).
4. Setelah database berhasil dibuat, buka **Dashboard -> Connection Details**.
5. Pilih `Prisma` atau `PostgreSQL` connection string. Salin URL database yang berformat:
   ```env
   postgresql://username:password@ep-cool-name-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
   *(Simpan URL ini untuk dimasukkan ke Environment Variables Vercel)*.

---

## Langkah 2: Menyiapkan Resend API untuk Email Notifikasi (Opsional)

1. Buka [resend.com](https://resend.com) dan buat akun gratis.
2. Buka menu **API Keys** -> Klik **Create API Key**.
3. Berikan nama key `mitra-digital-resend`, lalu salin API Key yang diawali dengan `re_...`.

---

## Langkah 3: Push Code ke Repository GitHub

1. Buka terminal proyek di komputer lokal Anda.
2. Buat repository baru di [GitHub](https://github.com/new) bernama `mitra-digital-solution`.
3. Jalankan perintah berikut untuk mengunggah kode ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: setup Next.js 14 fullstack, Prisma ORM, and admin upload form"
   git branch -M main
   git remote add origin https://github.com/username-anda/mitra-digital-solution.git
   git push -u origin main
   ```

---

## Langkah 4: Deploy Aplikasi ke Vercel

1. Buka [dashboard.vercel.com](https://vercel.com/dashboard) dan login.
2. Klik tombol **Add New...** -> pilih **Project**.
3. Pilih repository GitHub `mitra-digital-solution` yang baru saja di-push, lalu klik **Import**.
4. Di halaman **Configure Project**:
   - **Framework Preset**: Next.js (terdeteksi otomatis).
   - **Build Command**: `npx prisma generate && next build`
   - Buka bagian **Environment Variables**, masukkan variabel berikut:

   | Key | Value (Contoh) | Keterangan |
   | :--- | :--- | :--- |
   | `DATABASE_URL` | `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require` | Connection String dari Neon/Supabase |
   | `RESEND_API_KEY` | `re_123456789...` | API Key dari Resend.com |
   | `ADMIN_EMAIL` | `email-anda@gmail.com` | Email penampung pesan kontak |

5. Klik **Deploy**. Tunggu proses build Vercel selesai (sekitar 1-2 menit).

---

## Langkah 5: Inisialisasi Skema Database di Server Production

Setelah deployment di Vercel selesai, jalankan perataan tabel (migration) dari komputer lokal Anda ke database Neon/Supabase production:

1. Buka file `.env` di komputer lokal Anda (atau set sementara di terminal).
2. Isi `DATABASE_URL` dengan Connection String Neon Postgres Production Anda.
3. Jalankan perintah berikut di terminal lokal:
   ```bash
   npx prisma db push
   ```
   *Perintah ini akan secara otomatis membuat tabel `ContactLead`, `EstimateSubmission`, dan `Project` di database PostgreSQL Neon/Supabase Anda.*

---

## Langkah 6: Pengujian Fitur & Penggunaan Admin Upload

### A. Pengujian Form Kontak & Estimator Harga:
1. Buka domain publik Vercel Anda (contoh: `https://mitra-digital-solution.vercel.app`).
2. Tes mengisi form **Kontak Kami** atau **Kalkulator Estimasi Biaya**.
3. Cek database Neon atau Email Admin Anda untuk memastikan pesan berhasil tersimpan & terkirim.

### B. Upload Projek Portofolio Baru secara Dinamis:
1. Akses halaman Admin Upload di URL: `https://domain-anda.vercel.app/admin/upload`.
2. Isi formulir projek baru:
   - Nama Projek, Nama Klien, Kategori (Web/Mobile/ERP/AI).
   - Deskripsi Singkat & URL Cover Image.
   - URL Gambar Tambahan (1 baris per URL untuk Carousel).
   - Tag Teknologi (misal: `Next.js, Node.js, PostgreSQL`).
3. Klik **Simpan & Terbitkan Projek Baru**.
4. Buka beranda utama (`/`), projek baru akan **langsung tampil secara otomatis tanpa perlu di-deploy ulang**!

---

## 🛠️ Maintenance & Troubleshooting

- **Error Database Connection di Vercel**:
  Pastikan parameter `?sslmode=require` selalu disertakan di ujung `DATABASE_URL` Neon Postgres.
- **Data Portofolio Tidak Muncul**:
  Jika database belum diisi atau `DATABASE_URL` kosong, aplikasi secara pintar akan *fallback* menampilkan data bawaan di `src/data/portfolio.ts` sehingga web tidak akan pernah *crash*.
