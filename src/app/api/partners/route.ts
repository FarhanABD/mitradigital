import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db, Timestamp } from '@/lib/firebase';
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { partnersData } from '@/data/partners';

const partnerSchema = z.object({
  name: z.string().min(2, 'Nama partner minimal 2 karakter'),
  image: z.string().min(1, 'Gambar logo wajib diisi'),
});

// GET: Ambil daftar partner logo (dari database atau fallback static)
export async function GET() {
  try {
    if (process.env.FIREBASE_PROJECT_ID) {
      const snapshot = await db.collection('partners').orderBy('createdAt', 'desc').get();
      if (!snapshot.empty) {
        const dbPartners = snapshot.docs.map((doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
          };
        });
        return NextResponse.json({ success: true, data: dbPartners });
      }
    }
    return NextResponse.json({ success: true, data: partnersData });
  } catch (error) {
    console.error('Error fetching partners from Firestore:', error);
    return NextResponse.json({ success: true, data: partnersData });
  }
}

// POST: Tambah partner logo baru ke database
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = partnerSchema.parse(body);

    if (!process.env.FIREBASE_PROJECT_ID) {
      return NextResponse.json(
        {
          success: false,
          message: 'FIREBASE_PROJECT_ID belum dikonfigurasi. Hubungkan Firebase di environment terlebih dahulu.'
        },
        { status: 400 }
      );
    }

    const newPartner = {
      name: validatedData.name,
      image: validatedData.image,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await db.collection('partners').add(newPartner);

    return NextResponse.json(
      {
        success: true,
        message: 'Logo partner berhasil ditambahkan ke database!',
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

    console.error('Error creating partner:', error);
    return NextResponse.json(
      { success: false, message: error?.message ? `Gagal menyimpan partner: ${error.message}` : 'Gagal menyimpan partner ke database.' },
      { status: 500 }
    );
  }
}
