require('dotenv').config();  // Ensure this is the first line
const mongoose = require('mongoose');
const Question = require('./models/Question');  // Adjust path as needed
const Test = require('./models/Test');  // Adjust path as needed

async function createQuestionsAndTest() {
  try {
    // Log the Mongo URI to ensure it's loaded
    console.log('MONGO_URI:', process.env.MONGO_URI);
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create Question 1
    const question1 = new Question({
      text: 'What is the capital of France?',
      options: [
        { text: 'Paris' },
        { text: 'London' },
        { text: 'Berlin' },
        { text: 'Madrid' }
      ],
      marks: 5,
      correctAnswer: 0  // 'Paris' is the correct answer (index 0)
    });
    await question1.save();

    // Create Question 2
    const question2 = new Question({
      text: 'What is 2 + 2?',
      options: [
        { text: '3' },
        { text: '4' },
        { text: '5' },
        { text: '6' }
      ],
      marks: 3,
      correctAnswer: 1  // '4' is the correct answer (index 1)
    });
    await question2.save();

    // Create Test with the ObjectId of the saved questions
    const newTest = new Test({
      title: 'Sample Test',
      description: 'A test containing basic questions',
      questions: [question1._id, question2._id]  // Reference the ObjectId of saved questions
    });
    await newTest.save();

    console.log('Test created successfully:', newTest);

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error creating test:', error);
  }
}

createQuestionsAndTest();
