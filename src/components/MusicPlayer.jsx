import React, { useEffect, useRef, useCallback } from "react";
import { useMusic } from "../context/MusicContext";

function MusicPlayer() {
    const {
        currentTrack,
        isPlaying,
        progress,
        setProgress,
        isShuffled,
        setIsShuffled,
        isRepeated,
        setIsRepeated,
        volume,
        setVolume,
        playlist,
        togglePlay,
        nextTrack,
        prevTrack,
        selectTrack
    } = useMusic();

    const progressInterval = useRef(null);
    const visualizerRef = useRef(null);

    const track = playlist[currentTrack];

    // Auto progress
    useEffect(() => {
        if (isPlaying) {
            progressInterval.current = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        if (isRepeated) {
                            return 0;
                        } else {
                            nextTrack();
                            return 0;
                        }
                    }
                    return prev + 0.15;
                });
            }, 200);
        } else {
            clearInterval(progressInterval.current);
        }

        return () => clearInterval(progressInterval.current);
    }, [isPlaying, isRepeated, nextTrack, setProgress]);

    // Visualizer animation
    useEffect(() => {
        if (isPlaying && visualizerRef.current) {
            const animate = () => {
                const bars = visualizerRef.current.querySelectorAll(".viz-bar");
                bars.forEach(bar => {
                    bar.style.height = `${Math.random() * 25 + 4}px`;
                });
                if (isPlaying) {
                    requestAnimationFrame(animate);
                }
            };
            animate();
        }
    }, [isPlaying]);

    const handleProgressClick = e => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newProgress = (x / rect.width) * 100;
        setProgress(newProgress);
    };

    const getDurationSeconds = () => {
        const [min, sec] = track.duration.split(":").map(Number);
        return min * 60 + sec;
    };

    const formatTime = progressPercent => {
        const totalSec = getDurationSeconds();
        const currentSec = Math.floor((progressPercent / 100) * totalSec);
        const min = Math.floor(currentSec / 60);
        const sec = currentSec % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <section id="music" className="music-section">
            <div className="section-container">
                <div className="section-header reveal">
                    <span className="section-badge">
                        <i className="fas fa-headphones"></i> My Playlist
                    </span>
                    <h2 className="section-title">
                        Neon <span className="gradient-text">Beats</span>
                    </h2>
                    <p className="section-subtitle">
                        Premium music experience while browsing
                    </p>
                </div>

                <div className="music-player-wrapper reveal">
                    {/* Vinyl Area */}
                    <div className="vinyl-area">
                        <div className="vinyl-container">
                            <div
                                className={`vinyl-disc ${
                                    isPlaying ? "playing" : ""
                                }`}
                            >
                                <div className="vinyl-grooves">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="groove"
                                            style={{ inset: `${15 + i * 8}%` }}
                                        ></div>
                                    ))}
                                </div>
                                <div className="vinyl-center-label">
                                    <img src={track.cover} alt={track.title} />
                                    <div className="label-center-hole"></div>
                                </div>
                                <div className="vinyl-shine"></div>
                            </div>
                            <div
                                className={`tonearm-assembly ${
                                    isPlaying ? "playing" : ""
                                }`}
                            >
                                <div className="tonearm-base"></div>
                                <div className="tonearm-arm">
                                    <div className="tonearm-headshell">
                                        <div className="tonearm-cartridge"></div>
                                        <div className="tonearm-stylus"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vinyl-glow vinyl-glow-blue"></div>
                        <div className="vinyl-glow vinyl-glow-purple"></div>
                    </div>

                    {/* Now Playing */}
                    <div className="now-playing-info">
                        <h3 className="np-title">{track.title}</h3>
                        <p className="np-artist">{track.artist}</p>
                        <div className="np-status">
                            <span
                                className={`np-dot ${
                                    isPlaying ? "playing" : ""
                                }`}
                            ></span>
                            {isPlaying ? "Now Playing" : "Paused"}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-area">
                        <span className="time-display">
                            {formatTime(progress)}
                        </span>
                        <div
                            className="progress-bar-container"
                            onClick={handleProgressClick}
                        >
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                            <div
                                className="progress-bar-thumb"
                                style={{ left: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="time-display">{track.duration}</span>
                    </div>

                    {/* Controls */}
                    <div className="controls-area">
                        <button
                            className={`control-btn ${
                                isShuffled ? "active" : ""
                            }`}
                            onClick={() => setIsShuffled(!isShuffled)}
                            title="Shuffle"
                        >
                            <i className="fas fa-shuffle"></i>
                        </button>
                        <button
                            className="control-btn"
                            onClick={prevTrack}
                            title="Previous"
                        >
                            <i className="fas fa-backward"></i>
                        </button>
                        <button
                            className="control-btn control-play"
                            onClick={togglePlay}
                            title="Play/Pause"
                        >
                            <i
                                className={`fas fa-${
                                    isPlaying ? "pause" : "play"
                                }`}
                            ></i>
                            <span className="play-ripple-effect"></span>
                        </button>
                        <button
                            className="control-btn"
                            onClick={nextTrack}
                            title="Next"
                        >
                            <i className="fas fa-forward"></i>
                        </button>
                        <button
                            className={`control-btn ${
                                isRepeated ? "active" : ""
                            }`}
                            onClick={() => setIsRepeated(!isRepeated)}
                            title="Repeat"
                        >
                            <i className="fas fa-repeat"></i>
                        </button>
                    </div>

                    {/* Volume */}
                    <div className="volume-area">
                        <i className="fas fa-volume-low vol-icon"></i>
                        <input
                            type="range"
                            className="volume-slider"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={e => setVolume(Number(e.target.value))}
                        />
                        <i className="fas fa-volume-high vol-icon"></i>
                    </div>

                    {/* Visualizer */}
                    <div className="audio-visualizer" ref={visualizerRef}>
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="viz-bar"></div>
                        ))}
                    </div>

                    {/* Playlist */}
                    <div className="playlist-card">
                        <div className="playlist-card-header">
                            <h4>
                                <i className="fas fa-list-music"></i> Daftar
                                Lagu
                            </h4>
                            <span className="playlist-count-badge">
                                {playlist.length} Lagu
                            </span>
                        </div>
                        <div className="playlist-items">
                            {playlist.map((song, index) => (
                                <div
                                    key={song.id}
                                    className={`playlist-item ${
                                        index === currentTrack ? "active" : ""
                                    }`}
                                    onClick={() => {
                                        selectTrack(index);
                                        if (!isPlaying) togglePlay();
                                    }}
                                >
                                    <div className="playlist-item-thumb">
                                        <img
                                            src={song.cover}
                                            alt={song.title}
                                        />
                                    </div>
                                    <div className="playlist-item-info">
                                        <h5>{song.title}</h5>
                                        <span>{song.artist}</span>
                                    </div>
                                    <span className="playlist-item-dur">
                                        {song.duration}
                                    </span>
                                    {index === currentTrack && (
                                        <span className="playlist-item-playing-indicator">
                                            <i className="fas fa-music"></i>
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MusicPlayer;
