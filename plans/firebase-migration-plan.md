# 🔥 Firebase Firestore Migration Plan — Mitra Digital Solution

## 📋 Ringkasan

**Tujuan**: Migrasi database dari **PostgreSQL (via Prisma ORM)** ke **Firebase Firestore (NoSQL)** dan tetap *deploy* ke **Vercel**.

**Apa yang Berubah?**
| Komponen | Sebelum | Sesudah |
|----------|---------|---------|
| Database | PostgreSQL (Neon/Supabase) | Firebase Firestore |
| ORM / SDK | Prisma ORM | Firebase Admin SDK (server) |
| Connection | `DATABASE_URL` | `FIREBASE_*` credentials |
| Deployment | Vercel + Neon | Vercel + Firebase |

---

## 📐 Arsitektur Baru

```mermaid
flowchart TD
    A[Browser Client] --> B[Vercel Edge / Serverless]
    B --> C[Next.js Route Handlers]
    C --> D[Firebase Admin SDK]
    D --> E[(Firebase Firestore)]
    C --> F[Resend API Email]
    
    G[Admin Upload Page] --> C
    H[PortfolioSection Client] --> C
```

**Alur Data:**
1. Client (browser) → fetch ke `/api/*` → Vercel Serverless Function
2. Serverless Function → Firebase Admin SDK → Firestore
3. Response dikembalikan ke client

---

## 📁 Struktur Firestore Collections

### 1. Collection: `contacts`
```typescript
interface ContactDocument {
  id: string;           // auto-generated Firestore ID
  name: string;
  email: string;
  phone?: string;
  serviceType?: string;
  budgetRange?: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'CONTACTED' | 'CLOSED';
  createdAt: Timestamp; // Firestore Timestamp
  updatedAt: Timestamp;
}
```

### 2. Collection: `estimates`
```typescript
interface EstimateDocument {
  id: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  selectedOptions: Array<{ id: string; name: string; price: number; durationDays: number }>;
  estimatedPrice: number;
  estimatedDays: number;
  createdAt: Timestamp;
}
```

### 3. Collection: `projects`
```typescript
interface ProjectDocument {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'enterprise' | 'ai';
  categoryLabel: string;
  description: string;
  client: string;
  technologies: string[];
  image: string;
  images: string[];
  stats?: Array<{ label: string; value: string }>;
  liveUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## 📦 Dependencies yang Berubah

### Hapus
```bash
npm uninstall @prisma/client prisma
```

### Install
```bash
npm install firebase-admin
```

---

## 📄 File yang Dimodifikasi

### 🔴 Langsung diubah (core changes):

| File | Perubahan |
|------|-----------|
| `src/lib/prisma.ts` | → **HAPUS** file ini, ganti dengan `src/lib/firebase.ts` (inisialisasi Firebase Admin SDK) |
| `src/app/api/contact/route.ts` | Ganti `prisma.contactLead.create()` → `firestore.collection('contacts').add()` |
| `src/app/api/estimator/route.ts` | Ganti `prisma.estimateSubmission.create()` → `firestore.collection('estimates').add()` |
| `src/app/api/portfolio/route.ts` | Ganti `prisma.project.findMany()` → `firestore.collection('projects').orderBy().get()` |
| `src/app/api/portfolio/route.ts` | Ganti `prisma.project.create()` → `firestore.collection('projects').add()` |
| `.env.example` | Ganti `DATABASE_URL` → `FIREBASE_*` vars |
| `DEPLOYMENT_GUIDE.md` | Ganti instruksi Neon → Firebase setup |
| `package.json` | Hapus prisma scripts, hapus `prisma` dari dependencies |

### 🟢 Tidak perlu diubah:
- `src/components/sections/PortfolioSection.tsx` — tetap fetch dari `/api/portfolio`
- `src/app/admin/upload/page.tsx` — tetap POST ke `/api/portfolio`
- `src/types/index.ts` — tetap sama (interface sudah agnostic)
- `prisma/schema.prisma` — **HAPUS** folder `prisma/` entirely

---

## 🔧 Langkah Implementasi Detail

### Step 1: Setup Firebase Project
1. Buka [console.firebase.google.com](https://console.firebase.google.com)
2. Buat project baru: `mitra-digital-solution`
3. Buka **Project Settings > Service Accounts**
4. Klik **Generate New Private Key** → download file JSON
5. File JSON berisi credential seperti:
   ```json
   {
     "type": "service_account",
     "project_id": "mitra-digital-solution",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...",
     "client_email": "firebase-adminsdk-xxxx@mitra-digital-solution.iam.gserviceaccount.com",
     ...
   }
   ```

### Step 2: Buat file `src/lib/firebase.ts`
```typescript
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const db = admin.firestore();
export const Timestamp = admin.firestore.Timestamp;
```

### Step 3: Update Environment Variables
Di `.env` dan di Vercel Dashboard, ganti:

| Variable | Value Baru |
|----------|-----------|
| ~~`DATABASE_URL`~~ | **HAPUS** |
| `FIREBASE_PROJECT_ID` | `mitra-digital-solution` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-xxx@...` |
| `FIREBASE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\n...` |
| `RESEND_API_KEY` | **TETAP** (tidak berubah) |
| `ADMIN_EMAIL` | **TETAP** (tidak berubah) |

