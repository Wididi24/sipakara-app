"use client";

import { useEffect, useState } from 'react'; // Import useEffect dan useState
import styles from "./sidebar.module.css";
import Image from 'next/image';
import MenuLink from "./menuLink/menuLink";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdAttachMoney,
    MdAnalytics,
    MdOutlineSettings,
    MdLogout,
} from "react-icons/md";

const menuItems = [
    {
        title: "Menu Utama",
        list: [
            { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
            { title: "Transaksi", path: "/dashboard/transaksi", icon: <MdAttachMoney /> },
            { title: "Anggota", path: "/dashboard/anggota", icon: <MdSupervisedUserCircle /> },
            { title: "Laporan", path: "/nopage", icon: <MdAnalytics /> },
        ],
    },
    {
        title: "Akun",
        list: [
            { title: "Pengaturan", path: "/nopage", icon: <MdOutlineSettings /> },
        ],
    },
];

const Sidebar = () => {
    const [username, setUsername] = useState('Guest'); // Default ke Guest
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ambil username dari localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        setLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username'); // Hapus username dari localStorage
        window.location.href = '/'; // Redirect ke halaman login
    };

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" alt="" width="50" height="50" />
                <div className={styles.userDetail}>
                    <span className={styles.username}>{loading ? 'Loading...' : username}</span>
                    <span className={styles.userTitle}>Administrator Koperasi</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map((item) => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
            <button className={styles.logout} onClick={handleLogout}>
                <MdLogout />
                Keluar
            </button>
            <div className={styles.webname}>
                SIPAKARA
                <div className={styles.description}>
                Sistem Informasi Pengelolaan Arus Kas Koperasi
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
