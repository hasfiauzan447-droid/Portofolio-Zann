import { useState, useEffect, useCallback } from "react";

export function useTypewriter(
    words,
    typeSpeed = 80,
    deleteSpeed = 40,
    pauseTime = 2000
) {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];

        if (isWaiting) {
            const timeout = setTimeout(() => {
                setIsWaiting(false);
                setIsDeleting(true);
            }, pauseTime);
            return () => clearTimeout(timeout);
        }

        if (isDeleting) {
            if (text === "") {
                setIsDeleting(false);
                setWordIndex(prev => (prev + 1) % words.length);
                return;
            }

            const timeout = setTimeout(() => {
                setText(currentWord.substring(0, text.length - 1));
            }, deleteSpeed);
            return () => clearTimeout(timeout);
        }

        if (text === currentWord) {
            setIsWaiting(true);
            return;
        }

        const timeout = setTimeout(() => {
            setText(currentWord.substring(0, text.length + 1));
        }, typeSpeed);
        return () => clearTimeout(timeout);
    }, [
        text,
        wordIndex,
        isDeleting,
        isWaiting,
        words,
        typeSpeed,
        deleteSpeed,
        pauseTime
    ]);

    return text;
}
