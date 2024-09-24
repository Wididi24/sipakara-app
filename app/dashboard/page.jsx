import { PrismaClient } from '@prisma/client';
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from '../ui/dashboard/dashboard.module.css';
import CardTransaksi from "./transaksi/card/card"
import { MdSupervisedUserCircle, MdAttachMoney, MdCreditCard } from 'react-icons/md';

const prisma = new PrismaClient();

// Fetch counts and totals
const getCounts = async () => {
    const [anggotaCount, totalSimpan, totalPinjam] = await Promise.all([
        prisma.anggota.count(), // Menghitung jumlah anggota
        prisma.transaksi.aggregate({
            _sum: {
                nominal: true,
            },
            where: { jenisTransaksi: 'Simpan' },
        }),
        prisma.transaksi.aggregate({
            _sum: {
                nominal: true,
            },
            where: { jenisTransaksi: 'Pinjam' },
        }),
    ]);

    return {
        anggotaCount,
        totalSimpan: totalSimpan._sum.nominal || 0, // Menetapkan nilai default 0 jika tidak ada
        totalPinjam: totalPinjam._sum.nominal || 0, // Menetapkan nilai default 0 jika tidak ada
    };
};

const Dashboard = async () => {
    const { anggotaCount, totalSimpan, totalPinjam } = await getCounts();

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card 
                        title="Jumlah Anggota" 
                        number={anggotaCount} 
                        icon={<MdSupervisedUserCircle size={24} />} 
                        link="/dashboard/anggota" // Redirect to anggota page
                    />
                    <Card 
                        title="Total Simpanan" 
                        number={`Rp ${totalSimpan.toLocaleString()}`} 
                        icon={<MdAttachMoney size={24} />} 
                        link="/dashboard/transaksi" // Redirect to transaksi page
                    />
                    <Card 
                        title="Total Pinjaman" 
                        number={`Rp ${totalPinjam.toLocaleString()}`} 
                        icon={<MdCreditCard size={24} />} 
                        link="/dashboard/transaksi" // Redirect to transaksi page
                    />
                </div>
                <CardTransaksi />
                <Chart />
            </div>
        </div>
    );
};

export default Dashboard;
