const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  message: String
});

module.exports = mongoose.model('Admission', admissionSchema);
