import Tag from '../Tag/Tag'
import styles from './Card.module.scss'

export default function LinkCard({ title, subtext, pretext, link, tags }) {
    return (
        <a href={link} target="_blank" rel="noreferrer">
            <div className={styles.card}>
                {pretext ? (
                    <div className={`${styles['card-pretext']}`}>{pretext}</div>
                ) : ''}
                <h2 className="text-clr-light font-weight-bold">
                    {title + " "}
                    <i className="fa-solid fa-arrow-up-right-from-square text-clr-highlight" style={{ display: 'inline-block' }} />
                </h2>
                <hr />
                <p className="text-clr-light-secondary">{subtext}</p>
                {tags ? (
                    <>
                        <div className={`${styles['card-tags']} flex flex-direction-row flex-wrap gap-sm`}>
                            {tags.map((tag, i) => {
                                return (
                                    <Tag text={tag} key={i + 1} />
                                )
                            })}
                        </div>
                    </>
                ) : ''}
            </div>
        </a>
    )
}