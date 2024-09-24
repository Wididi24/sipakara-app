"use client"

import { usePathname, useSearchParams } from 'next/navigation';
import styles from './navbar.module.css';

const Navbar = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const username = searchParams.get('username'); // Ambil username dari query params

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {username || pathname.split("/").pop()} {/* Tampilkan username jika ada, jika tidak tampilkan ID */}
            </div>
        </div>
    );
}

export default Navbar;
