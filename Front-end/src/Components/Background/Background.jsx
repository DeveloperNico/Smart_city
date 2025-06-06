import styles from './Background.module.css';
import { Header } from '../Header/Header';
import { Home } from '../Home/Home';

export function Background() {
    return (
        <div className={styles.background}>
            <Header />
            <Home />
        </div>
    )
}