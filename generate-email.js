require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const mjml = require("mjml");
const nunjucks = require("nunjucks");
const nodemailer = require("nodemailer");

// mock API URL
const API_URL = "http://localhost:8080/api/orders/latest";

// fetch order data from mock API
async function fetchOrderData() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching order data:", error);
    return null;
  }
}

// generate and send email
async function generateAndSendEmail() {
  const jsonData = await fetchOrderData();
  if (!jsonData) return;

  // nunjucks config
  nunjucks.configure("src", { autoescape: true });

  // Read MJML template
  const mjmlTemplate = fs.readFileSync("./src/index.mjml", "utf8");

  // render MJML with API data
  const renderedMJML = nunjucks.renderString(mjmlTemplate, {
    order: jsonData.for[0].extVars,
  });

  // convert MJML to HTML
  const { html } = mjml(renderedMJML);

  // email credentials setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: jsonData.for[0].contact.email,
    subject: "Your Order Has Shipped!",
    html: html,
  };

  // send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
}

generateAndSendEmail();
