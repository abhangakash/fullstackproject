const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },      // S3 URL
  photoKey: { type: String },                    // S3 object key for deletion
  department: { type: String, required: true },
  designation: { type: String, required: true },
  contactInfo: { type: String },
  email: { type: String },
});

module.exports = mongoose.model('Faculty', FacultySchema);
