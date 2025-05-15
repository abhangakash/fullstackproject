const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// POST: Save new message
router.post('/', async (req, res) => {
  try {
    const newMsg = new Contact(req.body);
    await newMsg.save();
    res.status(200).json({ message: 'Message saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// GET: Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// DELETE: Delete message by ID
router.delete('/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    await Contact.findByIdAndDelete(messageId);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
