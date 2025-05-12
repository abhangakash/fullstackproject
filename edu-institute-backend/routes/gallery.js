const express = require('express');
const router = express.Router();
const Gallery = require('../models/gallery');
const upload = require('../utils/storage'); // Assuming your multer storage setup is here

// POST a new gallery image with file upload
router.post('/', upload.single('image'), async (req, res) => {
  // Ensure a file is uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Create a new gallery entry
    const newImage = new Gallery({
      caption: req.body.caption || 'Untitled', // Use provided caption or default to 'Untitled'
      imageUrl: req.file.path, // Assuming the file path from multer or Cloudinary URL
      type: req.body.type || 'image', // Use provided type or default to 'image'
    });

    // Save the new gallery entry to MongoDB
    await newImage.save();

    res.status(201).json({
      message: 'Image added to gallery',
      image: newImage, // Return the newly added image
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add image' });
  }
});

module.exports = router;
