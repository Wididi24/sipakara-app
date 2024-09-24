import Modal from 'react-modal';
import styles from './modalForm.module.css'; // Mengimpor file CSS yang digunakan untuk styling modal
import { useState } from 'react';

const ModalForm = ({ isOpen, onRequestClose, anggotaList, buatTransaksi }) => {
    const [jenis, setJenis] = useState("");
    const [nominal, setNominal] = useState("");
    const [anggota, setAnggota] = useState("");
    const [tanggal, setTanggal] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            jenis,
            nominal,
            anggota,
            tanggal,
        };

        await buatTransaksi(formData); // Mengirim data ke server action di page.jsx
        onRequestClose(); // Menutup modal setelah submit
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal}>
            <h2 className={styles.modalTitle}>Buat Transaksi</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <select 
                    name="jenis" 
                    required 
                    value={jenis} 
                    onChange={(e) => setJenis(e.target.value)}
                    className={styles.select}
                >
                    <option value="" disabled>Pilih jenis transaksi</option>
                    <option value="Simpan">Simpan</option>
                    <option value="Pinjam">Pinjam</option>
                </select>

                <input 
                    type="text" 
                    name="nominal" 
                    placeholder="Ketik nominal transaksi" 
                    required 
                    value={nominal}
                    onChange={(e) => setNominal(e.target.value)}
                    className={styles.input}
                />

                <select 
                    name="anggota" 
                    required 
                    value={anggota}
                    onChange={(e) => setAnggota(e.target.value)}
                    className={styles.select}
                >
                    <option value="" disabled>Pilih Anggota</option>
                    {anggotaList.map((anggota) => (
                        <option key={anggota.id} value={anggota.id}>
                            {anggota.fullname}
                        </option>
                    ))}
                </select>

                <input 
                    type="date" 
                    name="tanggal" 
                    required 
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className={styles.input}
                />

                <div className={styles.buttons}>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                    <button type="button" onClick={onRequestClose} className={styles.closeButton}>Batal</button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalForm;
