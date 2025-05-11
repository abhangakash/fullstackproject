const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice'); // Notice model

// GET route to fetch all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load notices' });
  }
});

// POST route to create a new notice
router.post('/', async (req, res) => {
  const { title, date, description, link } = req.body;

  try {
    const newNotice = new Notice({ title, date, description, link });
    await newNotice.save();
    res.status(201).json({ message: 'Notice created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create notice' });
  }
});

module.exports = router;