### Step 4: Update API Routes
Semua file di `src/app/api/*/route.ts`:
- Import berubah dari `import { prisma } from '@/lib/prisma'` → `import { db } from '@/lib/firebase'`
- Semua query Prisma diganti dengan Firestore methods

### Step 5: Hapus Prisma & Folder terkait
```bash
npm uninstall @prisma/client prisma
rm -rf prisma/
rm src/lib/prisma.ts
```

### Step 6: Update `package.json`
Hapus `prisma` dari `devDependencies` dan `@prisma/client` dari `dependencies`.
Update script build jika ada `npx prisma generate`.

### Step 7: Update `DEPLOYMENT_GUIDE.md`
Ganti semua instruksi terkait Neon/Postgres dengan Firebase setup steps.

### Step 8: Test di Lokal
1. Set env vars Firebase di `.env`
2. Jalankan `npm run dev`
3. Test Contact form, Estimator form, Portfolio upload

### Step 9: Deploy ke Vercel
1. Push ke GitHub
2. Di Vercel Dashboard, set Environment Variables:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
3. Deploy

---

## ⚠️ Catatan Penting

### 1. Private Key Format
Firebase private key mengandung `\n` karakter. Saat disimpan di Vercel Environment Variables, pastikan:
- Wrap dengan **double quotes** jika paste langsung
- Atau gunakan `replace(/\\n/g, '\n')` di code (seperti contoh Step 2)

### 2. Firestore Security Rules
Karena kita akses Firebase dari **Admin SDK** (server-side), Firestore **Security Rules tidak perlu diubah** — Admin SDK bypass security rules. Ini aman karena semua operasi database terjadi di server (Vercel), bukan di client.

### 3. Cold Start
Firebase Admin SDK melakukan inisialisasi sekali saat pertama kali dipanggil. Untuk Vercel serverless, gunakan pattern `if (!admin.apps.length)` agar tidak re-initialize setiap request (sama seperti pattern Prisma singleton).

### 4. Firestore Pricing
Firestore memiliki **free tier**:
- 1 GB stored data
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day

Untuk proyek ini (contact form, estimator, portfolio admin), free tier sudah **lebih dari cukup**.

### 5. Data Portability
Tidak ada migrasi data otomatis dari PostgreSQL → Firestore. Jika ada data lama di PostgreSQL, perlu di-export manual dan di-import ke Firestore.

---

## 🔄 Perbandingan Query: Prisma → Firestore

| Operasi | Prisma (PostgreSQL) | Firestore (NoSQL) |
|---------|---------------------|-------------------|
| Create | `prisma.contactLead.create({ data })` | `db.collection('contacts').add(data)` |
| Read All | `prisma.project.findMany({ orderBy })` | `db.collection('projects').orderBy('createdAt', 'desc').get()` |
| Read by ID | `prisma.project.findUnique({ where: { id } })` | `db.collection('projects').doc(id).get()` |
| Update | `prisma.project.update({ where: { id }, data })` | `db.collection('projects').doc(id).update(data)` |
| Delete | `prisma.project.delete({ where: { id } })` | `db.collection('projects').doc(id).delete()` |

---

## ✅ Todo Checklist Implementasi

- [x] Setup Firebase Project & download Service Account JSON
- [x] Buat `src/lib/firebase.ts` (Firebase Admin SDK initialization)
- [x] Update `.env` & `.env.example` (ganti `DATABASE_URL` → `FIREBASE_*`)
- [x] Update `src/app/api/contact/route.ts` → ganti Prisma dengan Firestore
- [x] Update `src/app/api/estimator/route.ts` → ganti Prisma dengan Firestore
- [x] Update `src/app/api/portfolio/route.ts` → ganti Prisma dengan Firestore
- [x] Hapus `src/lib/prisma.ts`
- [x] Uninstall Prisma (`npm uninstall @prisma/client prisma`)
- [x] Hapus folder `prisma/`
- [x] Update `package.json` (hapus prisma dependencies)
- [x] Update `DEPLOYMENT_GUIDE.md` dengan instruksi Firebase
- [ ] Test lokal (contact form, estimator, portfolio upload)
- [ ] Deploy ke Vercel dengan env vars baru