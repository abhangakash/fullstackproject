import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, { email, password });
      localStorage.setItem('adminToken', res.data.token);
      alert('Login successful');
      window.location.href = '/admin/dashboard';
    } catch {
      alert('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
