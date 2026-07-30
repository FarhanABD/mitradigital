# 🚀 Panduan Lengkap Deployment & Integrasi Backend (Vercel + Firebase Firestore)

Dokumentasi ini berisi panduan langkah demi langkah (step-by-step) untuk melakukan deployment aplikasi **Mitra Digital Solution** ke **Vercel Platform** secara **100% Gratis**, lengkap dengan integrasi Firebase Firestore (NoSQL Database), Notifikasi Email (Resend), dan Manajemen Portofolio Dinamis.

---

## 📋 Daftar Isi
1. [Arsitektur Aplikasi & Teknologi](#1-arsitektur-aplikasi--teknologi)
2. [Prasyarat (Prerequisites)](#2-prasyarat-prerequisites)
3. [Langkah 1: Membuat & Konfigurasi Firebase Project (Firestore)](#langkah-1-membuat--konfigurasi-firebase-project-firestore)
4. [Langkah 2: Menyiapkan Resend API untuk Email Notifikasi (Opsional)](#langkah-2-menyiapkan-resend-api-untuk-email-notifikasi-opsional)
5. [Langkah 3: Push Code ke Repository GitHub](#langkah-3-push-code-ke-repository-github)
6. [Langkah 4: Deploy Aplikasi ke Vercel](#langkah-4-deploy-aplikasi-ke-vercel)
7. [Langkah 5: Pengujian Fitur & Penggunaan Admin Upload](#langkah-5-pengujian-fitur--penggunaan-admin-upload)
8. [Maintenance & Troubleshooting](#maintenance--troubleshooting)

---

## 1. Arsitektur Aplikasi & Teknologi

- **Frontend & Fullstack Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend API Layer**: Next.js Serverless Route Handlers (`src/app/api/...`)
- **Database SDK**: Firebase Admin SDK (`firebase-admin`)
- **Primary Database**: Firebase Firestore (NoSQL)
- **Deployment Platform**: Vercel Serverless Hosting
- **Email Gateway**: Resend API

---

## 2. Prasyarat (Prerequisites)

Sebelum memulai deployment, pastikan Anda telah memiliki akun di layanan berikut (semuanya gratis):
- [GitHub Account](https://github.com)
- [Vercel Account](https://vercel.com)
- [Firebase Console](https://console.firebase.google.com)
- [Resend.com](https://resend.com) (Opsional, untuk fitur kirim email dari form kontak)

---

## Langkah 1: Membuat & Konfigurasi Firebase Project (Firestore)

1. Buka [console.firebase.google.com](https://console.firebase.google.com) dan login dengan akun Google Anda.
2. Klik **Add Project** / **Tambah Proyek**, beri nama `mitra-digital-solution`.
3. Di dashboard Firebase, buka menu **Firestore Database** -> klik **Create Database**.
4. Pilih lokasi server (misal: `asia-southeast1 (Singapore)`).
5. Buka **Project Settings** (ikon roda gigi) -> **Service Accounts**.
6. Klik **Generate New Private Key**, download file JSON Service Account.
7. Ambil 3 nilai credential dari file JSON:
   - `project_id` -> `FIREBASE_PROJECT_ID`
   - `client_email` -> `FIREBASE_CLIENT_EMAIL`
   - `private_key` -> `FIREBASE_PRIVATE_KEY`

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
   git commit -m "feat: migrate database to Firebase Firestore"
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
   - **Build Command**: `next build`
   - Buka bagian **Environment Variables**, masukkan variabel berikut:

   | Key | Value | Keterangan |
   | :--- | :--- | :--- |
   | `FIREBASE_PROJECT_ID` | `mitra-digital-solution` | Project ID dari Firebase Console |
   | `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-xxx@...` | Client Email dari Service Account JSON |
   | `FIREBASE_PRIVATE_KEY` | `"-----BEGIN PRIVATE KEY-----\n..."` | Private Key dari Service Account JSON |
   | `RESEND_API_KEY` | `re_123456789...` | API Key dari Resend.com |
   | `ADMIN_EMAIL` | `email-anda@gmail.com` | Email penampung pesan kontak |

5. Klik **Deploy**. Tunggu proses build Vercel selesai (sekitar 1-2 menit).

---

## Langkah 5: Pengujian Fitur & Penggunaan Admin Upload

### A. Pengujian Form Kontak & Estimator Harga:
1. Buka domain publik Vercel Anda (contoh: `https://mitra-digital-solution.vercel.app`).
2. Tes mengisi form **Kontak Kami** atau **Kalkulator Estimasi Biaya**.
3. Cek Firestore Database collection `contacts` & `estimates` atau Email Admin Anda untuk memastikan pesan berhasil tersimpan & terkirim.

### B. Upload Projek Portofolio Baru secara Dinamis:
1. Akses halaman Admin Upload di URL: `https://domain-anda.vercel.app/admin/upload`.
2. Isi formulir projek baru:
   - Nama Projek, Nama Klien, Kategori (Web/Mobile/ERP/AI).
   - Deskripsi Singkat & URL Cover Image.
   - URL Gambar Tambahan (1 baris per URL untuk Carousel).
   - Tag Teknologi (misal: `Next.js, Node.js, Firebase`).
3. Klik **Simpan & Terbitkan Projek Baru**.
4. Buka beranda utama (`/`), projek baru akan **langsung tampil secara otomatis tanpa perlu di-deploy ulang**!

---

## 🛠️ Maintenance & Troubleshooting

- **Error Private Key Format di Vercel**:
  Pastikan `FIREBASE_PRIVATE_KEY` di-paste lengkap dengan `-----BEGIN PRIVATE KEY-----` dan `-----END PRIVATE KEY-----`. Jika menggunakan newline, pastikan string tidak terpotong (di `src/lib/firebase.ts` sudah ada handler `.replace(/\\n/g, '\n')`).
- **Data Portofolio Tidak Muncul**:
  Jika Firestore belum terisi atau `FIREBASE_PROJECT_ID` kosong, aplikasi secara pintar akan *fallback* menampilkan data bawaan di `src/data/portfolio.ts` sehingga web tidak akan pernah *crash*.
