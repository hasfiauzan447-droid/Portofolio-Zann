import React, { useState, useEffect } from "react";

function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsVisible(false);
                        setTimeout(onComplete, 500);
                    }, 400);
                    return 100;
                }
                return prev + Math.random() * 8 + 3;
            });
        }, 60);

        return () => clearInterval(interval);
    }, [onComplete]);

    if (!isVisible) {
        return (
            <div className="loading-screen fade-out">
                <div className="loading-content">
                    <div className="loading-logo">NV</div>
                </div>
            </div>
        );
    }

    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="loading-logo">
                    <span className="loading-logo-text">NV</span>
                    <div className="loading-logo-glow"></div>
                </div>
                <div className="loading-bar-container">
                    <div className="loading-bar-glow"></div>
                    <div
                        className="loading-bar"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="loading-bar-shine"></div>
                    </div>
                </div>
                <p className="loading-text">
                    {progress < 100
                        ? "INITIALIZING SYSTEM..."
                        : "WELCOME TO NEONVERSE"}
                </p>
                <p className="loading-percentage">{Math.floor(progress)}%</p>
            </div>
            <div className="loading-particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="loading-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default LoadingScreen;
