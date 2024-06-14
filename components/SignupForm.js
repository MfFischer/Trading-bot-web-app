'use client';

import { useState } from 'react';
import axios from 'axios';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/api/auth/signup', { email, password });
      setMessage('Signup successful! Please log in.');
      // Redirect to login page or clear form
    } catch (error) {
      console.error(error);
      setError('Sign up failed');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </form>
  );
}
