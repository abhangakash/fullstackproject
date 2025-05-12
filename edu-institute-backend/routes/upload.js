// edu-institute-backend/routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadmiddleware'); // this uses CloudinaryStorage
const Gallery = require('../models/gallery'); // your Mongoose schema

// POST /api/upload/image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const newImage = new Gallery({
      imageUrl: req.file.path,        // Cloudinary URL automatically set by multer-storage-cloudinary
      caption: req.body.caption || '', 
      type: 'image',                  // could be 'video' too, if you're uploading videos later
    });

    await newImage.save();

    res.status(200).json({
      message: 'Image added to gallery',
      data: newImage,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

module.exports = router;
