import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db, Timestamp } from '@/lib/firebase';

const estimatorSchema = z.object({
  clientName: z.string().optional(),
  clientEmail: z.string().email('Format email tidak valid').optional().or(z.literal('')),
  clientPhone: z.string().optional(),
  selectedOptions: z.array(z.any()),
  estimatedPrice: z.number().positive(),
  estimatedDays: z.number().positive(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = estimatorSchema.parse(body);

    let savedSubmission = null;
    if (process.env.FIREBASE_PROJECT_ID) {
      const docRef = await db.collection('estimates').add({
        clientName: validatedData.clientName || 'Guest User',
        clientEmail: validatedData.clientEmail || null,
        clientPhone: validatedData.clientPhone || null,
        selectedOptions: validatedData.selectedOptions,
        estimatedPrice: validatedData.estimatedPrice,
        estimatedDays: validatedData.estimatedDays,
        createdAt: Timestamp.now(),
      });
      savedSubmission = { id: docRef.id, ...validatedData };
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Estimasi projek berhasil disimpan.',
        data: savedSubmission || validatedData,
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

    console.error('Error submitting estimate:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal memproses estimasi projek.' },
      { status: 500 }
    );
  }
}
