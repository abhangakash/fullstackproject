const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const upload = require('../utils/uploadmiddleware'); // Multer middleware
const Course = require('../models/Course');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST - Add new course with image upload
router.post('/', upload.single('image'), async (req, res) => {
  const { title, branch, description, fullDetails } = req.body;
  let imageUrl = '';
  let imagePublicId = '';

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'course_images',
      });
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;  // Save public_id here
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading image', error });
    }
  }

  try {
    const course = new Course({
      title,
      branch,
      description,
      fullDetails,
      imageUrl,
      imagePublicId,  // Save public_id in DB
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

// PUT - Update course by ID (with optional new image upload)
router.put('/:id', upload.single('image'), async (req, res) => {
  const { title, branch, description, fullDetails } = req.body;
  let imageUrl = '';
  let imagePublicId = '';

  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (course.imagePublicId) {
        await cloudinary.uploader.destroy(course.imagePublicId);
      }
      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'course_images',
      });
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    course.title = title;
    course.branch = branch;
    course.description = description;
    course.fullDetails = fullDetails;

    if (imageUrl) {
      course.imageUrl = imageUrl;
      course.imagePublicId = imagePublicId;
    }

    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // If you store Cloudinary public_id in the course document, delete image from Cloudinary
    if (course.cloudinaryId) {
      await cloudinary.uploader.destroy(course.cloudinaryId);
    }

    await course.deleteOne();

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
