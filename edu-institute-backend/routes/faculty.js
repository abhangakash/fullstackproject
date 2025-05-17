const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');
const upload = require('../utils/s3config'); // multer-s3 middleware (like your course code)
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// GET all faculty
router.get('/', async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.status(200).json(facultyList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching faculty data' });
  }
});

// POST - Add new faculty with image upload
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, department, designation, contactInfo, email } = req.body;
    let photoUrl = '';
    let photoKey = '';

    if (req.file) {
      photoUrl = req.file.location;
      photoKey = req.file.key;
    }

    const newFaculty = new Faculty({
      name,
      photo: photoUrl,
      photoKey,
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

// PUT - Update faculty with optional new image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const facultyId = req.params.id;
    const { name, department, designation, contactInfo, email } = req.body;

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) return res.status(404).json({ error: 'Faculty not found' });

    // If new image uploaded, delete old one from S3
    if (req.file) {
      if (faculty.photoKey) {
        await s3.deleteObject({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: faculty.photoKey,
        }).promise();
      }

      faculty.photo = req.file.location;
      faculty.photoKey = req.file.key;
    }

    faculty.name = name;
    faculty.department = department;
    faculty.designation = designation;
    faculty.contactInfo = contactInfo;
    faculty.email = email;

    await faculty.save();
    res.status(200).json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating faculty data' });
  }
});

// DELETE - Delete faculty and S3 image
router.delete('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    if (faculty.photoKey) {
      await s3.deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: faculty.photoKey,
      }).promise();
    }

    await faculty.deleteOne();
    res.status(200).json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
