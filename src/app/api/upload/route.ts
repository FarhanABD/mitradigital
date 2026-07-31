import { NextResponse } from 'next/server';
import { storage } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Tidak ada file yang diunggah.' },
        { status: 400 }
      );
    }

    // Validasi tipe file (hanya gambar)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'File yang diunggah harus berupa gambar.' },
        { status: 400 }
      );
    }

    // Validasi ukuran (maksimal 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Ukuran file maksimal 5MB.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Coba upload ke Firebase Storage jika credentials tersedia
    if (process.env.FIREBASE_PROJECT_ID) {
      try {
        const bucket = storage.bucket();
        const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const destination = `portfolio/${Date.now()}_${cleanFileName}`;
        const fileRef = bucket.file(destination);

        await fileRef.save(buffer, {
          metadata: {
            contentType: file.type,
          },
          resumable: false,
        });

        // Coba makePublic atau gunakan Firebase Download URL
        try {
          await fileRef.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
          return NextResponse.json({
            success: true,
            url: publicUrl,
            message: 'Gambar berhasil diunggah ke Firebase Storage!',
          });
        } catch {
          // Jika makePublic gagal (misal constraint IAM), gunakan download media token URL
          const mediaUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destination)}?alt=media`;
          return NextResponse.json({
            success: true,
            url: mediaUrl,
            message: 'Gambar berhasil diunggah ke Firebase Storage!',
          });
        }
      } catch (storageError) {
        console.warn('Gagal upload ke Firebase Storage, beralih ke format Base64 Data URL:', storageError);
      }
    }

    // Fallback: Mengubah ke format Data URL (Base64) jika Firebase Storage tidak dikonfigurasi
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
    return NextResponse.json({
      success: true,
      url: base64Image,
      message: 'Gambar berhasil dikonversi dan siap disimpan.',
    });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Gagal memproses file upload.' },
      { status: 500 }
    );
  }
}
