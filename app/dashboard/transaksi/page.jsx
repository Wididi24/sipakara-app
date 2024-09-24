"use client";

import styles from './transaksi.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import { useEffect, useState } from 'react';
import ModalForm from '@/app/ui/dashboard/modal/modalForm';
import Image from 'next/image';  // Import Image component\

const TransaksiPage = ({ searchParams }) => {
    const page = parseInt(searchParams.page) || 1;
    const [transaksi, setTransaksi] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [anggotaList, setAnggotaList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const limit = 5;
    const totalPages = Math.ceil(totalCount / limit);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/transaksi?page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTransaksi(data.transaksi);
            setTotalCount(data.totalCount);
            setAnggotaList(data.anggotaList);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Optionally set an error state here to show a message in the UI
        }
    };    

    useEffect(() => {
        fetchData();
    }, [page]);

    const buatTransaksi = async (formData) => {
        try {
            const { jenis, nominal, anggota, tanggal } = formData;
    
            // Ensure anggota is converted to an integer
            const anggotaId = parseInt(anggota, 10);
            if (isNaN(anggotaId)) {
                throw new Error("Invalid anggota ID");
            }
    
            await fetch('/api/transaksi', {
                method: 'POST',
                body: JSON.stringify({
                    jenisTransaksi: jenis,  // Align with your table field name
                    nominal: parseFloat(nominal),  // Ensure nominal is a number
                    anggotaId,  // Use the converted integer
                    tanggal: new Date(tanggal),  // Ensure correct date format
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            fetchData(); // Refresh data after creating new transaction
        } catch (error) {
            console.error("Error creating transaction:", error);
        }
    };    

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Cari transaksi..." />
                <button className={styles.addButton} onClick={openModal}>Buat Transaksi</button>
            </div>
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
                                        src="/noavatar.png"  // Avatar placeholder
                                        alt="avatar"
                                        width={40}
                                        height={40}
                                        className={styles.userImage}
                                    />
                                    {trx.anggota.fullname}
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
            <Pagination currentPage={page} totalPages={totalPages} />
            <ModalForm 
                isOpen={isModalOpen} 
                onRequestClose={closeModal} 
                anggotaList={anggotaList} 
                buatTransaksi={buatTransaksi} 
            />
        </div>
    );
};

export default TransaksiPage;
