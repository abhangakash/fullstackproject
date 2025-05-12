// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  branch: String,
  description: String,
  imageUrl: String,
  fullDetails: String
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
