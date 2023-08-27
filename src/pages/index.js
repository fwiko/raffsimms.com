import { useEffect, useState } from "react";

import pageData from "./api/pageData.json";

import Head from "next/head";
import Grid from "../components/Grid/Grid";
import Card from "../components/Card/Card";
import LinkCard from "../components/Card/LinkCard";
import Section from "../components/Section/Section";
import Heading from "../components/Heading/Heading";

export default function Home() {
    const [currentAge, setAge] = useState(null);

    useEffect(() => {
        setAge(new Date(new Date() - new Date("August 12 2003")).getFullYear() - 1970);
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
        I{"'"}m a {currentAge}-year-old award-winning <span className="text-clr-highlight">Computer Systems (Cyber Security)</span> undergraduate, currently completing a placement at <a href="https://www.mercedes-amg-hpp.com/about-us/" target="_blank">Mercedes AMG HPP</a>. I have a passion for all things computing — with a career interest in IT/Cyber Security and Software Development.
    </>

    if (currentAge == null) return (null);

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
        </>

    );
}
