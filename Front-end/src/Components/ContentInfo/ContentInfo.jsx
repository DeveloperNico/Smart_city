import styles from './ContentInfo.module.css';
import ButtonStart from '../Components-Uiverse/ButtonStart/ButtonStart';
import ButtonScroll from '../Components-Uiverse/ButtonScroll/ButtonScroll';
import { NavLink }  from 'react-router-dom';

export function ContentInfo() {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.contentPrincipal}>
                    <h1 className={styles.title}>SMART FLOW</h1>
                    <p className={styles.text}>“Welcome to the Smart Flow, the smart city where technology, sustainability and well-being <br />
                            come together to transform the way we live, work and connect."</p>
                    <NavLink to={"/singUp"} className={styles.navLink}>
                        <ButtonStart />
                    </NavLink> 
                </div>
                
                <div className={styles.buttonScroll}>
                    <ButtonScroll className={styles.scrollButton} onClick={scrollToAbout} />
                </div>
            </div>
        </>
    )
}