import styles from './card.module.css';
import Link from 'next/link';

const Card = ({ title, number, icon, link }) => {
    return (
        <Link href={link} className={styles.link}>
            <div className={styles.container}>
                {icon}
                <div className={styles.texts}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.number}>{number}</span>
                </div>
            </div>
        </Link>
    );
};

export default Card;
