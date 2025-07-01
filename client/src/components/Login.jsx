import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Ridrejto sipas rolit
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Link për të shkuar te Register */}
      <p className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>

      <Link to="/" className="return-home">
        <FaHome style={{ marginRight: '6px' }} />
        Return Home
      </Link>
    </div>
  );
};

export default Login;
