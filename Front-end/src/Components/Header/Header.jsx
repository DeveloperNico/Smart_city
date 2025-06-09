import styles from './Header.module.css';
import Logo from '../../assets/Icons/Logo.svg';

export function Header() {
    return (
        <header>
            <img src={Logo} alt="Minha logo" />
        </header>
    )
}