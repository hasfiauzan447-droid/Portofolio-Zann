import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import MusicPlayer from "./components/MusicPlayer";
import MiniPlayer from "./components/MiniPlayer";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Certificates from "./components/Certificates";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingMenu from "./components/FloatingMenu";
import BackToTop from "./components/BackToTop";
import Lightbox from "./components/Lightbox";
import ParticleBackground from "./components/ParticleBackground";
import AIAssistant from "./components/AIAssistant";
import { MusicProvider } from "./context/MusicContext";

function App() {
    const [loading, setLoading] = useState(true);
    const [lightbox, setLightbox] = useState({
        open: false,
        src: "",
        caption: ""
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const openLightbox = (src, caption = "") => {
        setLightbox({ open: true, src, caption });
    };

    const closeLightbox = () => {
        setLightbox({ open: false, src: "", caption: "" });
    };

    if (loading) {
        return <LoadingScreen onComplete={() => setLoading(false)} />;
    }

    return (
        <MusicProvider>
            <div className="app">
                {!isMobile && <CustomCursor />}
                <ScrollProgress />
                <ParticleBackground />
                <Navbar />
                <MiniPlayer />
                <FloatingMenu />
                <BackToTop />
                <AIAssistant />

                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <MusicPlayer />
                    <Projects openLightbox={openLightbox} />
                    <Timeline />
                    <Certificates openLightbox={openLightbox} />
                    <Testimonials />
                    <Gallery openLightbox={openLightbox} />
                    <Contact />
                </main>

                <Footer />

                {lightbox.open && (
                    <Lightbox
                        src={lightbox.src}
                        caption={lightbox.caption}
                        onClose={closeLightbox}
                    />
                )}
            </div>
        </MusicProvider>
    );
}

export default App;
