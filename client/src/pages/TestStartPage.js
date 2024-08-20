import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './TestStartPage.css';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const TestStartPage = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);  // Store the stream in state
  const videoRef = useRef(null);  // Create a ref for the video element
  const navigate = useNavigate();
  const [test, setTest] = useState(null);  // Define test in the state
  


  const handleStartTest = async () => {
    try {
      // Request access to camera and microphone
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log("Stream received:", mediaStream);  // Log the stream to see if it's valid
      setStream(mediaStream);  // Store the stream in state
      setPermissionsGranted(true);  // Update the state to indicate permissions are granted
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(err => {
          console.error("Error playing video:", err);  // Log any errors related to playing the video
          setError('Unable to play video. Please check your camera settings.');
        });
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);  // Log the error
      setError('Camera and microphone access are required to start the test.');
    }
  };
  const handleProceed = () => {
    if (test) {
      navigate(`/mcq-test/${test._id}`);  // Pass the testId in the URL
    } else {
      setError('Test not found. Please try again.');
    }
  };
  
  useEffect(() => {
    // Fetch the test details
    const fetchTest = async () => {
      try {
        const response = await authService.getTests();
        if (response.data.tests.length > 0) {
          setTest(response.data.tests[0]);  // Set the test in the state
        } else {
          setError('No test available.');
        }
      } catch (err) {
        console.error("Error fetching test:", err);
        setError('Failed to load test. Please try again.');
      }
    };
  
    fetchTest();
  }, []);
  

  useEffect(() => {
    if (permissionsGranted && videoRef.current && stream) {
      // Assign the video stream to the video element when it's available
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.error("Error playing video:", err);  // Log any errors related to playing the video
        setError('Unable to play video. Please check your camera settings.');
      });
    }
  }, [permissionsGranted, stream]);  // Run this effect when permissionsGranted or stream changes

  return (
    <div className="test-start-page">
      <Navbar />
      <div className="test-container">
        <h1>React Basics Test</h1>
        {!permissionsGranted && (
          <button onClick={handleStartTest}>Start Test</button>
        )}
        {error && <p className="error-message">{error}</p>}
        {permissionsGranted && (
  <div className="video-and-button-container">
    <div className="video-preview">
      <video ref={videoRef} autoPlay playsInline muted width="600" height="400"></video>
    </div>
    <button onClick={handleProceed} className="proceed-button">Proceed</button>
  </div>
)}

      </div>
    
    </div>
  );
};

export default TestStartPage;