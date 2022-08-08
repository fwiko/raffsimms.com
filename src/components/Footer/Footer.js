import styles from './Footer.module.scss';

export default function Footer({ text }) {
    return (
        <div className={styles.footer}>
            <span className="text-clr-light">{text}</span>
        </div>
    )
}