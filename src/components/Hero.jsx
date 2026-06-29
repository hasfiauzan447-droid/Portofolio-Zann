import React, { useState, useEffect } from "react";
import { useTypewriter } from "../hooks/useTypewriter";

function Hero() {
    const roles = [
        "Fullstack Developer",
        "UI/UX Designer",
        "Creative Technologist",
        "Digital Architect",
        "Problem Solver"
    ];

    const currentRole = useTypewriter(roles, 80, 50, 2000);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = e => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section id="home" className="hero-section">
            <div className="hero-bg">
                <div className="grid-overlay"></div>
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="hero-container">
                <div className="hero-image-col">
                    <div className="hero-image-frame">
                        <div className="frame-glow-border"></div>
                        <div className="frame-glow-border-2"></div>
                        <img
                            src="https://placehold.co/400x400/1a1a2e/00BFFF?text=AN"
                            alt="Alex Neon"
                            className="hero-img"
                        />
                        <div className="hero-img-glow"></div>
                    </div>
                    <div className="hero-status-badge">
                        <span className="status-pulse-dot"></span>
                        Available for Projects
                    </div>
                    <div className="hero-social-mini">
                        <a
                            href="https://github.com/alexneon"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-github"></i>
                        </a>
                        <a
                            href="https://linkedin.com/in/alexneon"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a
                            href="https://instagram.com/alexneon.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                <div className="hero-text-col">
                    <p className="hero-greeting">
                        <span className="wave-emoji">👋</span> Hello, I'm
                    </p>
                    <h1 className="hero-name">
                        Alex <span className="gradient-text">Neon</span>
                    </h1>
                    <div className="hero-role-wrapper">
                        <span className="role-label">I'm a</span>
                        <span className="role-dynamic">{currentRole}</span>
                        <span className="role-cursor">|</span>
                    </div>
                    <p className="hero-description">
                        Crafting next-generation digital experiences with
                        cutting-edge technology, futuristic design, and
                        immersive interactions that push the boundaries of web
                        development.
                    </p>

                    <div className="hero-cta">
                        <a href="#projects" className="btn btn-primary">
                            <span>View My Work</span>
                            <i className="fas fa-arrow-right"></i>
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            <span>Get In Touch</span>
                            <i className="fas fa-paper-plane"></i>
                        </a>
                        <a
                            href="https://wa.me/6281234567890?text=Halo%20Alex%2C%20saya%20tertarik%20dengan%20portfolio%20Anda!"
                            className="btn btn-wa"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-whatsapp"></i>
                            <span>WhatsApp</span>
                        </a>
                    </div>

                    <div className="hero-stats-row">
                        <div className="stat-card">
                            <span className="stat-number" data-target="150">
                                150
                            </span>
                            <span className="stat-label">Projects Done</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number" data-target="8">
                                8
                            </span>
                            <span className="stat-label">Years Exp.</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number" data-target="60">
                                60
                            </span>
                            <span className="stat-label">Happy Clients</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number" data-target="25">
                                25
                            </span>
                            <span className="stat-label">Awards Won</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <span>Scroll Down</span>
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
