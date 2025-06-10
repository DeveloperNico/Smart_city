import styles from './BackgroundGrid.module.css';
import testImage from '../../assets/Images/teste.png';

export function BackgroundGrid() {
  const totalColumns = 4;
  const itemsPerColumn = 4;

  return (
    <div className={styles.slider}>
      {Array.from({ length: totalColumns }).map((_, columnIndex) => {
        const isReversed = columnIndex % 2 !== 0;

        return (
          <div className={styles.column} key={columnIndex}>
            <div className={`${styles.list} ${isReversed ? styles.reverse : ''}`}>
              {Array.from({ length: itemsPerColumn }).map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className={styles.item}
                  style={{ '--position': itemIndex + 1 }}
                >
                  <div className={styles.skewFix}>
                    <img src={testImage} alt="Grid item" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
