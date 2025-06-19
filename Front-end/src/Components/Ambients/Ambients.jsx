import styles from './Ambients.module.css';
import { useState, useEffect, use } from 'react';
import Loading from '../Components-Uiverse/Loading/Loading';
import api from '../../api/axios';

export function Ambients() {
    const [ambients, setAmbients] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const token = localStorage.getItem("access");

        api.get("http://127.0.0.1:8000/api/ambients/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setTimeout(() => {
                setAmbients(response.data.ambients || response.data);
                setLoading(false);
            }, 2000);
        })
        .catch(error => {
            console.error("Erro ao buscar ambientes: ", error)
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <Loading className={styles.loadingContainer} />
        );
    }

    return (
        <div className={styles.center}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Ambients</h1>
                </div>

                <div className={styles.list}>
                    {ambients.map(ambient => {
                        return (
                            <div className={styles.card} key={ambient.id}>
                                <h2>{ambient.sig}</h2>
                                <p><strong>Description:</strong> {ambient.descricao}</p>
                                <p><strong>NI:</strong> {ambient.ni}</p>
                                <p><strong>Responsible:</strong> {ambient.responsavel}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}