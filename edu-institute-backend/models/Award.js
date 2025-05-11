const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false }, // Optional image URL
});

module.exports = mongoose.model('Award', awardSchema);
