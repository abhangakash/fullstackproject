const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth'); // Path may vary
const Contact = require('../models/contact'); // Replace with your actual model

router.get('/contact', adminAuth, async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
