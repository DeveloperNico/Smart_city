import styles from './Header.module.css';
import Logo from '../../assets/Icons/Logo.svg';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <img src={Logo} alt="Minha logo" />
            <nav className={styles.linksHeader}>
                <a href="#home" className={styles.link}>Home</a>
                <a href="#about">About Us</a>
            </nav>
        </header>
    )
}