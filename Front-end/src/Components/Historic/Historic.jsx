import styles from './Historic.module.css';
import { useState, useEffect } from 'react';
import Loading from '../Components-Uiverse/Loading/Loading';
import api from '../../api/axios';

export function Historic() {
    const [historics, setHistorics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sensorsMap, setSensorsMap] = useState({});
    const [ambientsMap, setAmbientsMap] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("access");
        const headers = { Authorization: `Bearer ${token}` };

        const fetchData = async () => {
            try {
                const [historicRes, sensorRes, ambientRes] = await Promise.all([
                    api.get("http://127.0.0.1:8000/api/historic/", { headers }),
                    api.get("http://127.0.0.1:8000/api/sensors/", { headers }),
                    api.get("http://127.0.0.1:8000/api/ambients/", { headers }),
                ]);

                // Dados retornados:
                // historicRes.data -> lista de históricos
                // sensorRes.data -> lista de sensores
                // ambientRes.data -> lista de ambientes

                const sensors = sensorRes.data.sensor || sensorRes.data;
                const ambients = ambientRes.data.ambients || ambientRes.data;

                // Criar um mapa id -> nome sensor
                const sensorMap = {};
                sensors.forEach(sensor => {
                    sensorMap[sensor.id] = sensor.sensor; // sensor.sensor é o nome do sensor
                });

                // Criar um mapa id -> descrição do ambiente
                const ambientMap = {};
                ambients.forEach(ambient => {
                    ambientMap[ambient.id] = ambient.descricao || ambient.nome || 'Desconhecido';
                });

                setSensorsMap(sensorMap);
                setAmbientsMap(ambientMap);

                setHistorics(historicRes.data.historic || historicRes.data);
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading className={styles.loadingContainer} />;
    }

    return (
        <div className={styles.center}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Históricos</h1>
                </div>

                <div className={styles.list}>
                    {historics.map(historic => (
                        <div className={styles.card} key={historic.id}>
                            <h2>{historic.valor}</h2>
                            <p><strong>Time Stamped:</strong> {historic.timestamp}</p>
                            <p>
                                <strong>Sensor:</strong> {sensorsMap[historic.sensor] || 'Desconhecido'}
                            </p>
                            <p>
                                <strong>Ambient:</strong> {ambientsMap[historic.ambient_object_id] || 'Desconhecido'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
