import styles from './BackgroundGrid.module.css';
import card from '../../assets/Icons/card.svg';


export function BackgroundGrid() {
    return (
        <div className={styles.slider}>
            <div className={styles.list}>
                <div className={styles.item} style={{'--position': 1}}><img src={card} alt="" /></div>
                <div className={styles.item} style={{'--position': 2}}><img src={card} alt="" /></div>
                <div className={styles.item} style={{'--position': 3}}><img src={card} alt="" /></div>
                <div className={styles.item} style={{'--position': 4}}><img src={card} alt="" /></div>
                <div className={styles.item} style={{'--position': 5}}><img src={card} alt="" /></div>
                <div className={styles.item} style={{'--position': 6}}><img src={card} alt="" /></div>
                <div className={styles.item} style={{'--position': 7}}><img src={card} alt="" /></div>
                <div className={styles.item} style={{'--position': 8}}><img src={card} alt="" /></div>
                <div className={styles.item} style={{'--position': 9}}><img src={card} alt="" /></div>
                <div className={styles.item} style={{'--position': 10}}><img src={card} alt="" /></div>
            </div>
        </div>
    )
}