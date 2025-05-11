const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});
//add
module.exports = mongoose.model('Contact', contactSchema);
