import styles from './Header.module.css';

import Logo from '../../assets/Icons/Logo.svg';

export function Header() {
    return (
        <header>
            <img src={Logo} alt="Minha logo" />
            <h1>Olá mundo</h1>
        </header>
    )
}