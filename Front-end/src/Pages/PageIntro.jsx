import { useEffect, useRef, useState } from "react";
import { Header } from "../Components/Header/Header";
import { BackgroundGrid } from "../Components/BackgroundGrid/BackgroundGrid";
import { ContentInfo } from "../Components/ContentInfo/ContentInfo";
import { AboutUs } from "../Components/AboutUs/AboutUs";

export function PageIntro() {
    const aboutRef = useRef(null);
    const [headerColor, setHeaderColor] = useState("black");

    useEffect(() => {
        const aboutSection = document.getElementById("about");

        const handleWheel = (e) => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            if (!aboutSection) return;

            // Scroll para baixo
            if (e.deltaY > 0 && scrollY < windowHeight / 2) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
            }

            // Scroll para cima
            if (e.deltaY < 0 && scrollY >= windowHeight / 2) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setHeaderColor(entry.isIntersecting ? "red" : "black");
            },
            { threshold: 0.5 }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            if (aboutRef.current) {
                observer.unobserve(aboutRef.current);
            }
        };
    }, []);

    return (
        <div>
            <Header className={headerColor === 'red' ? 'headerGradient' : 'headerBlack'} />

            <div id="home">
                <BackgroundGrid />
            </div>

            <ContentInfo />

            <section id="about" ref={aboutRef}>
                <AboutUs />
            </section>
        </div>
    );
}
