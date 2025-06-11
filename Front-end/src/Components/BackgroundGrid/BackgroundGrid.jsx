import styles from './BackgroundGrid.module.css'
import card from '../../assets/Icons/card.svg'

export function BackgroundGrid() {
    return (
        <div className={styles.container}>
            {/* Overlay preto translúcido */}
            <div className={styles.overlay}></div>

            {/* Sliders */}
            {[styles.list, styles.list2, styles.list3, styles.list4].map((listClass, index) => (
                <div className={styles.slider} key={index}>
                    <div className={listClass}>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className={styles.item}
                                style={{ '--position': i + 1 }}
                            >
                                <img src={card} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
