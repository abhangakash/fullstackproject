const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load env variables from .env

const app = express();

// Allow specific frontend domains (e.g., Vercel/Render and localhost)
const allowedOrigins = [
  'http://localhost:3000', // Dev frontend
  'https://edu-frontend-wraz.onrender.com', // Replace with your Render or Vercel frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json()); // Parse JSON body

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hello, Educational Institute!');
});

// Import & use routes
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/register', require('./routes/register'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/admissions', require('./routes/admission'));
app.use('/api/events', require('./routes/events'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/awards', require('./routes/awards'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api', require('./routes/upload'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
