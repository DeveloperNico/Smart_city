import styles from './Header.module.css';
import Logo from '../../assets/Icons/Logo.svg';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <img src={Logo} alt="Minha logo" />
            <div className={styles.linksHeader}>
                <a href="#">Home</a>
                <a href="#">About Us</a>
                <a href="#">Login</a>
            </div>
        </header>
    )
}