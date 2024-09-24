"use client";  // Menandakan bahwa komponen ini di-render di sisi client

import { useState } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert2 untuk client-side
import styles from '@/app/ui/login/login.module.css';
import Link from 'next/link';  // Import Link untuk navigasi

const LoginPage = () => {
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
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await res.json();

        // Tanggapi berdasarkan status dari API
        if (res.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.message,
            });
        } else if (res.status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.message,
            });
        } else if (result.success) {
            // Jika berhasil login, redirect ke dashboard
            localStorage.setItem('username', formData.username); // Simpan username
            window.location.href = '/dashboard';  // Redirect ke dashboard
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.title}>
                    <h1>SIPAKARA</h1>
                </div>
                <div className={styles.h2}>
                    Silakan Masukkan Username dan Password!
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
                    Masuk
                </button>
                <div className={styles.buttontext}>
                    Belum punya akun?
                    <Link href="/register">
                        <button className={styles.buttontextclick}>
                            Daftar sekarang
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
