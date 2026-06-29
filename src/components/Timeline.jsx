import React, { useEffect, useRef, useState } from "react";
import { timelineData } from "../data/timeline";

function Timeline() {
    const [activeTab, setActiveTab] = useState("all");
    const [visibleItems, setVisibleItems] = useState([]);
    const timelineRef = useRef(null);

    const tabs = [
        { id: "all", label: "All", icon: "fas fa-stream" },
        { id: "education", label: "Education", icon: "fas fa-graduation-cap" },
        { id: "experience", label: "Experience", icon: "fas fa-briefcase" },
        { id: "achievement", label: "Achievements", icon: "fas fa-trophy" }
    ];

    const filteredData =
        activeTab === "all"
            ? timelineData
            : timelineData.filter(item => item.type === activeTab);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.dataset.index);
                        setVisibleItems(prev => [...new Set([...prev, index])]);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );

        const items = timelineRef.current?.querySelectorAll(".timeline-item");
        items?.forEach(item => observer.observe(item));

        return () => observer.disconnect();
    }, [filteredData]);

    return (
        <section id="experience" className="experience-section">
            <div className="section-container">
                <div className="section-header reveal">
                    <span className="section-badge">
                        <i className="fas fa-road"></i> My Journey
                    </span>
                    <h2 className="section-title">
                        Professional{" "}
                        <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="section-subtitle">
                        My career path, education, and achievements
                    </p>
                </div>

                {/* Timeline Tabs */}
                <div className="timeline-tabs reveal">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`timeline-tab ${
                                activeTab === tab.id ? "active" : ""
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <i className={tab.icon}></i>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Timeline */}
                <div className="timeline" ref={timelineRef}>
                    <div className="timeline-line"></div>

                    {filteredData.map((item, index) => (
                        <div
                            key={item.id}
                            className={`timeline-item ${
                                visibleItems.includes(index) ? "visible" : ""
                            } timeline-${item.type}`}
                            data-index={index}
                        >
                            <div className="timeline-marker">
                                <div className="marker-dot"></div>
                                <div className="marker-pulse"></div>
                            </div>

                            <div className="timeline-card">
                                <div className="timeline-card-header">
                                    <span className="timeline-date">
                                        <i className="fas fa-calendar"></i>{" "}
                                        {item.date}
                                    </span>
                                    <span
                                        className={`timeline-type-badge type-${item.type}`}
                                    >
                                        {item.type === "education" && (
                                            <i className="fas fa-graduation-cap"></i>
                                        )}
                                        {item.type === "experience" && (
                                            <i className="fas fa-briefcase"></i>
                                        )}
                                        {item.type === "achievement" && (
                                            <i className="fas fa-trophy"></i>
                                        )}
                                        <span>{item.type}</span>
                                    </span>
                                </div>

                                <h3 className="timeline-title">{item.title}</h3>
                                <p className="timeline-subtitle">
                                    {item.subtitle}
                                </p>

                                {item.description && (
                                    <p className="timeline-description">
                                        {item.description}
                                    </p>
                                )}

                                {item.tags && (
                                    <div className="timeline-tags">
                                        {item.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="timeline-tag"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="timeline-link"
                                    >
                                        <i className="fas fa-external-link-alt"></i>{" "}
                                        View Details
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Timeline;
