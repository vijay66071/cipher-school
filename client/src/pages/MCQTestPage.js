import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

import './MCQTestPage.css';
import authService from '../services/authService';

const MCQTestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const { testId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await authService.getTestQuestions(testId);
        const formattedQuestions = response.data.questions.map(q => ({
          _id: q._id,
          text: q.text,
          options: q.options.map(option => option.text),
        }));
        setQuestions(formattedQuestions);
        setTimeLeft(formattedQuestions.length * 60);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [testId]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = mediaStream;

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(err => {
            console.error("Error playing video:", err);
          });
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [questions]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitTest();
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNavigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitTest = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const formattedAnswers = Object.entries(answers)
        .filter(([questionId, selectedOption]) => selectedOption !== undefined)
        .map(([questionId, selectedOption]) => ({
          questionId,
          selectedOption: selectedOption + 1,
        }));

      const response = await authService.submitTestAnswers(testId, formattedAnswers);
      navigate("/test-submission");
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="mcq-test-page">
      <Navbar />
      <div className="mcq-test-header">
        <h1>Online Test</h1>
        <div className="mcq-timer">
          <p>Time Left</p>
          <div className="mcq-time">{formatTime(timeLeft)}</div>
        </div>
      </div>
      <div className="mcq-content-container">
        <div className="mcq-camera-preview">
          <video ref={videoRef} autoPlay playsInline muted width="200" height="150"></video>
        </div>
        <div className="mcq-test-container">
          <h2>{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</h2>
          <div className="mcq-question-text">{currentQuestion?.text}</div>
          <div className="mcq-options">
            {currentQuestion?.options?.map((option, index) => (
              <label key={index} className="mcq-option-label">
                <input
                  type="radio"
                  name={`question-${currentQuestion._id}`}
                  value={index}
                  checked={answers[currentQuestion._id] === index}
                  onChange={() => handleAnswerChange(currentQuestion._id, index)}
                />
                {option}
              </label>
            ))}
          </div>
          <div className="mcq-navigation-buttons">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
            <button onClick={handleSubmitTest}>Submit Test</button>
          </div>
        </div>
        <div className="mcq-question-navigation">
          <h3>{`Test: ${testId}`}</h3>
          <div className="mcq-question-buttons">
            {questions.map((question, index) => {
              const isAnswered = answers[question._id] !== undefined;
              return (
                <button
                  key={index}
                  className={`mcq-question-button ${currentQuestionIndex === index ? 'mcq-current' : ''} ${isAnswered ? 'mcq-answered' : 'mcq-unanswered'}`}
                  onClick={() => handleNavigateToQuestion(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
  
    </div>
  );
};

export default MCQTestPage;
