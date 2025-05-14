// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

mongoose.connect('mongodb://127.0.0.1:27017/edu-institute'); // Replace with your DB name

async function createAdmin() {
  const email = 'admin@eduinstitute.com';
  const plainPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const admin = new Admin({ email, password: hashedPassword });
  await admin.save();

  console.log('✅ Admin created successfully');
  mongoose.disconnect();
}

createAdmin();
