const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Mongoose model

router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, branch, year } = req.body;
    
    // Check if the student already exists (optional)
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    const newStudent = new Student({ fullName, email, phone, branch, year });
    await newStudent.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
