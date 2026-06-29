import React, { useState } from "react";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate sending
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: "", email: "", subject: "", message: "" });

            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        }, 1500);
    };

    const socialLinks = [
        {
            name: "WhatsApp",
            icon: "fab fa-whatsapp",
            url: "https://wa.me/6281234567890?text=Halo%20Alex%2C%20saya%20dari%20portfolio!",
            color: "#25D366"
        },
        {
            name: "Instagram",
            icon: "fab fa-instagram",
            url: "https://instagram.com/alexneon.dev",
            color: "#E4405F"
        },
        {
            name: "GitHub",
            icon: "fab fa-github",
            url: "https://github.com/alexneon",
            color: "#FFFFFF"
        },
        {
            name: "LinkedIn",
            icon: "fab fa-linkedin-in",
            url: "https://linkedin.com/in/alexneon",
            color: "#0A66C2"
        },
        {
            name: "Twitter/X",
            icon: "fab fa-x-twitter",
            url: "https://x.com/alexneon",
            color: "#FFFFFF"
        },
        {
            name: "TikTok",
            icon: "fab fa-tiktok",
            url: "https://tiktok.com/@alexneon.dev",
            color: "#FFFFFF"
        },
        {
            name: "Email",
            icon: "fas fa-envelope",
            url: "mailto:hello@neonverse.dev",
            color: "#EA4335"
        }
    ];

    return (
        <section id="contact" className="contact-section">
            <div className="section-container">
                <div className="section-header reveal">
                    <span className="section-badge">
                        <i className="fas fa-paper-plane"></i> Get In Touch
                    </span>
                    <h2 className="section-title">
                        Contact <span className="gradient-text">Me</span>
                    </h2>
                    <p className="section-subtitle">
                        Let's create something amazing together
                    </p>
                </div>

                <div className="contact-grid">
                    <div className="contact-info-col reveal">
                        <div className="contact-info-card">
                            <h3>Let's talk about your project</h3>
                            <p>
                                Feel free to reach out. I'm always open to
                                discussing new projects, creative ideas, or
                                opportunities.
                            </p>

                            <div className="contact-details">
                                <div className="info-item">
                                    <div className="info-icon">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>hello@neonverse.dev</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div>
                                        <h4>Phone</h4>
                                        <p>+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon">
                                        <i className="fas fa-location-dot"></i>
                                    </div>
                                    <div>
                                        <h4>Location</h4>
                                        <p>San Francisco, CA</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="social-links-bar">
                            <h4>Connect With Me</h4>
                            <div className="social-icons-grid">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon-link"
                                        title={social.name}
                                        style={{
                                            "--social-color": social.color
                                        }}
                                    >
                                        <i className={social.icon}></i>
                                        <span>{social.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-col reveal">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <h3>Send Me a Message</h3>

                            <div className="form-group">
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="name">Your Name</label>
                                <span className="form-line"></span>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="email">Your Email</label>
                                <span className="form-line"></span>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="subject">Subject</label>
                                <span className="form-line"></span>
                            </div>

                            <div className="form-group">
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                ></textarea>
                                <label htmlFor="message">Your Message</label>
                                <span className="form-line"></span>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>{" "}
                                        Sending...
                                    </>
                                ) : isSubmitted ? (
                                    <>
                                        <i className="fas fa-check-circle"></i>{" "}
                                        Message Sent!
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <i className="fas fa-paper-plane"></i>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
