import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
    const { username, password } = await req.json(); // Ambil data dari body request

    // Validasi jika form kosong
    if (!username || !password) {
        return new Response(JSON.stringify({
            success: false,
            message: 'Silakan isi username dan password terlebih dahulu!',
        }), { status: 400 });
    }

    try {
        // Cari admin berdasarkan username
        const admin = await prisma.admin.findUnique({
            where: { username },
        });

        // Jika admin tidak ditemukan atau password salah
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Mohon maaf, username atau password Anda salah!',
            }), { status: 401 });
        }

        // Jika berhasil login, kembalikan respons sukses
        return new Response(JSON.stringify({
            success: true,
            message: 'Login berhasil!',
        }), { status: 200 });
    } catch (error) {
        console.error('Error logging in:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Terjadi kesalahan pada server.',
        }), { status: 500 });
    } finally {
        await prisma.$disconnect(); // Tutup koneksi Prisma
    }
}
