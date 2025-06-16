import styles from './AboutUs.module.css';
import fotoPerfil from '../../assets/Images/foto-pessoal.jpeg';
import LogoPreta from '../../assets/Icons/Logo-preta.svg';
import { useEffect } from 'react';

export function AboutUs() {
    useEffect(() => {
        const reveals = document.querySelectorAll(`.${styles.reveal}`);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.active);
                    // Se quiser que a animação só ocorra uma vez, você pode desativar o observer
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.9 });

        reveals.forEach((el) => observer.observe(el));
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={`${styles.aboutMe} ${styles.reveal}`}>
                    <figure>
                        <img src={fotoPerfil} alt="Image for About Us" />
                    </figure>

                    <div>
                        <div>
                            <p>Hi, my name is Nicolas Duarte. I'm a developer with a passion for technology, always looking for innovative solutions that make a difference to people's daily lives.</p>

                            <p>I have a dedicated, optimistic profile and believe in the power of technology to transform realities.</p>

                            <p>Throughout my career, I have specialized in creating intelligent systems focused on efficiency, practicality and collective well-being.</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.aboutSystem} ${styles.reveal}`}>
                    <h2>About</h2>
                    <figure>
                        <img src={LogoPreta} alt="" />
                    </figure>

                    <div>
                        <p>
                            The Smart Flow was designed to be the digital heart of a Smart City — a centralized platform that connects people, services, and technology in a fluid and intelligent way. 
                            With a user-friendly interface and efficient integration, it allows citizens to access essential urban resources with just a few clicks.
                        </p>

                        <p>
                            More than just a system, this platform is a step forward in building a more sustainable, connected, and inclusive city. 
                            It reflects a commitment to innovation and social responsibility, making technology a true ally in transforming the future of urban living.
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}