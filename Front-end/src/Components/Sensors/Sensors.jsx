import styles from './Sensors.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from '../Modal/Modal';
import api from '../../api/axios';
import { set, z } from 'zod';
import Loading from '../Components-Uiverse/Loading/Loading';

import { Pencil, Plus, Trash2, Download } from 'lucide-react';
import BurguerMenu from '../Components-Uiverse/BurguerMenu/BurguerMenu';
import ButtonBackToTop from '../Components-Uiverse/ButtonBackToTop/ButtonBackToTop';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const sensorSchema = z.object({
    sensor: z.string()
        .min(3, "Sensor name must be at least 3 characters long.")
        .max(15, "Sensor name must be a maximum of 15 characters."),

    mac_address: z.string({ required_error: "Mac address is required." })
        .min(1, "Mac address is required.")
        .max(17, "Mac address must be a maximum of 17 characters."),

    unidade_medida: z.enum(["%", "uni", "ºC", "lux"], {
        errorMap: () => ({ message: "Unidade de medida inválida. Use %, uni, ºC ou lux." }),
    }),

    latitude: z.string()
        .refine((val) => !isNaN(Number(val)), {
        message: "Latitude deve ser um número válido.",
        }),

    longitude: z.string()
        .refine((val) => !isNaN(Number(val)), {
        message: "Longitude deve ser um número válido.",
        }),

    status: z.boolean({
        required_error: "Status é obrigatório (true ou false)."
    })
});

