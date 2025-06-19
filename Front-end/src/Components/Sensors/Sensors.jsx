import styles from './Sensors.module.css';
import { useState, useEffect } from 'react';
import Loading from '../Components-Uiverse/Loading/Loading';
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
            }, 2000);
        })
        .catch(error => {
            console.error("Failed to search sensors: ", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <Loading className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Carregando sensores...</p>
            </Loading>
        );
    }

    return (
        <div className={styles.center}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Sensors</h1>
                </div>

                <div className={styles.list}>
                    {sensors 
                        .map(sensor => (
                        <div className={styles.card} key={sensor.id}>
                            <h2>{sensor.sensor}</h2>
                            <p><strong>Mac address:</strong> {sensor.mac_address}</p>
                            <p><strong>Unit of measurement:</strong> {sensor.unidade_medida}</p>
                            <p><strong>Latitude:</strong> {sensor.latitude}</p>
                            <p><strong>Longitude:</strong> {sensor.longitude}</p>
                            <p><strong>Status:</strong> {sensor.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}