import { useState, useEffect, useRef } from "react";

export function useCounter(target, duration = 2000, startOnView = true) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnView);
    const ref = useRef(null);

    useEffect(() => {
        if (!startOnView) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startOnView]);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, target, duration]);

    return { count, ref };
}
