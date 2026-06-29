import React, { useState, useEffect } from "react";

function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className={`back-to-top ${isVisible ? "visible" : ""}`}
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            <i className="fas fa-arrow-up"></i>
            <span className="back-to-top-progress">
                <svg viewBox="0 0 36 36">
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                    />
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray={`${
                            (window.scrollY /
                                (document.body.scrollHeight -
                                    window.innerHeight)) *
                            100
                        }, 100`}
                    />
                </svg>
            </span>
        </button>
    );
}

export default BackToTop;
