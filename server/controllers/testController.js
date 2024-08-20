const Test = require('../models/Test');
const Question = require('../models/Question');
const Response = require('../models/Response');

// Fetch all available tests
exports.getTests = async (req, res) => {
  try {
    const tests = await Test.find().select('title description');
    res.status(200).json({ tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ message: 'Error fetching tests', error });
  }
};

// Start a specific test
exports.startTest = async (req, res) => {
  try {
    const testId = req.params.testId;
    const test = await Test.findById(testId).populate({
      path: 'questions',
      select: 'text options marks correctAnswer', 
    });

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({ message: 'Test ready to start', test });
  } catch (error) {
    console.error("Error starting test:", error);
    res.status(500).json({ message: 'Error starting test', error });
  }
};

// Submit test answers
exports.submitTest = async (req, res) => {
  const { answers } = req.body;
  const userId = req.userId; // Ensure this is set by the authentication middleware
  const testId = req.params.testId;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'Invalid answers format' });
  }

  try {
    const response = new Response({ userId, testId, answers });
    await response.save();
    res.status(201).json({ message: 'Test submitted successfully' });
  } catch (error) {
    console.error("Error submitting test:", error);
    res.status(500).json({ message: 'Error submitting test', error });
  }
};

// Create a new test
exports.createTest = async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    const newTest = new Test({
      title,
      description,
      questions
    });

    await newTest.save();
    res.status(201).json({ message: 'Test created successfully', test: newTest });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ message: 'Error creating test', error });
  }
};

// Fetch questions for a specific test
exports.getTestQuestions = async (req, res) => {
  try {
    const testId = req.params.testId;
    const test = await Test.findById(testId).populate({
      path: 'questions',
      select: 'text options marks',
    });

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({ questions: test.questions });
  } catch (error) {
    console.error("Error fetching test questions:", error);
    res.status(500).json({ message: 'Error fetching test questions', error });
  }
};
