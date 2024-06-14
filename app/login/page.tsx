import styles from '../../styles/Login.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.h1}>Login to Your Account</h1>
        <form>
          <input type="email" placeholder="Email" className={styles.input} required />
          <input type="password" placeholder="Password" className={styles.input} required />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}
