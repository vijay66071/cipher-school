import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import authService from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = authService.isLoggedIn();

  const handleLogout = () => {
    authService.logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Cipher Test</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {isLoggedIn ? (
          <li><button onClick={handleLogout} className="navbar-button logout-button">Logout</button></li>
        ) : (
          <>
            <li><Link to="/login" className="navbar-button">Login</Link></li>
            <li><Link to="/register" className="navbar-button">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
