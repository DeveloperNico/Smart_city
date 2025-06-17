import styles from './FormLogin.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { set, z } from 'zod';
import { BackgroundGrid } from '../BackgroundGrid/BackgroundGrid';
import ImageSmart from '../../assets/Images/Smart home-cuate.svg';

const loginSchema = z.object({
    username: z
        .string()
        .min(3, "Nome de usuário deve ter pelo menos 3 caracteres")
        .max(15, "Nome de usuário deve ter no máximo 15 caracteres"),
    password: z
        .string()
        .min(1, "Senha é obrigatória")
        .max(15, "Senha deve ter no máximo 15 caracteres"),
});

export function FormLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const validation = loginSchema.safeParse({ username, password });

        if (!validation.success) {
            const fieldError = {};
            validation.error.errors.forEach(error => {
                fieldError[error.path[0]] = error.message;
            });
            setErrors(fieldError);
            return;
        }

        setErrors({});

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", {
                username,
                password
            });

            const { access, refresh } = response.data;
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);
            
            navigate("/home");
        } catch (error) {
            setLoginError("Login error. Please, check the credentials!");
        }
    };

    useEffect(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    }, []);

    return (
        <>
            <BackgroundGrid/>
            <div className={styles.container}>
            <form className={styles.form} onSubmit={handleLogin}>
                <div className={styles.formContent}>
                    <div className={styles.formHeader}>
                        <h2 className={styles.title}>Login</h2>
                        <div className={styles.username}>
                            <label>Nome de usuário:</label>
                            <input className={styles.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            {errors.username && <span className={styles.error}>{errors.username}</span>}
                        </div>
                        <div className={styles.password}>
                            <label>Senha:</label>
                            <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {errors.password && <span className={styles.error}>{errors.password}</span>}
                        </div>

                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.button}>
                                Entrar
                            </button>
                        </div>
                        {loginError && <span className={styles.errorButton}>{loginError}</span>}
                    </div>

                    <div className={styles.imageContainer}>
                        <img src={ImageSmart} alt="Imagem para exemplificar uma gestão escolar" className={styles.image}/>
                    </div>
                </div>
            </form>
        </div>
        </>

    )
}