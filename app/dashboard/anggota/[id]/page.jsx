"use client";

import { useEffect, useState } from 'react';
import styles from '@/app/ui/dashboard/users/singleUser/singleUser.module.css';
import Image from 'next/image';
import Swal from 'sweetalert2';

const LihatUserPage = ({ params }) => {
    const { id } = params; // Ambil ID dari parameter
    const [anggota, setAnggota] = useState(null);

    // Fetch data anggota berdasarkan ID
    useEffect(() => {
        const fetchAnggota = async () => {
            const res = await fetch(`/api/anggota/${id}`);
            const data = await res.json();
            setAnggota(data);
        };

        fetchAnggota();
    }, [id]);

    // Handler untuk melakukan update
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const updatedData = {
            fullname: formData.get('fullname'),
            phone: formData.get('phone'),
            status: formData.get('status'),
        };

        const result = await Swal.fire({
            title: 'Simpan perubahan identitas anggota?',
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            await fetch(`/api/anggota/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            Swal.fire('Berhasil!', 'Data anggota telah diperbarui.', 'success');
            window.location.href = `/dashboard/anggota/${id}`; // Redirect ke halaman anggota
        } else {
            Swal.fire('Dibatalkan', 'Perubahan tidak disimpan.', 'info');
        }
    };

    if (!anggota) return <div>Loading...</div>; // Tampilkan loading jika data belum ada

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt="" fill />
                </div>
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleUpdate} className={styles.form}>
                    <label>Nama Lengkap</label>
                    <input type="text" name="fullname" defaultValue={anggota.fullname} placeholder={anggota.fullname} />
                    <label>Username</label>
                    <input type="text" name="username" value={anggota.username} readOnly placeholder={anggota.username} />
                    <label>Nomor Telepon</label>
                    <input type="text" name="phone" defaultValue={anggota.phone} placeholder={anggota.phone} />
                    <label>Status</label>
                    <input type="text" name="status" defaultValue={anggota.status} placeholder={anggota.status} />
                    <button type="submit">Update Informasi</button>
                </form>
            </div>
        </div>
    );
};

export default LihatUserPage;
