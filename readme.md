Dynamic Email Generator Project

This project demonstrates how to dynamically generate and send an email using order data fetched from a mock API. It utilizes MJML for email templating, Nunjucks for dynamic data injection, and Nodemailer to send the email.

Create Environment Variables
Create a .env file in the root directory of the project to store sensitive credentials:

EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

This file will store your email credentials that will be used by Nodemailer to send the email. Make sure to replace your-email@example.com and your-email-password with your actual email details.

Run the Mock API
To start the mock API that serves the order data, run the following command:

npm run start
This will start an Express server locally at http://localhost:8080. The API will serve the order data from the prospect_eval.json file.

Generate and Send the Email
Once the mock API is running, you can generate and send the email by running:

npm run build

This will:

Fetch the order data from the mock API

Render the email using the MJML template and Nunjucks

Convert the rendered MJML to HTML

Send the email using Nodemailer

Troubleshooting
Error: Unable to fetch data from the mock API: Ensure that the mock API is running (npm run start).

Email not sent: Double-check your .env file for correct email credentials and ensure you have a working internet connection.
