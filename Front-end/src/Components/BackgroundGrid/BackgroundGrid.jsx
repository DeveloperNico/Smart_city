import styles from './BackgroundGrid.module.css';

export function BackgroundGrid() {
  const totalColumns = 4;
  const itemsPerColumn = 10; // Aumentei para melhor visualização e para que a animação tenha mais "conteúdo"

  return (
    <div className={styles.slider} style={{ '--quantity': itemsPerColumn }}>
      {Array.from({ length: totalColumns }).map((_, columnIndex) => {
        const isReversed = columnIndex % 2 !== 0; // Colunas ímpares terão animação reversa

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
                    <div className={styles.container}>
                      <div className={styles.content}>
                        {/* Conteúdo dinâmico, se necessário. Ex: Item {itemIndex + 1} */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicar os itens para simular um loop contínuo sem "gaps" */}
              {Array.from({ length: itemsPerColumn }).map((_, itemIndex) => (
                <div
                  key={`duplicate-${itemIndex}`} // Chave única para o item duplicado
                  className={styles.item}
                  style={{ '--position': itemIndex + 1 }}
                >
                  <div className={styles.skewFix}>
                    <div className={styles.container}>
                      <div className={styles.content}>
                        {/* Conteúdo dinâmico, se necessário. Ex: Item {itemIndex + 1} */}
                      </div>
                    </div>
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