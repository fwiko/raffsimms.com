import styles from '../Section/Section.module.scss';

export default function Section({ children, id, heading, subtext, ...props }) {
    return (
        <div className={styles.section} key={id}>
            <h2 className="text-clr-light font-size-md font-weight-extrabold">{heading}</h2>
            <hr />
            <p className="text-clr-light-secondary font-size-sm font-weight-bold">{subtext}</p>
            {children}
        </div>
    )
}
