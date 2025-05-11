const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// GET all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// POST a new gallery image
router.post('/', async (req, res) => {
  try {
    const newImage = new Gallery(req.body);
    await newImage.save();
    res.status(201).json({ message: 'Image added to gallery' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add image' });
  }
});

module.exports = router;
