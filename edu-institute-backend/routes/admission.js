// In routes/admission.js
const express = require('express');
const router = express.Router();

// Assuming you have an Admission model for storing data
const Admission = require('../models/Admission');

// POST route to submit admission form
router.post('/', async (req, res) => {
  try {
    const newAdmission = new Admission(req.body);
    await newAdmission.save();
    res.status(200).send({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error submitting the application.' });
  }
});

module.exports = router;
