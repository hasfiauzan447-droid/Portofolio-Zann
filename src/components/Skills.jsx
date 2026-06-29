import React, { useState, useEffect, useRef } from "react";
import { skillCategories, techStack } from "../data/skills";

function Skills() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animatedSkills, setAnimatedSkills] = useState({});
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                const skills = skillCategories[activeCategory].skills;
                skills.forEach((_, index) => {
                    setTimeout(() => {
                        setAnimatedSkills(prev => ({ ...prev, [index]: true }));
                    }, index * 100);
                });
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isVisible, activeCategory]);

    const getSkillLevelColor = level => {
        if (level >= 90) return "#00ff88";
        if (level >= 80) return "#00BFFF";
        if (level >= 70) return "#A020F0";
        if (level >= 60) return "#FF0080";
        return "#FFA500";
    };

    const getSkillExperience = level => {
        if (level >= 90) return "Expert";
        if (level >= 80) return "Advanced";
        if (level >= 70) return "Intermediate";
        if (level >= 60) return "Basic";
        return "Beginner";
    };

    return (
        <section id="skills" className="skills-section" ref={sectionRef}>
            <div className="section-container">
                <div className="section-header reveal">
                    <span className="section-badge">
                        <i className="fas fa-cog fa-spin"></i> Technical Skills
                    </span>
                    <h2 className="section-title">
                        My <span className="gradient-text">Expertise</span>
                    </h2>
                    <p className="section-subtitle">
                        50+ technologies mastered across frontend, backend,
                        database, cloud, and design
                    </p>
                </div>

                {/* Tech Stack Cloud */}
                <div className="tech-stack-cloud reveal">
                    {techStack.map((tech, index) => (
                        <div
                            key={index}
                            className="tech-icon-item"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                "--tech-color": tech.color
                            }}
                            title={tech.name}
                        >
                            <i className={tech.icon}></i>
                            <span className="tech-tooltip">{tech.name}</span>
                        </div>
                    ))}
                </div>

                {/* Category Tabs */}
                <div className="skills-category-tabs reveal">
                    {skillCategories.map((category, index) => (
                        <button
                            key={category.id}
                            className={`category-tab ${
                                activeCategory === index ? "active" : ""
                            }`}
                            onClick={() => {
                                setActiveCategory(index);
                                setAnimatedSkills({});
                            }}
                            style={{ "--cat-color": category.color }}
                        >
                            <i className={category.icon}></i>
                            <span>{category.title}</span>
                            <span className="category-count">
                                {category.skills.length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <div className="skills-grid-container reveal">
                    <div className="skills-grid">
                        {skillCategories[activeCategory].skills.map(
                            (skill, index) => (
                                <div
                                    key={index}
                                    className={`skill-item-card ${
                                        hoveredSkill === index ? "hovered" : ""
                                    } ${
                                        animatedSkills[index] ? "animated" : ""
                                    }`}
                                    onMouseEnter={() => setHoveredSkill(index)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                    style={{
                                        "--animation-order": index,
                                        borderColor:
                                            hoveredSkill === index
                                                ? getSkillLevelColor(
                                                      skill.level
                                                  )
                                                : "transparent"
                                    }}
                                >
                                    <div
                                        className="skill-card-glow"
                                        style={{
                                            background: getSkillLevelColor(
                                                skill.level
                                            ),
                                            opacity:
                                                hoveredSkill === index
                                                    ? 0.15
                                                    : 0
                                        }}
                                    ></div>

                                    <div className="skill-icon-wrapper">
                                        {skill.icon.includes("devicon") ? (
                                            <i className={skill.icon}></i>
                                        ) : (
                                            <i className={skill.icon}></i>
                                        )}
                                    </div>

                                    <div className="skill-info">
                                        <div className="skill-header">
                                            <div>
                                                <h4>{skill.name}</h4>
                                                <span
                                                    className="skill-level-badge"
                                                    style={{
                                                        background: `${getSkillLevelColor(
                                                            skill.level
                                                        )}20`,
                                                        color: getSkillLevelColor(
                                                            skill.level
                                                        ),
                                                        border: `1px solid ${getSkillLevelColor(
                                                            skill.level
                                                        )}40`
                                                    }}
                                                >
                                                    {getSkillExperience(
                                                        skill.level
                                                    )}
                                                </span>
                                            </div>
                                            <span className="skill-category-tag">
                                                {skill.category}
                                            </span>
                                        </div>

                                        <div className="skill-level-wrapper">
                                            <div className="skill-level-bar">
                                                <div
                                                    className="skill-level-fill"
                                                    style={{
                                                        width: animatedSkills[
                                                            index
                                                        ]
                                                            ? `${skill.level}%`
                                                            : "0%",
                                                        background: `linear-gradient(90deg, ${getSkillLevelColor(
                                                            skill.level
                                                        )}, ${
                                                            skillCategories[
                                                                activeCategory
                                                            ].color
                                                        })`,
                                                        boxShadow: `0 0 15px ${getSkillLevelColor(
                                                            skill.level
                                                        )}`,
                                                        transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${
                                                            index * 0.1
                                                        }s`
                                                    }}
                                                >
                                                    <div className="skill-level-shine"></div>
                                                </div>
                                                <div
                                                    className="skill-level-dot"
                                                    style={{
                                                        left: animatedSkills[
                                                            index
                                                        ]
                                                            ? `${skill.level}%`
                                                            : "0%",
                                                        background:
                                                            getSkillLevelColor(
                                                                skill.level
                                                            ),
                                                        boxShadow: `0 0 10px ${getSkillLevelColor(
                                                            skill.level
                                                        )}`,
                                                        transition: `left 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${
                                                            index * 0.1
                                                        }s`
                                                    }}
                                                ></div>
                                            </div>
                                            <span
                                                className="skill-percentage"
                                                style={{
                                                    color: getSkillLevelColor(
                                                        skill.level
                                                    )
                                                }}
                                            >
                                                {skill.level}%
                                            </span>
                                        </div>

                                        {/* Hover Detail */}
                                        <div
                                            className={`skill-hover-detail ${
                                                hoveredSkill === index
                                                    ? "visible"
                                                    : ""
                                            }`}
                                        >
                                            <div className="skill-detail-stat">
                                                <i className="fas fa-clock"></i>
                                                <div>
                                                    <span>Experience</span>
                                                    <strong>
                                                        {skill.level > 85
                                                            ? "5+ years"
                                                            : skill.level > 75
                                                            ? "3+ years"
                                                            : skill.level > 65
                                                            ? "2+ years"
                                                            : "1+ year"}
                                                    </strong>
                                                </div>
                                            </div>
                                            <div className="skill-detail-stat">
                                                <i className="fas fa-project-diagram"></i>
                                                <div>
                                                    <span>Projects</span>
                                                    <strong>
                                                        {Math.floor(
                                                            skill.level / 5
                                                        )}
                                                        +
                                                    </strong>
                                                </div>
                                            </div>
                                            <div className="skill-detail-stat">
                                                <i className="fas fa-star"></i>
                                                <div>
                                                    <span>Proficiency</span>
                                                    <strong>
                                                        {getSkillExperience(
                                                            skill.level
                                                        )}
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="skills-stats-overview reveal">
                    <div className="stat-overview-card">
                        <div className="stat-overview-icon">
                            <i className="fas fa-code"></i>
                        </div>
                        <div className="stat-overview-info">
                            <span className="stat-overview-number">
                                <Counter target={50} duration={2000} />+
                            </span>
                            <span className="stat-overview-label">
                                Technologies
                            </span>
                        </div>
                    </div>
                    <div className="stat-overview-card">
                        <div className="stat-overview-icon">
                            <i className="fas fa-project-diagram"></i>
                        </div>
                        <div className="stat-overview-info">
                            <span className="stat-overview-number">
                                <Counter target={150} duration={2000} />+
                            </span>
                            <span className="stat-overview-label">
                                Projects Done
                            </span>
                        </div>
                    </div>
                    <div className="stat-overview-card">
                        <div className="stat-overview-icon">
                            <i className="fas fa-certificate"></i>
                        </div>
                        <div className="stat-overview-info">
                            <span className="stat-overview-number">
                                <Counter target={25} duration={1500} />+
                            </span>
                            <span className="stat-overview-label">
                                Certificates
                            </span>
                        </div>
                    </div>
                    <div className="stat-overview-card">
                        <div className="stat-overview-icon">
                            <i className="fas fa-trophy"></i>
                        </div>
                        <div className="stat-overview-info">
                            <span className="stat-overview-number">
                                <Counter target={12} duration={1500} />+
                            </span>
                            <span className="stat-overview-label">Awards</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Counter Component
function Counter({ target, duration }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
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
    }, [isVisible, target, duration]);

    return <span ref={ref}>{count}</span>;
}

export default Skills;
