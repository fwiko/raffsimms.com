import styles from './Grid.module.scss';

export default function Grid({ children, className, ...props }) {
    let finalClassName = styles.grid;

    if (className) {
        finalClassName = `${finalClassName} ${styles[className]}`;
    }

    return (
        <div className={finalClassName}>
            {children}
        </div>
    )
}