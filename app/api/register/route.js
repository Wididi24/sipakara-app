import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
    const { username, password } = await req.json();  // Ambil data dari body request

    // Hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Cek apakah username sudah ada di database
        const existingAdmin = await prisma.admin.findUnique({
            where: { username },
        });

        if (existingAdmin) {
            return new Response(JSON.stringify({
                success: false,
                message: `Mohon maaf, ${username} sudah terdaftar sebagai admin!` // Pesan khusus
            }), { status: 400 });  // Username sudah ada, kembalikan response error
        }

        // Jika username belum ada, buat akun admin baru
        await prisma.admin.create({
            data: {
                username,
                password: hashedPassword,  // Simpan password yang sudah di-hash
            },
        });

        // Kembalikan response sukses
        return new Response(JSON.stringify({
            success: true,
            message: 'Admin berhasil didaftarkan!'
        }), { status: 200 });
    } catch (error) {
        console.error('Error registering admin:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Terjadi kesalahan.'
        }), { status: 500 });
    } finally {
        await prisma.$disconnect();  // Pastikan Prisma ditutup setelah operasi selesai
    }
}
