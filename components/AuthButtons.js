'use client';

import styles from '../styles/Home.module.css';
import { useRouter } from 'next/navigation';

const AuthButtons = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleSignupClick = () => {
    router.push('/signup');
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className={styles.buttonsContainer}>
      <div className={styles.forms}>
        <button className={styles.button} onClick={handleLoginClick}>Login</button>
        <button className={styles.button} onClick={handleSignupClick}>Signup</button>
      </div>
      
    </div>
  );
};

export default AuthButtons;

