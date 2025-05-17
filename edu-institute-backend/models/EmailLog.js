const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  status: { type: String, enum: ["Success", "Failed"], required: true },
  response: String, // Email service response
  error: String, // Stores error details if failed
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmailLog", emailLogSchema);