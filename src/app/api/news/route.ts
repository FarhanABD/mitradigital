import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/articles';

export const dynamic = 'force-dynamic';

// GET: Ambil daftar artikel berita yang sudah dipublikasikan (published only)
export async function GET() {
  try {
    const articles = await getArticles(true);
    return NextResponse.json({ success: true, data: articles });
  } catch (error: any) {
    console.error('Error fetching published articles via API:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Gagal memuat artikel' },
      { status: 500 }
    );
  }
}
