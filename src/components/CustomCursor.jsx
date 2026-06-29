import React, { useEffect, useState } from "react";

function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const handleMouseMove = e => {
            setPosition({ x: e.clientX, y: e.clientY });
            setTimeout(() => {
                setTrailPosition({ x: e.clientX, y: e.clientY });
            }, 80);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleHover = e => {
            const target = e.target;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("cursor-hover")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseover", handleHover);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseover", handleHover);
        };
    }, []);

    return (
        <>
            <div
                className="cursor-dot"
                style={{ left: position.x, top: position.y }}
            />
            <div
                className={`cursor-ring ${isHovering ? "hovering" : ""} ${
                    isClicking ? "clicking" : ""
                }`}
                style={{ left: trailPosition.x, top: trailPosition.y }}
            />
        </>
    );
}

export default CustomCursor;
