import { useEffect, useState } from 'react';
import styles from './Menu.module.css';
import axios from 'axios';

export function Menu() {
    const [name, setName] = useState('');

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setName(username);
        }
    }, []);

    return (
        <div className={styles.menu}>
            <h2>Seja bem-vindo(a), {name}!</h2>
        </div>
    )
}