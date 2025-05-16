const nodemailer = require('nodemailer');

// For Gmail - enable "less secure apps" or use app password (recommended)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your app password
  },
});

module.exports = transporter;
