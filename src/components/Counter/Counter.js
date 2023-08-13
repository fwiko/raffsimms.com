import { useEffect, useState } from "react";

export default function Counter(props) {
    const { number, duration } = props;

    const [count, setCount] = useState(0);

    useEffect(() => {
        const start = 0;
        const end = number;

        if (start >= end) return;

        const incrementTime = (duration / end) * 1000;

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return function () {
            setCount(0);
            clearInterval(timer);
        };
    }, [number, duration]);

    return String(count).padStart(2, "0");
};

