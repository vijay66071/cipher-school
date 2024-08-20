import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import TestStartPage from './pages/TestStartPage';
import MCQTestPage from './pages/MCQTestPage';
import FinishTestPage from './pages/FinishTestPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/test-start" element={<TestStartPage />} />
        <Route path="/mcq-test/:testId" element={<MCQTestPage />} />
        <Route path="/test-submission" element={<FinishTestPage />} />
      </Routes>
    </Router>
  );
};

export default App;
