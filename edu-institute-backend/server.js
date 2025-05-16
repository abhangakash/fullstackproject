const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const uploadRoutes = require('./routes/upload');
const departmentRoutes = require('./routes/departments');
// const chatRoutes = require('./routes/chat');




dotenv.config(); // Load env variables from .env

const app = express();

// ✅ Allow specific frontend origins

const allowedOrigins = [,
  ,
  'http://localhost:3000']; // Add Vercel/Render if needed

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ Body parser middleware - required to read req.body
app.use(express.json());

// ✅ Routes
app.use('/api/upload', uploadRoutes);
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
// app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin', require('./routes/adminAuth'));
app.use('/api/departments', departmentRoutes);
// app.use('/api/chat', chatRoutes);





// ✅ Test Route
app.get('/', (req, res) => {
  res.send('Hello, Educational Institute!');
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch((error) => console.error('❌ MongoDB connection error:', error));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
