const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const sendEmail = require('../utils/mailer');

router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Failed to fetch registrations.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, branch, year } = req.body;
    console.log('Incoming request body:', req.body);

    if (!fullName || !email || !phone || !branch || !year) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const newStudent = new Student({ fullName, email, phone, branch, year });

    await newStudent.save();

    const emailSubject = 'Welcome to Your Institute!';
    const emailBody = `
      <h1>Hello ${fullName},</h1>
      <p>Thank you for registering at our Educational Institute.</p>
      <p>We’re excited to have you on board!</p>
    `;

    const emailResult = await sendEmail(email, emailSubject, emailBody);

    if (!emailResult.success) {
      console.warn('Email sending failed:', emailResult.error);
      return res.status(201).json({
        message: 'Student registered, but email failed to send.',
        emailError: emailResult.error,
      });
    }

    res.status(201).json({ message: 'Student registered successfully and email sent.' });
  } catch (error) {
    console.error('Registration error:', error.stack || error.message || error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

module.exports = router;
