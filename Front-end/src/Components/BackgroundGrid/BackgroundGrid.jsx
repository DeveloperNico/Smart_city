import React from "react";
import styles from "./BackgroundGrid.module.css";

export function BackgroundGrid() {
  const rows = 5; // número de cards por coluna
  const cols = 4; // número de colunas

  return (
    <div className={styles.backgroundGrid}>
      {[...Array(cols)].map((_, colIndex) => (
        <div
          key={colIndex}
          className={`${styles.columnWrapper} ${
            colIndex % 2 === 0 ? styles.scrollUp : styles.scrollDown
          } ${colIndex % 3 === 0 ? styles.fast : styles.slow}`} // velocidade alternada
        >
          <div className={styles.gridColumn}>
            {[...Array(rows * 2)].map((_, rowIndex) => (
              <div key={rowIndex} className={styles.gridCard} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
