import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-col footer-brand">
                        <a href="#home" className="footer-logo">
                            <i className="fas fa-hexagon"></i> NEON
                            <span className="logo-accent">VERSE</span>
                        </a>
                        <p className="footer-desc">
                            Creating futuristic digital experiences that inspire
                            and innovate. Let's build the future together.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li>
                                <a href="#home">
                                    <i className="fas fa-chevron-right"></i>{" "}
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about">
                                    <i className="fas fa-chevron-right"></i>{" "}
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#skills">
                                    <i className="fas fa-chevron-right"></i>{" "}
                                    Skills
                                </a>
                            </li>
                            <li>
                                <a href="#projects">
                                    <i className="fas fa-chevron-right"></i>{" "}
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a href="#contact">
                                    <i className="fas fa-chevron-right"></i>{" "}
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul>
                            <li>
                                <a href="#">
                                    <i className="fas fa-chevron-right"></i> Web
                                    Development
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fas fa-chevron-right"></i>{" "}
                                    UI/UX Design
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fas fa-chevron-right"></i>{" "}
                                    Mobile Apps
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fas fa-chevron-right"></i>{" "}
                                    Consulting
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fas fa-chevron-right"></i>{" "}
                                    Branding
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Newsletter</h4>
                        <p className="footer-newsletter-text">
                            Subscribe for updates, tips, and insights.
                        </p>
                        <form
                            className="footer-newsletter-form"
                            onSubmit={e => e.preventDefault()}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                            <button type="submit">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} NeonVerse. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <span className="divider">|</span>
                        <a href="#">Terms of Service</a>
                    </div>
                    <p>
                        Designed with{" "}
                        <i
                            className="fas fa-heart"
                            style={{ color: "#ff3366" }}
                        ></i>{" "}
                        by Alex Neon
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
