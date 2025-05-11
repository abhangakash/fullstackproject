const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'pending' }, // 'pending', 'approved', 'rejected'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);
