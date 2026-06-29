import React, { useState } from "react";
import { projectsData, projectCategories } from "../data/projects";

function Projects({ openLightbox }) {
    const [filter, setFilter] = useState("all");
    const [selectedProject, setSelectedProject] = useState(null);
    const [clickTimers, setClickTimers] = useState({});

    const filteredProjects =
        filter === "all"
            ? projectsData
            : projectsData.filter(p => p.category === filter);

    const handleSingleClick = project => {
        setSelectedProject(project);
    };

    const handleDoubleClick = project => {
        window.open(project.link, "_blank");
    };

    const handleCardClick = (project, index) => {
        // Clear any existing timer
        if (clickTimers[index]) {
            clearTimeout(clickTimers[index]);
            const newTimers = { ...clickTimers };
            delete newTimers[index];
            setClickTimers(newTimers);
            handleDoubleClick(project);
            return;
        }

        // Set timer for single click
        const timer = setTimeout(() => {
            handleSingleClick(project);
            const newTimers = { ...clickTimers };
            delete newTimers[index];
            setClickTimers(newTimers);
        }, 300);

        setClickTimers(prev => ({ ...prev, [index]: timer }));
    };

    return (
        <section id="projects" className="projects-section">
            <div className="section-container">
                <div className="section-header reveal">
                    <span className="section-badge">
                        <i className="fas fa-briefcase"></i> Portfolio
                    </span>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle">
                        Showcasing my best work and creative solutions
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="filter-bar reveal">
                    {projectCategories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${
                                filter === cat.id ? "active" : ""
                            }`}
                            onClick={() => setFilter(cat.id)}
                        >
                            <i className={cat.icon}></i>
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card reveal"
                            onClick={() => handleCardClick(project, index)}
                        >
                            <div className="project-thumb">
                                <img src={project.thumb} alt={project.name} />
                                <div className="project-overlay">
                                    <span
                                        className="project-status-badge"
                                        style={{
                                            background:
                                                project.status === "Completed"
                                                    ? "rgba(0,255,136,0.2)"
                                                    : "rgba(255,200,0,0.2)",
                                            color:
                                                project.status === "Completed"
                                                    ? "#00ff88"
                                                    : "#FFD700",
                                            border: `1px solid ${
                                                project.status === "Completed"
                                                    ? "rgba(0,255,136,0.3)"
                                                    : "rgba(255,200,0,0.3)"
                                            }`
                                        }}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                            <div className="project-body">
                                <div className="project-header">
                                    <h3>{project.name}</h3>
                                    <span className="project-year">
                                        {project.year}
                                    </span>
                                </div>
                                <p>{project.desc}</p>
                                <div className="project-tech-stack">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="project-actions">
                                    <button
                                        className="project-action-btn"
                                        onClick={e => {
                                            e.stopPropagation();
                                            openLightbox(
                                                project.thumb,
                                                project.name
                                            );
                                        }}
                                    >
                                        <i className="fas fa-eye"></i> Preview
                                    </button>
                                    <button
                                        className="project-action-btn primary"
                                        onClick={e => {
                                            e.stopPropagation();
                                            window.open(project.demo, "_blank");
                                        }}
                                    >
                                        <i className="fas fa-external-link-alt"></i>{" "}
                                        Live Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Project Detail Modal */}
                {selectedProject && (
                    <div
                        className="project-modal-overlay"
                        onClick={() => setSelectedProject(null)}
                    >
                        <div
                            className="project-modal"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className="modal-close"
                                onClick={() => setSelectedProject(null)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                            <img
                                src={selectedProject.thumb}
                                alt={selectedProject.name}
                            />
                            <div className="modal-body">
                                <h2>{selectedProject.name}</h2>
                                <p>{selectedProject.fullDesc}</p>
                                <div className="modal-tech">
                                    {selectedProject.tech.map((tech, i) => (
                                        <span key={i} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="modal-actions">
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        <i className="fab fa-github"></i> View
                                        Code
                                    </a>
                                    <a
                                        href={selectedProject.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline"
                                    >
                                        <i className="fas fa-external-link-alt"></i>{" "}
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Projects;
