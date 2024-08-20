const getEmailTemplate = (name, testTitle, score) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test Results</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                  color: #333;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  background-color: #4caf50;
                  color: #ffffff;
                  padding: 10px 0;
                  border-radius: 5px 5px 0 0;
              }
              .header h1 {
                  margin: 0;
                  font-size: 24px;
              }
              .content {
                  padding: 20px;
                  text-align: left;
              }
              .content h2 {
                  font-size: 20px;
                  margin-bottom: 10px;
              }
              .content p {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
              .score {
                  font-size: 18px;
                  font-weight: bold;
                  color: #4caf50;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  font-size: 14px;
                  color: #777777;
                  margin-top: 20px;
                  border-top: 1px solid #dddddd;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Test Results</h1>
              </div>
              <div class="content">
                  <h2>Hello ${name},</h2>
                  <p>Your test results for the test "<strong>${testTitle}</strong>" are as follows:</p>
                  <p class="score">Your Score: ${score}</p>
                  <p>Thank you for taking the test. We wish you all the best in your future endeavors.</p>
              </div>
              <div class="footer">
                  <p>Best Regards,<br>Your Test Platform Team</p>
              </div>
          </div>
      </body>
      </html>
    `;
  };
  
  module.exports = getEmailTemplate;
  