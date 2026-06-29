import React, { createContext, useContext, useState, useCallback } from "react";

const MusicContext = createContext();

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error("useMusic must be used within MusicProvider");
    }
    return context;
};

export const MusicProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeated, setIsRepeated] = useState(false);
    const [volume, setVolume] = useState(70);

    const playlist = [
        {
            id: 1,
            title: "Neon Nights",
            artist: "Synthwave Collective",
            duration: "3:45",
            cover: "https://placehold.co/150/1a1a2e/00BFFF?text=NN",
            src: ""
        },
        {
            id: 2,
            title: "Purple Haze",
            artist: "Future Bass",
            duration: "4:12",
            cover: "https://placehold.co/150/1a1a2e/A020F0?text=PH",
            src: ""
        },
        {
            id: 3,
            title: "Cyber Dreams",
            artist: "Digital Wave",
            duration: "3:28",
            cover: "https://placehold.co/150/1a1a2e/00E5FF?text=CD",
            src: ""
        },
        {
            id: 4,
            title: "Quantum Leap",
            artist: "Neon Pulse",
            duration: "4:05",
            cover: "https://placehold.co/150/1a1a2e/FF0080?text=QL",
            src: ""
        },
        {
            id: 5,
            title: "Stellar Drift",
            artist: "Cosmic Sound",
            duration: "3:55",
            cover: "https://placehold.co/150/1a1a2e/7B68EE?text=SD",
            src: ""
        }
    ];

    const togglePlay = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    const nextTrack = useCallback(() => {
        setCurrentTrack(prev => {
            if (isShuffled) {
                return Math.floor(Math.random() * playlist.length);
            }
            return (prev + 1) % playlist.length;
        });
        setProgress(0);
    }, [isShuffled, playlist.length]);

    const prevTrack = useCallback(() => {
        setCurrentTrack(prev => {
            if (isShuffled) {
                return Math.floor(Math.random() * playlist.length);
            }
            return (prev - 1 + playlist.length) % playlist.length;
        });
        setProgress(0);
    }, [isShuffled, playlist.length]);

    const selectTrack = useCallback(index => {
        setCurrentTrack(index);
        setProgress(0);
    }, []);

    const value = {
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
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
    };

    return (
        <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
    );
};

export default MusicContext;
