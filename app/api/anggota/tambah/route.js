// app/api/anggota/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    const { fullname, username, phone, status } = await req.json();

    try {
        // Cek apakah username sudah ada
        const existingUser = await prisma.anggota.findUnique({
            where: {
                username: username,
            },
        });

        if (existingUser) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Username sudah terdaftar. Mohon gunakan username yang lain.',
            }), { status: 400 });
        }

        // Tambahkan anggota baru ke database jika username belum ada
        const newAnggota = await prisma.anggota.create({
            data: {
                fullname,
                username,
                phone,
                status,
            },
        });

        return new Response(JSON.stringify({
            success: true,
            message: 'Anggota berhasil ditambahkan!',
            data: newAnggota,
        }), { status: 200 });
    } catch (error) {
        console.error('Error adding anggota:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Terjadi kesalahan saat menambahkan anggota.',
        }), { status: 500 });
    } finally {
        await prisma.$disconnect(); // Tutup koneksi Prisma
    }
}
