import styles from '../styles/Home.module.css';
import AuthButtons from '../components/AuthButtons';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
          <img src="/tradeAura.png" alt="logo" className={styles.logo} />
        </div>
      <div className={styles.main}>
        <h1 className={styles.h1}>Trading Bot with a <span className={styles.textaccent}>Brighter</span> Insight</h1>
        <AuthButtons />
      </div>
      <img src="/botImage.png" alt="Bot Image" className={styles.botImage} />
    </div>
  );
}
