import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Regjistrimi dështoi. Kontrollo të dhënat.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Emri"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email-i"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Fjalëkalimi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Regjistrohu</button>
      </form>

      {/* Link për të shkuar te login nëse ka llogari */}
      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>

      {/* Link për në faqen kryesore */}
      <Link to="/" className="return-home">
        <FaHome style={{ marginRight: '6px' }} />
        Return Home
      </Link>
    </div>
  );
};

export default Register;
