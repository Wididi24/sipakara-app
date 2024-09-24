import { PrismaClient } from '@prisma/client';
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { redirect } from 'next/navigation';
import DeleteButton from '@/app/ui/dashboard/users/deleteUser/DeleteButton';

const prisma = new PrismaClient();

// Server action to handle deletion
export const deleteAnggota = async (id) => {
    "use server"; // Mark this as a server action

    try {
        await prisma.anggota.delete({
            where: { id: Number(id) },
        });
    } catch (error) {
        console.error("Error deleting anggota:", error);
    } finally {
        await prisma.$disconnect();
    }

    redirect('/dashboard/anggota');
};

// Fetch members with pagination
const getAnggota = async (page = 1, limit = 5) => {
    const skip = (page - 1) * limit;
    const [anggota, totalCount] = await Promise.all([
        prisma.anggota.findMany({
            skip,
            take: limit,
        }),
        prisma.anggota.count(),
    ]);

    return { anggota, totalCount };
};

const AnggotaPage = async ({ searchParams }) => {
    const page = parseInt(searchParams.page) || 1; // Get page from query params, default to 1
    const { anggota, totalCount } = await getAnggota(page);
    const totalPages = Math.ceil(totalCount / 5); // Calculate total pages

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Cari anggota..." />
                <Link href="/dashboard/anggota/tambah">
                    <button className={styles.addButton}>Tambah anggota</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.column}>
                        <td>Nama Lengkap</td>
                        <td>Username</td>
                        <td>Nomor Telepon</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {anggota.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <div className={styles.user}>
                                    <Image
                                        src="/noavatar.png"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className={styles.userImage}
                                    />
                                    {user.fullname}
                                </div>
                            </td>
                            <td>{user.username}</td>
                            <td>{user.phone}</td>
                            <td>{user.status}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/anggota/${user.id}?username=${user.username}`}>
                                        <button className={`${styles.button} ${styles.view}`}>
                                            Update
                                        </button>
                                    </Link>
                                    <DeleteButton userId={user.id} userName={user.fullname} onDelete={deleteAnggota} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={page} totalPages={totalPages} />
        </div>
    );
};

export default AnggotaPage;
