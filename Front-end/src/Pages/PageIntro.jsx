import { useEffect } from "react";
import { Header } from "../Components/Header/Header";
import { BackgroundGrid } from "../Components/BackgroundGrid/BackgroundGrid";
import { ContentInfo } from "../Components/ContentInfo/ContentInfo";
import { AboutUs } from "../Components/AboutUs/AboutUs";

export function PageIntro() {
    useEffect(() => {
        const handleWheel = (e) => {
            const aboutSection = document.getElementById("about");

            if (!aboutSection) return;

            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Scroll para baixo → ir para About Us
            if (e.deltaY > 0 && scrollY < windowHeight / 2) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
            }

            // Scroll para cima → voltar ao topo
            if (e.deltaY < 0 && scrollY >= windowHeight / 2) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <div>
            <Header />
            <BackgroundGrid />
            <ContentInfo />
            <section id="about">
                <AboutUs />
            </section>
        </div>
    )
}