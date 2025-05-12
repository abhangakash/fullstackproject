const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');
const upload = require('../utils/uploadmiddleware'); // multer + cloudinary middleware

// Route to fetch all faculty
router.get('/', async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.status(200).json(facultyList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching faculty data' });
  }
});

// Route to add new faculty with image upload
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, department, designation, contactInfo, email } = req.body;
    const photo = req.file?.path; // Cloudinary URL

    const newFaculty = new Faculty({
      name,
      photo,
      department,
      designation,
      contactInfo,
      email,
    });

    const savedFaculty = await newFaculty.save();
    res.status(201).json(savedFaculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving faculty data' });
  }
});

module.exports = router;
