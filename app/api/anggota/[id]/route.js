// app/api/anggota/[id]/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { id } = params;
    const anggota = await prisma.anggota.findUnique({
        where: { id: Number(id) },
    });

    return new Response(JSON.stringify(anggota), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { fullname, phone, status } = await req.json();

    try {
        const updatedAnggota = await prisma.anggota.update({
            where: { id: Number(id) },
            data: { fullname, phone, status }, // Tidak menyertakan username
        });

        return new Response(JSON.stringify(updatedAnggota), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating anggota:', error);
        return new Response(JSON.stringify({ error: 'Error updating anggota' }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
