import styles from './AboutUs.module.css';
import fotoPerfil from '../../assets/Images/foto-pessoal.jpeg';
import LogoPreta from '../../assets/Icons/Logo-preta.svg';
import ButtonGithub from '../../Components/Components-Uiverse/ButtonGithub/ButtonGithub';
import ButtonLinkedin from '../../Components/Components-Uiverse/ButtonLinkedin/ButtonLinkedin';
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
                            <p>Hi, my name is Nicolas Duarte. I'm 19 years old an currently a Digtal Solutions Apprentice at Bosch.</p>

                            <p>I'm studying System Development at SENAI and pursuing a degree in Systems Analysis and Development at UNIP.</p>

                            <p>Wants to know more about me and about my projects and skills? <br/> Check out my social medias below.</p>

                            <div className={styles.socialMedias}>
                                <a href="https://github.com/DeveloperNico" target='_blank'><ButtonGithub/></a>
                                <a href="https://www.linkedin.com/in/nicolas-duarte-dev/" target='_blank'><ButtonLinkedin/></a>
                            </div>
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