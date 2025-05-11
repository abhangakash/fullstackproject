const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: String,
  caption: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gallery', gallerySchema);
