import React, { useState, useEffect } from "react";
import { testimonialsData } from "../data/testimonials";

function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const total = testimonialsData.length;

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % total);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, total]);

    const goTo = index => {
        setCurrent(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goNext = () => goTo((current + 1) % total);
    const goPrev = () => goTo((current - 1 + total) % total);

    const handleTouchStart = e => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = e => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) goNext();
        if (touchStart - touchEnd < -50) goPrev();
    };

    return (
        <section id="testimonials" className="testimonials-section">
            <div className="section-container">
                <div className="section-header reveal">
                    <span className="section-badge">
                        <i className="fas fa-quote-right"></i> Testimonials
                    </span>
                    <h2 className="section-title">
                        What <span className="gradient-text">Clients</span> Say
                    </h2>
                    <p className="section-subtitle">
                        Feedback from people I've worked with
                    </p>
                </div>

                <div
                    className="testimonials-slider reveal"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className="testimonials-track"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {testimonialsData.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className="testimonial-card"
                            >
                                <div className="testimonial-quote-icon">
                                    <i className="fas fa-quote-left"></i>
                                </div>

                                <p className="testimonial-text">
                                    {testimonial.text}
                                </p>

                                <div className="testimonial-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <i
                                            key={i}
                                            className={`fas fa-star ${
                                                i < testimonial.rating
                                                    ? "active"
                                                    : ""
                                            }`}
                                        ></i>
                                    ))}
                                </div>

                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                        />
                                    </div>
                                    <div className="testimonial-author-info">
                                        <h4>{testimonial.name}</h4>
                                        <p>{testimonial.role}</p>
                                        <p className="testimonial-company">
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>

                                {testimonial.project && (
                                    <div className="testimonial-project">
                                        <span>Project:</span>{" "}
                                        {testimonial.project}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="testimonials-nav">
                    <button className="test-nav-btn" onClick={goPrev}>
                        <i className="fas fa-chevron-left"></i>
                    </button>

                    <div className="test-dots">
                        {testimonialsData.map((_, index) => (
                            <button
                                key={index}
                                className={`test-dot ${
                                    index === current ? "active" : ""
                                }`}
                                onClick={() => goTo(index)}
                            ></button>
                        ))}
                    </div>

                    <button className="test-nav-btn" onClick={goNext}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
