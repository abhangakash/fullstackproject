const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const EmailLog = require('../models/EmailLog');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST /api/register - Register a new student
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, branch, year } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    const newStudent = new Student({ fullName, email, phone, branch, year });
    await newStudent.save();

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      cc: 'admin@yourinstitute.com',     // optional
      bcc: 'backup@yourinstitute.com',   // optional
      subject: '🎓 Registration Confirmation - [Your Institute Name]',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2E86C1;">Hello ${fullName},</h2>
            <p>Thank you for registering at <strong>[Your Institute Name]</strong>.</p>
            <table style="width: 100%; margin: 20px 0;">
              <tr><td><strong>Branch:</strong></td><td>${branch}</td></tr>
              <tr><td><strong>Year:</strong></td><td>${year}</td></tr>
              <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
            </table>
            <p>We’ll reach out with further updates soon!</p>
            <br/>
            <p style="margin-top: 40px;">Regards,<br/><strong>[Your Institute Team]</strong></p>
          </div>
        </div>
      `,
    };

    // Send email + log to DB
    transporter.sendMail(mailOptions, async (error, info) => {
      const log = new EmailLog({
        to: email,
        subject: mailOptions.subject,
        status: error ? 'Failed' : 'Sent',
        response: error ? '' : info.response,
        error: error ? error.toString() : '',
      });

      await log.save();

      if (error) {
        console.error('Email send error:', error);
        return res.status(201).json({
          message: 'Student registered, but email failed to send.',
        });
      } else {
        console.log('Email sent:', info.response);
        return res.status(201).json({
          message: 'Student registered and confirmation email sent!',
        });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
});

module.exports = router;
