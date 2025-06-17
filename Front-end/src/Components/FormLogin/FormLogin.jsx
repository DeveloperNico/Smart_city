import styles from './FormLogin.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { set, z } from 'zod';
import { BackgroundGrid } from '../BackgroundGrid/BackgroundGrid';
import ImageSmart from '../../assets/Images/Innovation-amico.svg';

const loginSchema = z.object({
    username: z
        .string()
        .min(3, "The username must be at least 3 characters.")
        .max(15, "The username must have a maximum 15 characters."),
    password: z
        .string()
        .min(1, "Password required")
        .max(15, "The password must have a maximum 15 characters."),
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

            const userRes = await axios.get("http://127.0.0.1:8000/api/me/", {
                headers: { Authorization: `Bearer ${access}` }
            });

            const usernameFromApi = userRes.data.username;
            localStorage.setItem("username",usernameFromApi);
            
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
                            <label>Username:</label>
                            <input className={styles.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Type here..."/>
                            {errors.username && <span className={styles.error}>{errors.username}</span>}
                        </div>
                        <div className={styles.password}>
                            <label>Password:</label>
                            <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••"/>
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