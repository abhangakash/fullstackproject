const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  branch: String,
  year: String,
});

// Check if the model exists and use it; otherwise, create it
module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
