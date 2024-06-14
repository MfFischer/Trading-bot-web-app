"use client"

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" legacyBehavior>
          <a className={styles.logo}>Trade<span className={styles.textaccent}>Aura</span></a>
        </Link>
        <div className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
          <Link href="/" legacyBehavior>
            <a className={styles.navLink}>Home</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className={styles.navLink}>About Us</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className={styles.navLink}>Contact Us</a>
          </Link>
        </div>
        <button className={styles.hamburger} onClick={toggleMenu}>
          <span className={styles.hamburgerIcon}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
