import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import Button from '../components/Button';
import './LoginPage.css';
import authService from '../services/authService';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isLoggedIn()) {
      navigate('/test-start');  // Redirect if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(formData);
      console.log('Login successful:', response);
      navigate('/test-start');  // Redirect to the test start page after login
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button text="Login" type="submit" variant="primary" />
        </form>
      </div>
 
    </div>
  );
};

export default LoginPage;
