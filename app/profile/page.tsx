'use client';

import React, { useState, useEffect } from 'react';
import styles from '../../styles/Profile.module.css';

export default function Profile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    balance: 0,
    lastLogin: '',
    profilePicture: '',
  });
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from backend
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await fetch('/api/user/profile');
    const data = await response.json();
    setUser(data);
  };

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', file);

    const response = await fetch('/api/user/uploadPicture', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setUser({ ...user, profilePicture: data.profilePicture });
  };

  const handleApiKeyUpload = async () => {
    const response = await fetch('/api/user/uploadApiKey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey, apiSecret }),
    });
    if (response.ok) {
      alert('API keys uploaded successfully');
    } else {
      alert('Failed to upload API keys');
    }
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async () => {
    const response = await fetch('/api/user/updateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      setEditing(false);
      fetchUserData();
    } else {
      alert('Failed to update profile');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profilePicture}>
          {user.profilePicture ? (
            <img src={user.profilePicture} alt="Profile" />
          ) : (
            <div className={styles.initials}>
              {user.firstName && user.firstName[0].toUpperCase()}
            </div>
          )}
          <input type="file" onChange={handlePictureUpload} />
        </div>
        <div className={styles.details}>
          <div className={styles.field}>
            <label>First Name:</label>
            {editing ? (
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
              />
            ) : (
              <span>{user.firstName}</span>
            )}
          </div>
          <div className={styles.field}>
            <label>Last Name:</label>
            {editing ? (
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
              />
            ) : (
              <span>{user.lastName}</span>
            )}
          </div>
          <div className={styles.field}>
            <label>Email:</label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            ) : (
              <span>{user.email}</span>
            )}
          </div>
          <div className={styles.field}>
            <label>Balance:</label>
            <span>${user.balance}</span>
          </div>
          <div className={styles.field}>
            <label>Last Login:</label>
            <span>{user.lastLogin}</span>
          </div>
          {editing ? (
            <button onClick={handleUpdate}>Save</button>
          ) : (
            <button onClick={handleEditToggle}>Edit</button>
          )}
        </div>
      </div>
      <div className={styles.apiKeyContainer}>
        <h3>Upload Alpaca API Keys</h3>
        <input
          type="text"
          placeholder="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="API Secret"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
        />
        <button onClick={handleApiKeyUpload}>Upload API Keys</button>
      </div>
    </div>
  );
}
