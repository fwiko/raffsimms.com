import styles from './Button.module.scss'
import Link from 'next/link'

export default function LinkButton({ children, href, title, internal = false }) {


    return (
        internal ? (
            <Link href={href} title={title} passHref><span className={`${styles.btn} ${styles['btn-primary']}`}>Go back home</span></Link>
        ) : (
            <a href={href} target="_blank" rel="noreferrer" title={title} className={`${styles.btn} ${styles['btn-primary']} ${styles['btn-icon'] ? styles['btn-icon'] : ''}`}>
                {children}
            </a >
        )
    )

}