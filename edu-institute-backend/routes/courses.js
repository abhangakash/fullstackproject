const express = require('express');
const router = express.Router();
const upload = require('../utils/s3config'); // multerS3 config
const Course = require('../models/Course');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// POST - Add new course with image upload
router.post('/', upload.single('image'), async (req, res) => {
  const { title, branch, description, fullDetails } = req.body;
  let imageUrl = '';
  let imageKey = '';

  if (req.file) {
    imageUrl = req.file.location;
    imageKey = req.file.key;
  }

  try {
    const course = new Course({
      title,
      branch,
      description,
      fullDetails,
      imageUrl,
      imageKey,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error adding course', error });
  }
});

// GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
});

// PUT - Update course with optional new image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  const { title, branch, description, fullDetails } = req.body;

  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (req.file) {
      // Delete old image from S3 if exists
      if (course.imageKey) {
        await s3.deleteObject({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: course.imageKey,
        }).promise();
      }

      course.imageUrl = req.file.location;
      course.imageKey = req.file.key;
    }

    course.title = title;
    course.branch = branch;
    course.description = description;
    course.fullDetails = fullDetails;

    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
});

// DELETE - Remove course and image from S3
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.imageKey) {
      await s3.deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: course.imageKey,
      }).promise();
    }

    await course.deleteOne();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
