const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  type: {
    type: String,
    enum: ['image', 'video'], // distinguish media type
    default: 'image',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Gallery', gallerySchema);
