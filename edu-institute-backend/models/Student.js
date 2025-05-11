const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  branch: String,
  year: String,
});

module.exports = mongoose.model('Student', studentSchema);
