// middleware/adminAuth.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'fallbackSecret';

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = adminAuth;
