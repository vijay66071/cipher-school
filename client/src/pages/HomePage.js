import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <header className="home-header">
        <h1>Welcome to Quiz App</h1>
      </header>
      <Footer />
    </div>
  );
};

export default HomePage;
