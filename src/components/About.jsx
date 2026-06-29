import React, { useEffect, useRef, useState } from "react";

function About() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const stats = [
        { value: 150, label: "Projects Done", icon: "fas fa-check-circle" },
        { value: 8, label: "Years Experience", icon: "fas fa-briefcase" },
        { value: 60, label: "Happy Clients", icon: "fas fa-smile" },
        { value: 25, label: "Awards Won", icon: "fas fa-trophy" }
    ];

    const hobbies = [
        { icon: "fas fa-headphones", label: "Music" },
        { icon: "fas fa-gamepad", label: "Gaming" },
        { icon: "fas fa-book", label: "Reading" },
        { icon: "fas fa-camera", label: "Photography" },
        { icon: "fas fa-plane", label: "Travel" },
        { icon: "fas fa-dumbbell", label: "Fitness" }
    ];

    return (
        <section id="about" className="about-section" ref={sectionRef}>
            <div className="section-container">
                <div className="section-header reveal">
                    <span className="section-badge">
                        <i className="fas fa-user-astronaut"></i> About Me
                    </span>
                    <h2 className="section-title">
                        Who <span className="gradient-text">I Am</span>
                    </h2>
                    <p className="section-subtitle">
                        Digital architect crafting the future of web experiences
                    </p>
                </div>

                <div className="about-grid">
                    {/* Image Column */}
                    <div className="about-image-col reveal">
                        <div className="about-image-wrapper">
                            <div className="about-image-frame">
                                <img
                                    src="https://placehold.co/600x700/1a1a2e/A020F0?text=Alex+Neon"
                                    alt="Alex Neon"
                                    className="about-img"
                                />
                                <div className="about-image-border"></div>
                            </div>
                            <div className="about-experience-badge">
                                <span className="exp-number">8+</span>
                                <span className="exp-text">
                                    Years of Excellence
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="about-text-col reveal">
                        <h3 className="about-heading">
                            Digital Architect &{" "}
                            <span className="gradient-text">
                                Creative Technologist
                            </span>
                        </h3>

                        <p className="about-description">
                            With over 8 years of experience in web development
                            and digital design, I specialize in creating
                            high-performance, visually stunning applications
                            that deliver exceptional user experiences.
                        </p>

                        <p className="about-description">
                            My approach combines technical expertise with
                            creative vision, ensuring every project not only
                            functions flawlessly but also captivates and engages
                            users from the very first interaction.
                        </p>

                        {/* Quick Info */}
                        <div className="about-quick-info">
                            <div className="quick-info-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <span>Location</span>
                                    <strong>San Francisco, CA</strong>
                                </div>
                            </div>
                            <div className="quick-info-item">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <span>Email</span>
                                    <strong>hello@neonverse.dev</strong>
                                </div>
                            </div>
                            <div className="quick-info-item">
                                <i className="fas fa-language"></i>
                                <div>
                                    <span>Languages</span>
                                    <strong>
                                        English, Indonesian, Japanese
                                    </strong>
                                </div>
                            </div>
                            <div className="quick-info-item">
                                <i className="fas fa-clock"></i>
                                <div>
                                    <span>Availability</span>
                                    <strong className="text-green">
                                        Available for Freelance
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="about-features">
                            <div className="feature-item">
                                <i className="fas fa-check-circle"></i>
                                <span>Fullstack Development</span>
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-check-circle"></i>
                                <span>UI/UX Design</span>
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-check-circle"></i>
                                <span>Mobile-First Approach</span>
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-check-circle"></i>
                                <span>Performance Optimization</span>
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-check-circle"></i>
                                <span>SEO Best Practices</span>
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-check-circle"></i>
                                <span>Clean Code Architecture</span>
                            </div>
                        </div>

                        {/* Hobbies */}
                        <div className="about-hobbies">
                            <h4>Interests & Hobbies</h4>
                            <div className="hobbies-grid">
                                {hobbies.map((hobby, index) => (
                                    <div key={index} className="hobby-item">
                                        <i className={hobby.icon}></i>
                                        <span>{hobby.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="about-cta">
                            <a href="#projects" className="btn btn-primary">
                                <span>View My Work</span>
                                <i className="fas fa-arrow-right"></i>
                            </a>
                            <a
                                href="/cv-alex-neon.pdf"
                                className="btn btn-outline"
                                download
                            >
                                <span>Download CV</span>
                                <i className="fas fa-download"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="about-stats-row reveal">
                    {stats.map((stat, index) => (
                        <div key={index} className="about-stat-card">
                            <i className={stat.icon}></i>
                            <div className="stat-info">
                                <AnimatedCounter
                                    target={stat.value}
                                    suffix="+"
                                />
                                <span>{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Animated Counter Component
function AnimatedCounter({ target, suffix = "" }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let start = 0;
        const duration = 2000;
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
    }, [isVisible, target]);

    return (
        <span ref={ref} className="animated-counter">
            {count}
            {suffix}
        </span>
    );
}

export default About;
