import Link from 'next/link';
import styles from './Custom404.module.css';  // Menggunakan CSS module untuk styling

export default function Custom404() {
    return (
        <div className={styles.container}>
            <div className={styles.overlay}>
                <h1 className={styles.title}>Halaman ini masih dalam pengerjaan</h1>
                <Link href="/dashboard">
                    <button className={styles.button}>
                        Kembali ke dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
}
