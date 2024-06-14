import styles from '../../styles/Signup.module.css';

export default function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.h1}>Create a Trading Account</h1>
        <form>
          <input type="text" placeholder="Full Name" className={styles.input} required />
          <input type="email" placeholder="Email" className={styles.input} required />
          <input type="password" placeholder="Password" className={styles.input} required />
          <input type="text" placeholder="Address" className={styles.input} required />
          <input type="text" placeholder="Phone Number" className={styles.input} required />
          <button type="submit" className={styles.button}>Signup</button>
        </form>
      </div>
    </div>
  );
}
