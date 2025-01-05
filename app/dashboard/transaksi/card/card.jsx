"use client";

import styles from '../transaksi.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image'; 

const CardTransaksi = () => {
    const [transaksi, setTransaksi] = useState([]);

    const fetchRecentTransactions = async () => {
        try {
            const response = await fetch('/api/transaksi'); // Endpoint untuk mendapatkan transaksi terbaru
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTransaksi(data.transaksi);
        } catch (error) {
            console.error("Error fetching recent transactions:", error);
        }
    };

    useEffect(() => {
        fetchRecentTransactions();
    }, []);

    return (
        <div className={styles.container}>
            <h2>Transaksi Terbaru</h2>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.column}>
                        <td>Nama Anggota</td>
                        <td>Jenis Transaksi</td>
                        <td>Tanggal</td>
                        <td>Nominal</td>
                    </tr>
                </thead>
                <tbody>
    {transaksi.map((trx) => (
        <tr key={trx.id}>
            <td>
                <div className={styles.user}>
                    <Image
                        src="/noavatar.png"
                        alt="avatar"
                        width={40}
                        height={40}
                        className={styles.userImage}
                    />
                    {trx.anggota ? trx.anggota.fullname : "Anggota Lama"}
                </div>
            </td>
            <td>
                <span className={`${styles.jenis} ${styles[trx.jenisTransaksi.toLowerCase()]}`}>
                    {trx.jenisTransaksi}
                </span>
            </td>
            <td>{new Date(trx.tanggal).toLocaleDateString()}</td>
            <td>Rp{trx.nominal.toLocaleString('id-ID')}</td>
        </tr>
    ))}
</tbody>
            </table>
        </div>
    );
};

export default CardTransaksi;
