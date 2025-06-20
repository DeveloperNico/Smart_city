import styles from './FormSingUp.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';
import { BackgroundGrid } from '../BackgroundGrid/BackgroundGrid';
import ImageSmart from '../../assets/Images/Innovation-amico.svg';

const registerSchema = z.object({
    username: z.string().min(3, "The username must be at least 3 characters.").max(15),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "The password must be at least 6 characters.").max(20),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords do not match."
});

export function FormSingUp() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = registerSchema.safeParse(form);

        if (!validation.success) {
            const fieldErrors = {};
            validation.error.errors.forEach(error => {
                fieldErrors[error.path[0]] = error.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        setRegisterError('');

        try {
            await axios.post('http://127.0.0.1:8000/api/register/', {
                username: form.username,
                email: form.email,
                password: form.password
            });

            // Após o cadastro, redireciona para o login
            navigate('/login');
        } catch (error) {
            setRegisterError('Registration failed. Try another username or email.');
        }
    };

    return (
        <>
            <BackgroundGrid />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formContent}>
                        <div className={styles.formHeader}>
                            <h2 className={styles.title}>Register</h2>

                            <div className={styles.username}>
                                <label>Username:</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Type your username"
                                />
                                {errors.username && <span className={styles.error}>{errors.username}</span>}
                            </div>

                            <div className={styles.email}>
                                <label>Email:</label>
                                <input
                                    className={styles.input}
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                />
                                {errors.email && <span className={styles.error}>{errors.email}</span>}
                            </div>

                            <div className={styles.password}>
                                <label>Password:</label>
                                <input
                                    className={styles.input}
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                />
                                {errors.password && <span className={styles.error}>{errors.password}</span>}
                            </div>

                            <div className={styles.confirmPassword}>
                                <label>Confirm Password:</label>
                                <input
                                    className={styles.input}
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
                            </div>

                            <div className={styles.buttonContainer}>
                                <button type="submit" className={styles.button}>Register</button>
                            </div>

                            {registerError && <span className={styles.errorButton}>{registerError}</span>}

                            <div className={styles.registerRedirect}>
                                <p>Already have an account? <a href="/login">Login</a></p>
                            </div>
                        </div>

                        <div className={styles.imageContainer}>
                            <img src={ImageSmart} alt="Registration Illustration" className={styles.image} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
