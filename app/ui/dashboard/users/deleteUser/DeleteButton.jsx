// components/DeleteButton.jsx
"use client";

import Swal from 'sweetalert2';
import styles from '@/app/ui/dashboard/users/users.module.css';

const DeleteButton = ({ userId, userName, onDelete }) => {
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: `Hapus ${userName} dari keanggotaan koperasi?`,
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            await onDelete(userId); // Panggil fungsi onDelete yang diteruskan dari props
            Swal.fire('Dihapus!', `${userName} telah dihapus.`, 'success');
        }
    };

    return (
        <button
            type="button"
            className={`${styles.button} ${styles.delete}`}
            onClick={handleDelete}
        >
            Hapus
        </button>
    );
};

export default DeleteButton;
