import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { username, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={loginUser}>
      <h2>Admin Login</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
