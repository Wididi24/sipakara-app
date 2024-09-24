import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        // Fetch all transactions from the last 12 months
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12); // 12 months ago

        const transactions = await prisma.transaksi.findMany({
            where: {
                tanggal: {
                    gte: twelveMonthsAgo,
                },
            },
            orderBy: { tanggal: 'asc' }, // Order by date ascending
        });

        const monthlyData = [
            { month: 'Januari', simpan: 0, pinjam: 0 },
            { month: 'Februari', simpan: 0, pinjam: 0 },
            { month: 'Maret', simpan: 0, pinjam: 0 },
            { month: 'April', simpan: 0, pinjam: 0 },
            { month: 'Mei', simpan: 0, pinjam: 0 },
            { month: 'Juni', simpan: 0, pinjam: 0 },
            { month: 'Juli', simpan: 0, pinjam: 0 },
            { month: 'Agustus', simpan: 0, pinjam: 0 },
            { month: 'September', simpan: 0, pinjam: 0 },
            { month: 'Oktober', simpan: 0, pinjam: 0 },
            { month: 'November', simpan: 0, pinjam: 0 },
            { month: 'Desember', simpan: 0, pinjam: 0 },
        ];

        // Aggregate transaction data into monthly summaries
        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.tanggal);
            const monthIndex = transactionDate.getMonth(); // 0 = January, 11 = December

            if (transaction.jenisTransaksi === 'Simpan') {
                monthlyData[monthIndex].simpan += transaction.nominal; // Add to simpan
            } else if (transaction.jenisTransaksi === 'Pinjam') {
                monthlyData[monthIndex].pinjam += transaction.nominal; // Add to pinjam
            }
        });

        return new Response(JSON.stringify(monthlyData), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error fetching monthly data:", error);
        return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
    }
}
