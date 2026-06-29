import React, { useState, useEffect } from "react";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Detect active section
            const sections = [
                "home",
                "about",
                "skills",
                "music",
                "projects",
                "contact"
            ];
            for (let section of sections.reverse()) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#home", label: "Home", icon: "fas fa-home" },
        { href: "#about", label: "About", icon: "fas fa-user" },
        { href: "#skills", label: "Skills", icon: "fas fa-cog" },
        { href: "#music", label: "Music", icon: "fas fa-music" },
        { href: "#projects", label: "Projects", icon: "fas fa-briefcase" },
        { href: "#contact", label: "Contact", icon: "fas fa-envelope" }
    ];

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="nav-container">
                <a
                    href="#home"
                    className="nav-logo"
                    onClick={() => setMobileOpen(false)}
                >
                    <span className="logo-icon">
                        <i className="fas fa-hexagon"></i>
                    </span>
                    NEON<span className="logo-accent">VERSE</span>
                </a>

                <div className={`nav-menu ${mobileOpen ? "active" : ""}`}>
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className={`nav-link ${
                                activeSection === link.href.replace("#", "")
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => setMobileOpen(false)}
                        >
                            <i className={link.icon}></i>
                            <span>{link.label}</span>
                        </a>
                    ))}
                </div>

                <button
                    className={`hamburger ${mobileOpen ? "active" : ""}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
