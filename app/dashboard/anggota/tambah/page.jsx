"use client";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';

const TambahAnggotaPage = () => {
    const router = useRouter(); // Untuk redirect nanti

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const fullname = formData.get("fullname");
        const username = formData.get("username");
        const phone = formData.get("phone");
        const status = formData.get("status");

        // Validasi input kosong
        if (!fullname || !username || !phone || !status) {
            Swal.fire({
                icon: 'warning',
                title: 'Input tidak lengkap',
                text: 'Silakan isi identitas anggota dengan lengkap!',
            });
            return;
        }

        // Kirim data ke API
        try {
            const response = await fetch('/api/anggota/tambah', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullname, username, phone, status }),
            });

            const result = await response.json();

            // Jika username sudah ada
            if (response.status === 400 && result.message === 'Username sudah terdaftar. Mohon gunakan username yang lain.') {
                Swal.fire({
                    icon: 'error',
                    title: 'Username sudah terdaftar',
                    text: 'Mohon gunakan username yang lain, username ini sudah terdaftar!',
                });
                return;
            }

            // Jika berhasil
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: `Anggota atas nama ${fullname} berhasil terdaftarkan!`,
                }).then(() => {
                    // Redirect dan refresh ke halaman dashboard
                    router.push('/dashboard/anggota');
                });
            } else {
                // Jika terjadi error selain username sudah terdaftar
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat menambahkan anggota.',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan koneksi.',
            });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgWrapper}>
                    <div className={styles.imgContainer}>
                        <Image src="/noavatar.png" alt="avatar" fill />
                    </div>
                </div>
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input 
                        type="text" 
                        name="fullname" 
                        placeholder="Nama Lengkap" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="Nomor Telepon" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="status" 
                        placeholder="Status" 
                        required 
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default TambahAnggotaPage;
