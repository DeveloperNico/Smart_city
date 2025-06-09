import styles from "./PageIntro.module.css";
import { Background } from "../Components/Background/Background";
import { Header } from "../Components/Header/Header";
import ButtonStart  from "../Components/ButtonStart/ButtonStart"

export function PageIntro() {
    return (
        <div>
            <Background />
            <Header />
            <div className={styles.content}>
                <h1>SMART FLOW</h1>
                <p>“Welcome to the Smart Flow, the smart city where technology, sustainability and well-being <br />
                    come together to transform the way we live, work and connect."</p>
                <ButtonStart />
            </div>
        </div>
    )
}