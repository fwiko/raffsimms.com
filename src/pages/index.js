import { useEffect, useState } from "react";

import pageData from "./api/pageData.json";

import Head from "next/head";
import Grid from "../components/Grid/Grid";
import Card from "../components/Card/Card";
import Footer from "../components/Footer/Footer";
import LinkCard from "../components/Card/LinkCard";
import Section from "../components/Section/Section";
import Heading from "../components/Heading/Heading";


export default function Home() {
    const [currentAge, setAge] = useState(null);
    const [currentYear, setYear] = useState(null);

    useEffect(() => {
        setAge(new Date(new Date() - new Date("August 12 2003")).getFullYear() - 1970);
        setYear(new Date().getFullYear())
    }, []);

    const metaTags = <>
        <title>Raff Simms</title>
        <meta name="theme-color" content="#ffd700" />
        <meta name="og:type" content="website" />
        <meta name="og:name" content="Raff Simms" />
        <meta name="description" content={`I'm an undergraduate student from the United Kingdom, currently studying towards a Bachelor of Science (Hons) in Cyber Security.`} />
    </>

    const headingTitle = <>
        Hello <span className="wave">👋</span> I&apos;m <span className="text-clr-highlight">Rafferty</span>
    </>

    const headingSubtext = <>
        I&apos;m a {currentAge}-year-old undergraduate student from the United Kingdom, currently studying towards a{" "}
        <span className="text-clr-highlight">Bachelor of Science (Hons) in Cyber Security.</span>
        {" "}I have developed a passion for all things computing, with a particular interest{" "}
        in computer security and backend development.
    </>

    return (
        <>
            <Head>
                {metaTags}
            </Head>

            <Heading
                title={headingTitle}
                subtext={headingSubtext}
                links={pageData.externalLinks}
            />

            {pageData.sections.map(section => {
                return (
                    <Section
                        heading={section.heading}
                        subtext={section.subtext}
                        key={section.id}>
                        <Grid className={`grid-cols-${section.gridColumnWidth}`}>
                            {section.elements.map(element => {
                                return (
                                    element.link ?
                                        (
                                            < LinkCard key={element.id}
                                                title={element.title}
                                                subtext={element.subtext}
                                                pretext={element.pretext}
                                                link={element.link}
                                                tags={element.tags}
                                            />
                                        ) : (
                                            <Card key={element.id}
                                                title={element.title}
                                                subtext={element.subtext}
                                                pretext={element.pretext}
                                                tags={element.tags}
                                            />
                                        )
                                )
                            })}
                        </Grid>
                    </Section>
                )
            })}

            <Footer text={`Copyright © ${currentYear} Rafferty Simms`} />
        </>

    );
}