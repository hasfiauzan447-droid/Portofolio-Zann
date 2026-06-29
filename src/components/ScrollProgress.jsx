import React from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

function ScrollProgress() {
    const progress = useScrollProgress();

    return (
        <div className="scroll-progress">
            <div
                className="scroll-progress-fill"
                style={{ width: `${progress}%` }}
            >
                <div className="scroll-progress-glow"></div>
            </div>
        </div>
    );
}

export default ScrollProgress;
