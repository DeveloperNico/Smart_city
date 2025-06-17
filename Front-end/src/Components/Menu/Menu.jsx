import { useEffect, useState } from 'react';
import styles from './Menu.module.css';
import axios from 'axios';

import { Radio } from 'lucide-react';
import { HouseWifi } from 'lucide-react';
import { History } from 'lucide-react';

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
            <div className={styles.container}>
                <div className={`${styles.card} ${styles.card1}`}>
                    <a href="#">Sensors</a>
                    <Radio className={styles.radio}/>
                </div>

                <div className={`${styles.card} ${styles.card2}`}>
                    <a href="#">Ambients</a>
                    <HouseWifi className={styles.houseWifi}/>
                </div>

                <div className={`${styles.card} ${styles.card3}`}>
                    <a href="#">Historic</a>
                    <History className={styles.history}/>
                </div>
            </div>
        </div>
    )
}