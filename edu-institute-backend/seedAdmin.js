const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect('mongodb://localhost:27017/edu-institute');

(async () => {
  const hashedPassword = await bcrypt.hash('1234', 10);
  const admin = new Admin({
    email: 'admin@edu.com',
    password: hashedPassword,
  });
  await admin.save();
  console.log('Admin user created');
  mongoose.disconnect();
})();
