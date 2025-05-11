// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // To load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON data

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hello, Educational Institute!');
});

// Import routes
const facultyRoutes = require('./routes/faculty');
app.use('/api/faculty', facultyRoutes); // Use the faculty routes

const registerRoute = require('./routes/register');
app.use('/api/register', registerRoute);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

const courseRoutes = require('./routes/courses');
app.use('/api/courses', courseRoutes);

const galleryRoutes = require('./routes/gallery');
app.use('/api/gallery', galleryRoutes);

const admissionRoutes = require('./routes/admission');
app.use('/api/admissions', admissionRoutes);

const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

const noticeRoutes = require('./routes/notices');
app.use('/api/notices', noticeRoutes);

const awardRoutes = require('./routes/awards');
app.use('/api/awards', awardRoutes);

app.use('/api/admin', require('./routes/admin'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
