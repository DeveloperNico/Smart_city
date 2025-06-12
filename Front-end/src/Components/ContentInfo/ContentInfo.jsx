import styles from './ContentInfo.module.css';

export function ContentInfo() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>SMART FLOW</h1>
            <p className={styles.text}>“Welcome to the Smart Flow, the smart city where technology, sustainability and well-being <br />
                    come together to transform the way we live, work and connect."</p>
        </div>
    )
}