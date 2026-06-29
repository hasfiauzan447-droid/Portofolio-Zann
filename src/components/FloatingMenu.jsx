import React, { useState } from "react";

function FloatingMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { href: "#home", icon: "fas fa-home", label: "Home" },
        { href: "#about", icon: "fas fa-user", label: "About" },
        { href: "#skills", icon: "fas fa-cog", label: "Skills" },
        { href: "#music", icon: "fas fa-music", label: "Music" },
        { href: "#projects", icon: "fas fa-briefcase", label: "Projects" },
        { href: "#contact", icon: "fas fa-envelope", label: "Contact" }
    ];

    return (
        <div className="floating-menu">
            <div className={`float-items ${isOpen ? "active" : ""}`}>
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="float-item"
                        title={item.label}
                        onClick={() => setIsOpen(false)}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <i className={item.icon}></i>
                    </a>
                ))}
            </div>

            <button
                className="float-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
            >
                <i className={`fas fa-${isOpen ? "times" : "bolt"}`}></i>
            </button>
        </div>
    );
}

export default FloatingMenu;
