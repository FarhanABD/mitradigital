import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
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
    if (process.env.DATABASE_URL) {
      const dbProjects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbProjects.length > 0) {
        return NextResponse.json({ success: true, data: dbProjects });
      }
    }
    return NextResponse.json({ success: true, data: portfolioData });
  } catch (error) {
    return NextResponse.json({ success: true, data: portfolioData });
  }
}

// POST: Tambah projek baru ke database
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          success: false,
          message: 'DATABASE_URL belum dikonfigurasi. Hubungkan database PostgreSQL di Vercel/environment terlebih dahulu.'
        },
        { status: 400 }
      );
    }

    const createdProject = await prisma.project.create({
      data: {
        title: validatedData.title,
        category: validatedData.category,
        categoryLabel: validatedData.categoryLabel,
        description: validatedData.description,
        client: validatedData.client,
        technologies: validatedData.technologies,
        image: validatedData.image,
        images: validatedData.images || [validatedData.image],
        stats: validatedData.stats ? JSON.parse(JSON.stringify(validatedData.stats)) : undefined,
        liveUrl: validatedData.liveUrl || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Projek portofolio berhasil ditambahkan ke database!',
        data: createdProject,
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
