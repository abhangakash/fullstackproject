const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Event model

// GET route to fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load events' });
  }
});

// POST route to create a new event
router.post('/', async (req, res) => {
  const { title, date, description, link } = req.body;

  try {
    const newEvent = new Event({ title, date, description, link });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event' });
  }
});

module.exports = router;
