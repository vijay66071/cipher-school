import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStartedClick = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <div className="home-page">
      <Navbar />
      <header className="home-header">
        <h1>Welcome to Cipher Test</h1>
        <p>
        Dive into our platform and experience the most comprehensive test 
    environment designed specifically for students. Our user-friendly 
    interface ensures seamless navigation and real-time feedback to help 
    you excel. With a variety of multiple-choice questions tailored to 
    enhance your knowledge, you'll be able to test your skills and track 
    your progress efficiently. Enjoy an interactive and engaging learning 
    experience that prepares you for success in your academic and professional 
    journey. Explore, practice, and achieve your goals with Cipher Test.
        </p>
        <button className="get-started-button" onClick={handleGetStartedClick}>
          Get Started
        </button>
      </header>
      <Footer />
    </div>
  );
};

export default HomePage;
