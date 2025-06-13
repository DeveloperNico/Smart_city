import { Header } from "../Components/Header/Header";
import { BackgroundGrid } from "../Components/BackgroundGrid/BackgroundGrid";
import { ContentInfo } from "../Components/ContentInfo/ContentInfo";
import { AboutUs } from "../Components/AboutUs/AboutUs";

export function PageIntro() {
    return (
        <div>
            <Header />

            <section id="home">
                <BackgroundGrid />
                <ContentInfo />
            </section>

            <section id="about">
                <AboutUs />
            </section>
        </div>
    )
}