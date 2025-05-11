// models/Faculty.js
const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model('Faculty', FacultySchema);
