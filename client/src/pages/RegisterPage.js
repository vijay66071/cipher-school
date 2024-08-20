import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import './RegisterPage.css';
import authService from '../services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(formData);
      console.log('Registration successful:', response);
      navigate('/login');  // Redirect to the login page upon successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
      alert('Registration failed. Please try again.');  // Show alert on error
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="register-page">
      <Navbar />
      <div className="register-container">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <Button text="Register" type="submit" variant="success" />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
