const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const upload = require('../utils/uploadmiddleware'); // Multer middleware to handle file uploads
const Course = require('../models/Course'); // Import the updated Course model

// Configure Cloudinary for image uploads
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST route to add a new course (with image upload)
router.post('/', upload.single('image'), async (req, res) => {
  const { title, branch, description, fullDetails } = req.body;
  let imageUrl = '';

  if (req.file) {
    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'course_images', // Folder for storing course images in Cloudinary
      });
      imageUrl = result.secure_url; // Get the secure URL of the uploaded image
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
    }
  }

  try {
    // Create a new course with the provided fields and uploaded image URL
    const course = new Course({
      title,
      branch,
      description,
      fullDetails,
      imageUrl, // Save the Cloudinary image URL
    });

    await course.save(); // Save the course to MongoDB
    res.status(201).json(course); // Return the newly created course
  } catch (error) {
    res.status(500).json({ message: 'Error adding course', error });
  }
});

// GET route to fetch all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses from MongoDB
    res.status(200).json(courses); // Return the courses as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
});

module.exports = router;
