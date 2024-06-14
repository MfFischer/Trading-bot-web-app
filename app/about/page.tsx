import styles from '../../styles/About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.h1}>About Us</h1>
        <p className={styles.p}>Welcome to TradeAura. We aim to provide the best trading experience...</p>
      </div>
    </div>
  );
}
