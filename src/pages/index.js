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
        <title>{pageData.head.title}</title>
        <meta name="theme-color" content={pageData.head.themeColor} />
        <meta name="og:type" content="website" />
        <meta name="og:name" content={pageData.head.name} />
        <meta name="description" content={pageData.head.description} />
    </>

    const headingTitle = <>
        Hello <span className="wave">👋</span> I&apos;m <span className="text-clr-highlight">Rafferty</span>
    </>

    const headingSubtext = <>
        I{"'"}m a {currentAge}-year-old award-winning undergraduate studying towards a <span className="text-clr-highlight ">Bachelor of Science (Hons) in Computer Systems (Cyber Security)</span> at Nottingham Trent University. I have a passion for all things computing — with a career interest in IT Security and Software Development.
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

            <Footer text={`Rafferty Simms © ${currentYear} • All Rights Reserved`} />
        </>

    );
}
