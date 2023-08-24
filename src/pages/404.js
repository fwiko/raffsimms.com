// 404.js

import Heading from "../components/Heading/Heading";
import { useState, useEffect } from 'react';

export default function NotFound(props) {
    const [currentUrl, setCurrentUrl] = useState(null);

    useEffect(() => {
        setCurrentUrl(window.location.pathname);
    }, []);

    const requestErrorMessage = <>
        Page <span className="text-clr-highlight">{currentUrl}</span> Not Found
    </>

    console.log(props);
    return <>
        <Heading
            title="404"
            subtext={requestErrorMessage}
        />
    </>
}
