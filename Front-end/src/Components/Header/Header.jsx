import styles from './Header.module.css';
import Logo from '../../assets/Icons/Logo.svg';

export function Header({ className = "headerGradient" }) {
    return (
        <header className={`${styles.headerContainer} ${styles[className]}`}>
            <img src={Logo} alt="Minha logo" />
            <nav className={styles.linksHeader}>
                <a href="/" className={styles.link}>Home</a>
                <a href="/login">Login</a>
            </nav>
        </header>
    )
}