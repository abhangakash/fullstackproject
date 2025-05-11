const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // ✅ Use bcryptjs instead of bcrypt
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid email' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
