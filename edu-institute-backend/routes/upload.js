const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');

router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({
      url: req.file.path,
      public_id: req.file.filename
    });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
