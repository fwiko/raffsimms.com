import LinkButton from "../Button/LinkButton";

import styles from './Heading.module.scss';

import { useState, useEffect } from "react";

import IconButton from "../Button/IconButton";

export default function Heading({ title, subtext, links }) {
    const [namePronunciationAudio, setNamePronunciationAudio] = useState(null);

    useEffect(() => {
        setNamePronunciationAudio(new Audio("/static/audio/namePronunciation.wav"))
    }, []);

    const playAudio = () => {
        namePronunciationAudio.play();
    }

    return (
        <div className={styles.heading}>
            <div className="flex flex-direction-row flex-wrap gap-sm">
                <h1 className="font-size-lg text-clr-light font-weight-extrabold">
                    {title}
                </h1>
                <IconButton icon="fa-solid fa-volume-high fa-2xl" onClick={playAudio} />
            </div>

            <p className="font-size-sm text-clr-light-secondary font-weight-bold">
                {subtext}
            </p>
            <div className="flex flex-direction-row flex-wrap gap-md ">
                {links.map(link => {
                    return (
                        <LinkButton
                            href={link.href}
                            colour="primary"
                            key={link.name}
                            title={link.name}>
                            <i className={`${link.icon.type} fa-${link.icon.name} fa-2xl`} />
                        </LinkButton>
                    )
                })
                }
            </div>
        </div >
    )
}