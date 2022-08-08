import styles from './Button.module.scss'

export default function IconButton({ onClick, icon }) {
    return (
        <button rel="noreferrer" onClick={onClick} className={`${styles['btn']} ${styles["btn-icon"]} text-clr-light `}>
            <i className={icon} />
        </button>
    );
}