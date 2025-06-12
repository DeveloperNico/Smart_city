import styles from "./PageIntro.module.css";
import { Background } from "../Components/Background/Background";
import { Header } from "../Components/Header/Header";
import ButtonStart  from "../Components/ButtonStart/ButtonStart";
import { BackgroundGrid } from "../Components/BackgroundGrid/BackgroundGrid";

export function PageIntro() {
    return (
        <div>
            <Header />
            <BackgroundGrid />
        </div>
    )
}