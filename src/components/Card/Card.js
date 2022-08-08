import Tag from '../Tag/Tag'
import styles from './Card.module.scss'

export default function Card({ title, subtext, pretext, tags }) {
    return (
        <div className={styles.card}>
            {pretext ? (
                <div className={`font-size-xs ${styles['card-pretext']}`}>{pretext}</div>
            ) : ''}
            <h2 className="text-clr-light font-weight-bold">{title}</h2>
            <hr />
            <p className="text-clr-light-secondary">{subtext}</p>
            {tags ? (
                <>
                    <hr />
                    <div className="flex flex-direction-row flex-wrap gap-sm ">
                        {tags.map((tag, i) => {
                            return (
                                <Tag text={tag} key={i + 1} />
                            )
                        })}
                    </div>
                </>

            ) : ''}
        </div>
    )
}