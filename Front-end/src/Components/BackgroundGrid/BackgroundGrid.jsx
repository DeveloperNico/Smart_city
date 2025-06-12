import styles from './BackgroundGrid.module.css';
import cardSmartCity from '../../assets/Icons/card-SmartCity.svg';
import cardSmartCity2 from '../../assets/Icons/card-SmartCity2.svg';
import cardLuminosity from '../../assets/Icons/card-Luminosity.svg';
import cardHumidity from '../../assets/Icons/card-humidity.svg';
import cardCounter from '../../assets/Icons/card-Counter.svg';
import cardTemperature from '../../assets/Icons/card-temperature.svg';
import { useState } from 'react';

// Array de arrays - cada subarray representa as imagens para uma linha específica
const rowImages = [
  [cardLuminosity, cardHumidity, cardCounter, cardTemperature], // Linha 1
  [cardTemperature, cardCounter, cardHumidity, cardLuminosity], // Linha 2
  [cardSmartCity, cardSmartCity2, cardLuminosity, cardHumidity], // Linha 3
  [cardCounter, cardTemperature, cardSmartCity, cardSmartCity2]  // Linha 4
];

export function BackgroundGrid() {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={styles.container}>
            {/* Overlay preto translúcido */}
            <div className={styles.overlay}></div>

            {/* Sliders */}
            {[styles.list, styles.list2, styles.list3, styles.list4].map((listClass, rowIndex) => (
                <div className={styles.slider} key={rowIndex}>
                    <div className={listClass}>
                        {Array.from({ length: 10 }).map((_, i) => {
                            // Seleciona a imagem baseada na posição e na linha
                            const imageIndex = i % rowImages[rowIndex].length;
                            const imageSrc = rowImages[rowIndex][imageIndex];
                            
                            return (
                                <div
                                    key={i}
                                    className={styles.item}
                                    style={{ '--position': i + 1 }}
                                >
                                    <img src={imageSrc} alt="" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}