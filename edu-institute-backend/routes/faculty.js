// routes/faculty.js
const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty'); // Ensure this is the correct model import

// Route to fetch all faculty
router.get('/', async (req, res) => {
  try {
    const facultyList = await Faculty.find(); // Fetch all faculty from MongoDB
    res.status(200).json(facultyList); // Send back as JSON
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching faculty data' });
  }
});

// Route to add new faculty
router.post('/add', async (req, res) => {
  const { name, photo, department, designation, contactInfo, email } = req.body;
  const newFaculty = new Faculty({
    name,
    photo,
    department,
    designation,
    contactInfo,
    email,
  });

  try {
    const savedFaculty = await newFaculty.save(); // Save the faculty to MongoDB
    res.status(201).json(savedFaculty); // Return the saved faculty data
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Error saving faculty data' });
  }
});

module.exports = router; // Export the router
