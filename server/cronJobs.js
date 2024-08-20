const cron = require('node-cron');
const Test = require('./models/Test');
const Response = require('./models/Response');
const nodemailer = require('nodemailer');
const getEmailTemplate = require('./emailTemplate');
require('dotenv').config();

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to evaluate tests and send results
const evaluateTests = async () => {
  try {
    // Fetch all submitted responses that haven’t been evaluated yet
    const responses = await Response.find({ score: { $exists: false } }).populate('testId').populate('userId');

    for (const response of responses) {
      const { testId, answers } = response;

      // Fetch test questions and evaluate answers
      const test = await Test.findById(testId).populate({
        path: 'questions',
        select: 'text options marks correctAnswer', 
      });

      if (!test) {
        console.error(`Test not found for testId: ${testId}`);
        continue; // Skip this response if the test is not found
      }

      console.log('Populated Test Data:', test);

      let score = 0;

      test.questions.forEach((question) => {
        const userAnswer = answers.find((answer) => answer.questionId.toString() === question._id.toString());

        if (!userAnswer) {
          console.log(`No answer found for question: ${question._id}`);
          return; // Skip if the answer is not found
        }

        if (userAnswer.selectedOption === question.correctAnswer) {
          score += question.marks; // Increment score by the marks assigned to the question
        } else {
          console.log(`Incorrect answer for question: ${question._id}`);
        }
      });

      // Update the response with the calculated score
      response.score = score;
      await response.save();

      // Generate email template
      const emailTemplate = getEmailTemplate(response.userId.name, test.title, score);

      // Send email with the score
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: response.userId.email,
        subject: 'Your Test Results',
        html: emailTemplate,
      });

      console.log(`Score for user ${response.userId.name} evaluated and email sent.`);
    }
  } catch (error) {
    console.error('Error evaluating tests:', error);
  }
};

cron.schedule('0 * * * *', evaluateTests);