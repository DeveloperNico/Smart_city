import { useEffect, useState } from 'react';
import styles from './Menu.module.css';
import axios from 'axios';
import { Sensors } from '../Sensors/Sensors';

import { Radio } from 'lucide-react';
import { HouseWifi } from 'lucide-react';
import { History } from 'lucide-react';

export function Menu() {
    const [name, setName] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);

    const renderContent = () => {
        switch (selectedCard) {
            case 'sensors': return <Sensors />;
            case 'ambients': return <Ambients />;
            case 'historic': return <Historics />;
            default: return null;
        }
    };

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setName(username);
        }
    }, []);

    return (
        <div className={styles.menu}>
            <h2>Welcome, {name}!</h2>
            <div className={styles.container}>
                <div className={`${styles.card} ${styles.card1}`} onClick={() => setSelectedCard('sensors')}>
                    <a href="#">Sensors</a>
                    <Radio className={styles.radio}/>
                </div>

                <div className={`${styles.card} ${styles.card2}`} onClick={() => setSelectedCard('ambients')}>
                    <a href="#">Ambients</a>
                    <HouseWifi className={styles.houseWifi}/>
                </div>

                <div className={`${styles.card} ${styles.card3}`} onClick={() => setSelectedCard('historic')}>
                    <a href="#">Historic</a>
                    <History className={styles.history}/>
                </div>
            </div>

            <div>
                {renderContent()}
            </div>
        </div>
    )
}