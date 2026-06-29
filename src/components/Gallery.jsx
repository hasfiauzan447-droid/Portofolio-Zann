import React, { useState } from "react";

function Gallery({ openLightbox }) {
    const [filter, setFilter] = useState("all");
    const [layout, setLayout] = useState("grid"); // 'grid' or 'masonry'

    const galleryData = [
        {
            id: 1,
            src: "https://placehold.co/600x400/1a1a2e/00BFFF?text=Design1",
            category: "design",
            title: "Dashboard UI Design"
        },
        {
            id: 2,
            src: "https://placehold.co/600x600/1a1a2e/A020F0?text=Design2",
            category: "app",
            title: "Mobile App Interface"
        },
        {
            id: 3,
            src: "https://placehold.co/600x400/1a1a2e/00E5FF?text=Design3",
            category: "web",
            title: "Landing Page Concept"
        },
        {
            id: 4,
            src: "https://placehold.co/600x500/1a1a2e/FF0080?text=Design4",
            category: "branding",
            title: "Brand Identity System"
        },
        {
            id: 5,
            src: "https://placehold.co/600x400/1a1a2e/7B68EE?text=Design5",
            category: "design",
            title: "Icon Set Collection"
        },
        {
            id: 6,
            src: "https://placehold.co/600x600/1a1a2e/00BFFF?text=Design6",
            category: "app",
            title: "Fitness App Screens"
        },
        {
            id: 7,
            src: "https://placehold.co/600x400/1a1a2e/FF6B35?text=Design7",
            category: "web",
            title: "E-Commerce Mockup"
        },
        {
            id: 8,
            src: "https://placehold.co/600x500/1a1a2e/47A248?text=Design8",
            category: "branding",
            title: "Logo Design Collection"
        },
        {
            id: 9,
            src: "https://placehold.co/600x400/1a1a2e/FF26BE?text=Design9",
            category: "design",
            title: "Social Media Templates"
        },
        {
            id: 10,
            src: "https://placehold.co/600x600/1a1a2e/00E5FF?text=Design10",
            category: "app",
            title: "Travel App Design"
        },
        {
            id: 11,
            src: "https://placehold.co/600x400/1a1a2e/A020F0?text=Design11",
            category: "web",
            title: "SaaS Platform Interface"
        },
        {
            id: 12,
            src: "https://placehold.co/600x500/1a1a2e/FF0080?text=Design12",
            category: "branding",
            title: "Marketing Materials"
        }
    ];

    const categories = [
        { id: "all", label: "All", icon: "fas fa-th-large" },
        { id: "design", label: "Design", icon: "fas fa-paint-brush" },
        { id: "web", label: "Web", icon: "fas fa-globe" },
        { id: "app", label: "Mobile", icon: "fas fa-mobile-alt" },
        { id: "branding", label: "Branding", icon: "fas fa-palette" }
    ];

    const filtered =
        filter === "all"
            ? galleryData
            : galleryData.filter(item => item.category === filter);

    return (
        <section id="gallery" className="gallery-section">
            <div className="section-container">
                <div className="section-header reveal">
                    <span className="section-badge">
                        <i className="fas fa-images"></i> Gallery
                    </span>
                    <h2 className="section-title">
                        Visual <span className="gradient-text">Showcase</span>
                    </h2>
                    <p className="section-subtitle">
                        A collection of my creative work and designs
                    </p>
                </div>

                {/* Controls */}
                <div className="gallery-controls reveal">
                    <div className="gallery-filter-bar">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`gallery-filter-btn ${
                                    filter === cat.id ? "active" : ""
                                }`}
                                onClick={() => setFilter(cat.id)}
                            >
                                <i className={cat.icon}></i>
                                <span>{cat.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="gallery-layout-toggle">
                        <button
                            className={`layout-btn ${
                                layout === "grid" ? "active" : ""
                            }`}
                            onClick={() => setLayout("grid")}
                        >
                            <i className="fas fa-th"></i>
                        </button>
                        <button
                            className={`layout-btn ${
                                layout === "masonry" ? "active" : ""
                            }`}
                            onClick={() => setLayout("masonry")}
                        >
                            <i className="fas fa-th-large"></i>
                        </button>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div
                    className={`gallery-grid ${
                        layout === "masonry" ? "masonry-layout" : "grid-layout"
                    }`}
                >
                    {filtered.map((item, index) => (
                        <div
                            key={item.id}
                            className="gallery-item reveal"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => openLightbox(item.src, item.title)}
                        >
                            <img src={item.src} alt={item.title} />
                            <div className="gallery-item-overlay">
                                <div className="gallery-item-info">
                                    <h4>{item.title}</h4>
                                    <span className="gallery-item-category">
                                        {item.category}
                                    </span>
                                </div>
                                <button className="gallery-zoom-btn">
                                    <i className="fas fa-search-plus"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Gallery;
