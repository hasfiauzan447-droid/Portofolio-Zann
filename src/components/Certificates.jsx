import React, { useState } from "react";
import { certificatesData } from "../data/certificates";

function Certificates({ openLightbox }) {
    const [filter, setFilter] = useState("all");
    const [hoveredCert, setHoveredCert] = useState(null);

    const categories = [
        { id: "all", label: "All", icon: "fas fa-certificate" },
        { id: "web", label: "Web Dev", icon: "fas fa-globe" },
        { id: "design", label: "Design", icon: "fas fa-paint-brush" },
        { id: "cloud", label: "Cloud", icon: "fas fa-cloud" },
        { id: "ai", label: "AI/ML", icon: "fas fa-robot" }
    ];

    const filtered =
        filter === "all"
            ? certificatesData
            : certificatesData.filter(c => c.category === filter);

    return (
        <section id="certificates" className="certificates-section">
            <div className="section-container">
                <div className="section-header reveal">
                    <span className="section-badge">
                        <i className="fas fa-medal"></i> Achievements
                    </span>
                    <h2 className="section-title">
                        My <span className="gradient-text">Certificates</span>
                    </h2>
                    <p className="section-subtitle">
                        Professional certifications and accomplishments
                    </p>
                </div>

                {/* Filter */}
                <div className="cert-filter-bar reveal">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`cert-filter-btn ${
                                filter === cat.id ? "active" : ""
                            }`}
                            onClick={() => setFilter(cat.id)}
                        >
                            <i className={cat.icon}></i>
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* Certificates Grid */}
                <div className="certificates-grid">
                    {filtered.map((cert, index) => (
                        <div
                            key={cert.id}
                            className={`cert-card reveal ${
                                hoveredCert === index ? "hovered" : ""
                            }`}
                            onMouseEnter={() => setHoveredCert(index)}
                            onMouseLeave={() => setHoveredCert(null)}
                            onClick={() => openLightbox(cert.image, cert.title)}
                        >
                            <div className="cert-image-wrapper">
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="cert-image"
                                />
                                <div className="cert-overlay">
                                    <button className="cert-view-btn">
                                        <i className="fas fa-search-plus"></i>
                                        View Certificate
                                    </button>
                                </div>
                                <div
                                    className="cert-category-badge"
                                    style={{
                                        background: getCategoryColor(
                                            cert.category
                                        )
                                    }}
                                >
                                    {cert.category}
                                </div>
                            </div>

                            <div className="cert-info">
                                <h4>{cert.title}</h4>
                                <p className="cert-issuer">{cert.issuer}</p>
                                <div className="cert-meta">
                                    <span className="cert-date">
                                        <i className="fas fa-calendar"></i>{" "}
                                        {cert.date}
                                    </span>
                                    {cert.credentialId && (
                                        <span className="cert-credential">
                                            <i className="fas fa-id-card"></i>{" "}
                                            {cert.credentialId}
                                        </span>
                                    )}
                                </div>
                                {cert.skills && (
                                    <div className="cert-skills">
                                        {cert.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="cert-skill-tag"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function getCategoryColor(category) {
    const colors = {
        web: "rgba(0, 191, 255, 0.8)",
        design: "rgba(255, 0, 128, 0.8)",
        cloud: "rgba(0, 229, 255, 0.8)",
        ai: "rgba(160, 32, 240, 0.8)"
    };
    return colors[category] || "rgba(0, 191, 255, 0.8)";
}

export default Certificates;
