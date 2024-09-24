import styles from './pagination.module.css';
import Link from 'next/link';

const Pagination = ({ currentPage, totalPages }) => {
    return (
        <div className={styles.container}>
            <Link href={`?page=${currentPage - 1}`} passHref>
                <button className={styles.button} disabled={currentPage <= 1}>
                    Sebelumnya
                </button>
            </Link>
            <span className={styles.order}> Halaman {currentPage} dari {totalPages}</span>
            <Link href={`?page=${currentPage + 1}`} passHref>
                <button className={styles.button} disabled={currentPage >= totalPages}>
                    Berikutnya
                </button>
            </Link>
        </div>
    );
};

export default Pagination;
