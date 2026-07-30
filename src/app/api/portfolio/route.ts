import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db, Timestamp } from '@/lib/firebase';
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { portfolioData } from '@/data/portfolio';

const projectSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  category: z.enum(['web', 'mobile', 'enterprise', 'ai']),
  categoryLabel: z.string().min(2, 'Label kategori minimal 2 karakter'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  client: z.string().min(2, 'Nama klien minimal 2 karakter'),
  technologies: z.array(z.string()).min(1, 'Pilih minimal 1 teknologi'),
  image: z.string().url('URL gambar utama tidak valid'),
  images: z.array(z.string().url('URL gambar tambahan tidak valid')).optional(),
  stats: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
});

// GET: Ambil daftar projek (dari database atau fallback static)
export async function GET() {
  try {
    if (process.env.FIREBASE_PROJECT_ID) {
      const snapshot = await db.collection('projects').orderBy('createdAt', 'desc').get();
      if (!snapshot.empty) {
        const dbProjects = snapshot.docs.map((doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
          };
        });
        return NextResponse.json({ success: true, data: dbProjects });
      }
    }
    return NextResponse.json({ success: true, data: portfolioData });
  } catch (error) {
    console.error('Error fetching portfolio from Firestore:', error);
    return NextResponse.json({ success: true, data: portfolioData });
  }
}

// POST: Tambah projek baru ke database
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    if (!process.env.FIREBASE_PROJECT_ID) {
      return NextResponse.json(
        {
          success: false,
          message: 'FIREBASE_PROJECT_ID belum dikonfigurasi. Hubungkan Firebase di environment terlebih dahulu.'
        },
        { status: 400 }
      );
    }

    const newProject = {
      title: validatedData.title,
      category: validatedData.category,
      categoryLabel: validatedData.categoryLabel,
      description: validatedData.description,
      client: validatedData.client,
      technologies: validatedData.technologies,
      image: validatedData.image,
      images: validatedData.images || [validatedData.image],
      stats: validatedData.stats || [],
      liveUrl: validatedData.liveUrl || null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await db.collection('projects').add(newProject);

    return NextResponse.json(
      {
        success: true,
        message: 'Projek portofolio berhasil ditambahkan ke database!',
        data: { id: docRef.id, ...validatedData },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menyimpan projek ke database.' },
      { status: 500 }
    );
  }
}
