const express = require('express');
const router = express.Router();
const Award = require('../models/Award'); // Award model

// GET route to fetch all awards
router.get('/', async (req, res) => {
  try {
    const awards = await Award.find();
    res.json(awards);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load awards' });
  }
});

// POST route to create a new award
router.post('/', async (req, res) => {
  const { title, date, description, imageUrl } = req.body;

  try {
    const newAward = new Award({ title, date, description, imageUrl });
    await newAward.save();
    res.status(201).json({ message: 'Award created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create award' });
  }
});

module.exports = router;
