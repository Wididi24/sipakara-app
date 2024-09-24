import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    if (searchParams.get('recent')) {
        // Endpoint untuk mengambil transaksi terbaru
        try {
            const transaksi = await prisma.transaksi.findMany({
                take: limit,
                orderBy: { tanggal: 'desc' }, // Mengurutkan berdasarkan tanggal terbaru
                include: {
                    anggota: true,
                },
            });

            return new Response(JSON.stringify({ transaksi }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error("Error fetching recent transactions:", error);
            return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
        }
    }

    try {
        const [transaksi, totalCount] = await Promise.all([
            prisma.transaksi.findMany({
                skip,
                take: limit,
                orderBy: { tanggal: 'desc' }, // Tambahkan pengurutan di sini
                include: {
                    anggota: true,
                },
            }),
            prisma.transaksi.count(),
        ]);    

        const anggotaList = await prisma.anggota.findMany({
            select: {
                id: true,
                fullname: true,
            },
        });

        return new Response(JSON.stringify({ transaksi, totalCount, anggotaList }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
    }
}

export async function POST(request) {
    const { jenisTransaksi, nominal, anggotaId, tanggal } = await request.json();

    try {
        const newTransaction = await prisma.transaksi.create({
            data: {
                jenisTransaksi,
                nominal: parseFloat(nominal),
                anggotaId: parseInt(anggotaId, 10), // Ensure it’s an integer
                tanggal: new Date(tanggal),
            },
        });

        return new Response(JSON.stringify(newTransaction), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error creating transaction:", error);
        return new Response(JSON.stringify({ error: 'Error creating transaction' }), { status: 500 });
    }
}
