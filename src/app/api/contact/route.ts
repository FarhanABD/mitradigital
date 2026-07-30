import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db, Timestamp } from '@/lib/firebase';
import { Resend } from 'resend';

// Schema validasi request kontak dengan Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().optional(),
  serviceType: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // 1. Simpan Lead ke Firestore (Jika FIREBASE_PROJECT_ID dikonfigurasi)
    let savedLead = null;
    if (process.env.FIREBASE_PROJECT_ID) {
      const docRef = await db.collection('contacts').add({
        ...validatedData,
        status: 'NEW',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      savedLead = { id: docRef.id, ...validatedData };
    }

    // 2. Kirim Notifikasi Email jika RESEND_API_KEY diset
    if (resend && process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'Mitra Digital <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `[Lead Baru] Pesan dari ${validatedData.name}`,
        html: `
          <h3>Ada pesan baru dari website Mitra Digital Solution</h3>
          <p><strong>Nama:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>No HP/WA:</strong> ${validatedData.phone || '-'}</p>
          <p><strong>Layanan:</strong> ${validatedData.serviceType || '-'}</p>
          <p><strong>Estimasi Budget:</strong> ${validatedData.budgetRange || '-'}</p>
          <p><strong>Pesan:</strong></p>
          <blockquote style="background: #f4f4f4; padding: 10px; border-left: 3px solid #0284c7;">
            ${validatedData.message}
          </blockquote>
        `,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Pesan Anda berhasil terkirim! Tim Mitra Digital akan segera menghubungi Anda.',
        data: savedLead || validatedData,
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

    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengirim pesan. Silakan coba lagi nanti.' },
      { status: 500 }
    );
  }
}
