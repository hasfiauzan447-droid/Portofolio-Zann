import React, { useEffect, useState } from "react";
import { useMusic } from "../context/MusicContext";

function MiniPlayer() {
    const {
        currentTrack,
        isPlaying,
        progress,
        playlist,
        togglePlay,
        nextTrack
    } = useMusic();
    const [isVisible, setIsVisible] = useState(false);
    const track = playlist[currentTrack];

    useEffect(() => {
        const handleScroll = () => {
            const musicSection = document.getElementById("music");
            if (musicSection) {
                const rect = musicSection.getBoundingClientRect();
                setIsVisible(rect.bottom < 0 && isPlaying);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isPlaying]);

    if (!track) return null;

    return (
        <div className={`mini-player ${isVisible ? "active" : ""}`}>
            <div className="mini-player-inner">
                <div className="mini-album-art">
                    <img src={track.cover} alt={track.title} />
                    {isPlaying && <div className="mini-vinyl-spin"></div>}
                </div>

                <div
                    className="mini-info"
                    onClick={() => (window.location.href = "#music")}
                >
                    <p className="mini-title">{track.title}</p>
                    <p className="mini-artist">{track.artist}</p>
                </div>

                <div className="mini-controls">
                    <button className="mini-play-btn" onClick={togglePlay}>
                        <i
                            className={`fas fa-${isPlaying ? "pause" : "play"}`}
                        ></i>
                    </button>
                    <button className="mini-next-btn" onClick={nextTrack}>
                        <i className="fas fa-forward"></i>
                    </button>
                </div>
            </div>

            <div className="mini-progress-bar">
                <div
                    className="mini-progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}

export default MiniPlayer;
