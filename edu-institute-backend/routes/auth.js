const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Dummy admin credentials (for testing)
const ADMIN_USER = {
  username: 'a',
  password: '1234'
};

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
