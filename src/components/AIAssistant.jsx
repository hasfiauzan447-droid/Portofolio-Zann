import React, { useState, useRef, useEffect } from "react";

function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: "bot",
            text: "👋 Hello! I'm your AI assistant. How can I help you today?"
        }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), type: "user", text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        // Bot response
        setTimeout(() => {
            const botResponse = generateResponse(input);
            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, type: "bot", text: botResponse }
            ]);
        }, 800);
    };

    const generateResponse = msg => {
        const lower = msg.toLowerCase();

        if (
            lower.includes("hello") ||
            lower.includes("hi") ||
            lower.includes("halo")
        ) {
            return "Hello! Welcome to NeonVerse Portfolio. Feel free to explore my work! 😊";
        }
        if (lower.includes("project") || lower.includes("portfolio")) {
            return "I have 150+ projects across web development, mobile apps, and UI/UX design. Check out the Projects section! 🚀";
        }
        if (lower.includes("contact") || lower.includes("hire")) {
            return "You can reach me at hello@neonverse.dev or through WhatsApp at the Contact section. I'd love to work with you! 💼";
        }
        if (lower.includes("skill") || lower.includes("tech")) {
            return "I specialize in React, Node.js, TypeScript, Python, and many more technologies. Check the Skills section for details! 💻";
        }
        if (lower.includes("music") || lower.includes("play")) {
            return "I have a built-in music player with some cool tracks. Head over to the Music section to vibe while browsing! 🎵";
        }
        return "That's interesting! Feel free to explore the portfolio or ask me about my projects, skills, or how to contact me.";
    };

    return (
        <div className={`ai-assistant ${isOpen ? "open" : ""}`}>
            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <div className="ai-header-info">
                            <div className="ai-avatar">
                                <i className="fas fa-robot"></i>
                            </div>
                            <div>
                                <h4>Neon AI Assistant</h4>
                                <span className="ai-status">Online</span>
                            </div>
                        </div>
                        <button
                            className="ai-close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`ai-message ${msg.type}`}
                            >
                                {msg.type === "bot" && (
                                    <div className="ai-message-avatar">
                                        <i className="fas fa-robot"></i>
                                    </div>
                                )}
                                <div className="ai-message-bubble">
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="ai-chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSend}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            )}

            <button
                className="ai-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                title="AI Assistant"
            >
                <i className={`fas fa-${isOpen ? "times" : "robot"}`}></i>
                {!isOpen && <span className="ai-pulse"></span>}
            </button>
        </div>
    );
}

export default AIAssistant;
