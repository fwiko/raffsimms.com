import LinkButton from "../Button/LinkButton";
import styles from './Heading.module.scss';

export default function Heading({ title, subtext, links }) {
    // const [namePronunciationAudio, setNamePronunciationAudio] = useState(null);

    // useEffect(() => {
    //     setNamePronunciationAudio(new Audio("/audio/namePronunciation.mp3"))
    // }, []);

    // const playAudio = () => {
    //     namePronunciationAudio.play();
    // }

    return (
        <div className={styles.heading}>
            <div className="flex flex-direction-row flex-wrap gap-sm">
                <h1 className="font-size-lg text-clr-light font-weight-extrabold">
                    {title}
                </h1>
                {/* <IconButton icon="fa-solid fa-volume-high fa-2xl" onClick={playAudio} /> */}
            </div>

            <p className="font-size-sm text-clr-light-secondary">
                {subtext}
            </p>
            <div className="flex flex-direction-row flex-wrap gap-md ">
                {links ? links.map(link => {
                    return (
                        <LinkButton
                            href={link.href}
                            colour="primary"
                            key={link.name}
                            title={link.name}>
                            <i className={`${link.icon.type} fa-${link.icon.name} fa-2xl`} />
                        </LinkButton>
                    )
                }) : []
                }
            </div>
        </div >
    )
}