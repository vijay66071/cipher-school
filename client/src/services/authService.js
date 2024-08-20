import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Base URL for the API

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTests = async () => {
  try {
    const response = await axios.get(`${API_URL}/test/tests`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getTestQuestions = async (testId) => {
  try {
    const response = await axios.get(`${API_URL}/test/${testId}/questions`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const isLoggedIn = () => {
  return localStorage.getItem('user') !== null;  // Check if user is logged in by verifying if the user data exists in localStorage
};

const submitTestAnswers = async (testId, answers) => {
  try {
    const response = await axios.post(`${API_URL}/test/submit/${testId}`, { answers }, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default { register, login, getTests, logout, isLoggedIn, getTestQuestions, submitTestAnswers };
