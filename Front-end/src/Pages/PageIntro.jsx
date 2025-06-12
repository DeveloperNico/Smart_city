import styles from "./PageIntro.module.css";
import { Header } from "../Components/Header/Header";
import { BackgroundGrid } from "../Components/BackgroundGrid/BackgroundGrid";
import { ContentInfo } from "../Components/ContentInfo/ContentInfo";
import ButtonStart  from "../Components/ButtonStart/ButtonStart";

export function PageIntro() {
    return (
        <div>
            <Header />
            <BackgroundGrid />
            <ContentInfo />
        </div>
    )
}