import styles from './ContentInfo.module.css';
import ButtonStart from '../ButtonStart/ButtonStart';
import ButtonScroll from '../ButtonScroll/ButtonScroll';

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
                <div className={styles.oi}>
                    <h1 className={styles.title}>SMART FLOW</h1>
                    <p className={styles.text}>“Welcome to the Smart Flow, the smart city where technology, sustainability and well-being <br />
                            come together to transform the way we live, work and connect."</p>
                    <ButtonStart />    
                </div>
                
                <div className={styles.buttonScroll}>
                    {/* Botão para scroll aqui */}
                    <ButtonScroll className={styles.scrollButton} onClick={scrollToAbout} />
                </div>
            </div>
        </>
    )
}