export function Sensors() {
    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editSensorId, setEditSensorId] = useState(null);
    const [formData, setFormData] = useState({
        sensor: '',
        mac_address: '',
        unidade_medida: '',
        latitude: '',
        longitude: '',
        status: true
    });
    const [filter, setFilter] = useState("all");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access");

        api.get("http://127.0.0.1:8000/api/sensors/", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setTimeout(() => {
                setSensors(response.data.sensors || response.data);
                setLoading(false);
            }, 2000);
        })
        .catch(error => {
            console.error("Erro ao buscar sensores: ", error);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuOpen && !e.target.closest(`.${styles.dropdownContainer}`)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    const resetForm = () => {
        setFormData({
            sensor: '',
            mac_address: '',
            unidade_medida: '',
            latitude: '',
            longitude: '',
            status: true
        });
        setShowModal(false);
        setIsEditing(false);
        setEditSensorId(null);
    };

    const handleOpenEdit = (sensor) => {
        setFormData(sensor);
        setEditSensorId(sensor.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("access");

        const url = isEditing 
            ? `http://127.0.0.1:8000/api/sensors/${editSensorId}/`
            : "http://127.0.0.1:8000/api/sensors/";

        const method = isEditing ? api.put : api.post;

        method(url, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            if (isEditing) {
                setSensors(prev => prev.map(s => s.id === editSensorId ? res.data : s));
            } else {
                setSensors(prev => [...prev, res.data]);
            }
            resetForm();
        })
        .catch(err => {
            console.error("Erro ao salvar sensor:", err);
        });
    };

    const handleDelete = (id) => {
        MySwal.fire({
            title: "You're sure?",
            text: "You can't reverse this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('access');
                axios.delete(`http://127.0.0.1:8000/api/sensors/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(() => {
                        setSensors(prev => prev.filter(sensor => sensor.id !== id));
                        Swal.fire('Deleted!', 'The sensor has been removed.', 'success');
                    })
                    .catch(error => {
                        console.error("Error deleting sensor: ", error);
                        Swal.fire('Error', 'The sensor could not be deleted.', 'error');
                    })
            }
        });
    };

    const handleExportToExcel = () => {
        const token = localStorage.getItem('access');

        axios.get("http://127.0.0.1:8000/api/export/sensors/", {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob" // para acessar arquivos não binários
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "sensors.xlsx"); // nome do aruqivo
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch(error => {
            console.error("Error when exporting to Excel:", error);
            Swal.fire("Error", "The data could not be exported.", "error");

        })
    };

    console.log("Excel: ", handleExportToExcel);

    if (loading) {
        return <Loading className={styles.loadingContainer} />;
    }

    return (
        <div className={styles.center}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Sensors</h1>
                    <div className={styles.functionalitiesHeader}>
                        <button className={styles.addButton} onClick={() => setShowModal(true)}>
                            <Plus /> Add. Sensor
                        </button>

                        <button className={styles.exportButton} onClick={handleExportToExcel}>
                            <Download /> Export to Excel
                        </button>

                        <div className={styles.dropdownContainer}>
                            <BurguerMenu 
                                isOpen={menuOpen}
                                onClick={() => setMenuOpen(!menuOpen)}
                            />
                            
                            {menuOpen && (
                                <div className={styles.dropdownMenu}>
                                    <button onClick={() => { setFilter("all"); setMenuOpen(false); }}>All</button>
                                    <button onClick={() => { setFilter("temperatura"); setMenuOpen(false); }}>Temperature</button>
                                    <button onClick={() => { setFilter("contador"); setMenuOpen(false); }}>Counter</button>
                                    <button onClick={() => { setFilter("luminosidade"); setMenuOpen(false); }}>Luminosity</button>
                                    <button onClick={() => { setFilter("umidade"); setMenuOpen(false); }}>Humididy</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.list}>
                    {sensors
                        .filter(sensor => {
                            if (filter === "all") return true;
                            return sensor.sensor.toLowerCase().includes(filter);
                        })
                        .map(sensor => (
                        <div className={styles.card} key={sensor.id}>
                            <h2>{sensor.sensor}</h2>
                            <p><strong>MAC Address:</strong> {sensor.mac_address}</p>
                            <p><strong>Unit of measurement:</strong> {sensor.unidade_medida}</p>
                            <p><strong>Latitude:</strong> {sensor.latitude}</p>
                            <p><strong>Longitude:</strong> {sensor.longitude}</p>
                            <p><strong>Status:</strong> {sensor.status ? 'Active' : 'Inactive'}</p>

                            <div className={styles.actions}>
                                <button onClick={() => handleDelete(sensor.id)} className={`${styles.iconButton} ${styles.iconTrash}`}>
                                    <Trash2 />
                                </button>
                                <button onClick={() => handleOpenEdit(sensor)} className={`${styles.iconButton} ${styles.iconPencil}`}>
                                    <Pencil />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal title={isEditing ? "Edit Sensor" : "Register New Sensor"} isOpen={showModal} onClose={resetForm}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>
                        Name of sensor:
                        <input placeholder='Type here...' className={styles.inputModal} value={formData.sensor} onChange={(e) => setFormData({ ...formData, sensor: e.target.value })} required />
                    </label>
                    <label className={styles.label}>
                        MAC Address:
                        <input placeholder='__:__:__:__:__:__' className={styles.inputModal} value={formData.mac_address} onChange={(e) => setFormData({ ...formData, mac_address: e.target.value })} required />
                    </label>
                    <label className={styles.label}>
                        Unit of Measurement:
                        <select className={styles.inputChoices} value={formData.unidade_medida} onChange={(e) => setFormData({ ...formData, unidade_medida: e.target.value })}>
                            <option value="%">%</option>
                            <option value="uni">uni</option>
                            <option value="ºC">ºC</option>
                            <option value="lux">lux</option>
                        </select>
                    </label>
                    <label className={styles.label}>
                        Latitude:
                        <input placeholder='Type here...' type="number" className={styles.inputModal} value={formData.latitude} onChange={(e) => setFormData({ ...formData, latitude: e.target.value })} required />
                    </label>
                    <label className={styles.label}>
                        Longitude:
                        <input placeholder='Type here...' type="number" className={styles.inputModal} value={formData.longitude} onChange={(e) => setFormData({ ...formData, longitude: e.target.value })} required />
                    </label>
                    <label className={styles.label}>
                        Status:
                        <select className={styles.inputChoices} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </label>
                    <button className={styles.button} type="submit">
                        {isEditing ? "Save" : "Register"}
                    </button>
                </form>
            </Modal>
            <ButtonBackToTop />
        </div>
    );
}