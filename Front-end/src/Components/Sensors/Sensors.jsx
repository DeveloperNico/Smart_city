import styles from './Sensors.module.css';
import { useState, useEffect } from 'react';
import api from '../../api/axios';

export function Sensors() {
    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access");

        api.get("http://127.0.0.1:8000/api/sensors/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setTimeout(() => {
                setSensors(response.data.sensors || response.data);
                setLoading(false);
            }, 1000);
        })
        .catch(error => {
            console.error("Failed to search sensors: ", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Carregando sensores...</p>
            </div>
        );
    }

    return (
        <div className={styles.center}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Sensors</h1>
                </div>

                <div className={styles.list}>
                    
                </div>
            </div>
        </div>
    )
}