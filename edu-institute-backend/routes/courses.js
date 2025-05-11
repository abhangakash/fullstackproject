const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Add a new course
router.post('/', async (req, res) => {
  const { title, description, duration, level, department, imageUrl } = req.body;
  
  try {
    const course = new Course({
      title,
      description,
      duration,
      level,
      department,
      imageUrl
    });

    await course.save();
    res.status(201).json(course); // Return the newly created course
  } catch (error) {
    res.status(500).json({ message: 'Error adding course' });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

module.exports = router;
