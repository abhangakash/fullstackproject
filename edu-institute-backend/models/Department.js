const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  short: { type: String, required: true },
  description: { type: String, default: '' }
});

module.exports = mongoose.model('Department', DepartmentSchema);
