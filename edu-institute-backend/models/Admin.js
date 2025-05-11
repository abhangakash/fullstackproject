const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Application = require('../models/Application');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();
const SECRET = 'your_jwt_secret';

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected: Get applications
router.get('/applications', adminAuth, async (req, res) => {
  const applications = await Application.find().sort({ createdAt: -1 });
  res.json(applications);
});

// Update application status (approve or reject)
router.put('/applications/:id', adminAuth, async (req, res) => {
  const { status } = req.body;
  const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(application);
});

// Protected: Add course
router.post('/courses', adminAuth, async (req, res) => {
  const { name, description, duration, price } = req.body;
  const course = new Course({ name, description, duration, price });
  await course.save();
  res.json(course);
});

// Protected: Edit course
router.put('/courses/:id', adminAuth, async (req, res) => {
  const { name, description, duration, price } = req.body;
  const course = await Course.findByIdAndUpdate(req.params.id, { name, description, duration, price }, { new: true });
  res.json(course);
});

// Protected: Delete course
router.delete('/courses/:id', adminAuth, async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  res.json({ message: 'Course deleted successfully', course });
});

// Protected: Get all courses
router.get('/courses', adminAuth, async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

module.exports = router;
