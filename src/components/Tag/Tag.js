import styles from './Tag.module.scss';

export default function Tag({ text }) {
    return (
        <div className={`${styles.tag} font-weight-bold`}>
            {text}
        </div>
    )
}