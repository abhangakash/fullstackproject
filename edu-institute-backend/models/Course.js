const mongoose = require('mongoose');

// Define the schema for the course model
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  department: { type: String, required: true },
  imageUrl: { type: String, default: 'https://via.placeholder.com/300x200' }, // Optional image URL
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Create the Course model from the schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
