"use client"

import { useState } from 'react';
import styles from '../../styles/Contact.module.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.h1}>Contact Us</h1>
        {submitted ? (
          <p className={styles.successMessage}>Thank you! Your message has been sent.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Message"
              className={styles.textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit" className={styles.button}>Send</button>
          </form>
        )}
      </div>
    </div>
  );
}
