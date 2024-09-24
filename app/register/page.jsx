"use client";  // Menandakan bahwa komponen ini di-render di sisi client

import { useState } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert2 untuk client-side
import styles from '@/app/ui/register/register.module.css';
import Link from 'next/link';  // Import Link untuk navigasi

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Mencegah form refresh halaman

        // Kirim data ke API route
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await res.json();

        // Jika sukses, tampilkan SweetAlert sukses
        if (result.success) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: result.message,
            }).then(() => {
                window.location.href = '/dashboard';  // Redirect ke dashboard
            });
        } else {
            // Jika gagal, tampilkan SweetAlert error
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: result.message,
            });
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.title}>
                    <h1>SIPAKARA</h1>
                </div>
                <div className={styles.h2}>
                    Silakan Masukkan Username dan Password untuk mendaftar!
                </div>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}  // Menangani perubahan input username
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}  // Menangani perubahan input password
                    required
                />
                <button type="submit" className={styles.button}>
                    Daftarkan Akun
                </button>
                <div className={styles.buttontext}>
                    Sudah punya akun?
                    <Link href="/">
                        <button className={styles.buttontextclick}>
                            Masuk
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
