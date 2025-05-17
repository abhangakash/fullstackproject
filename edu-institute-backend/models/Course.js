const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  branch: String,
  description: String,
  imageUrl: String,     // full public URL from S3
  imageKey: String,     // key of the image in S3, e.g., "1623452345-filename.jpg"
  fullDetails: String,
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
