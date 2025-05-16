const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Connect to MongoDB with detailed logging
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // 5 second timeout
})
.then(() => {
  console.log('Connected to MongoDB successfully');
  console.log('Connection URI:', process.env.MONGODB_URI);
  // Log database connection state
  const dbState = mongoose.connection.readyState;
  console.log('Database state:', 
    dbState === 0 ? 'disconnected' :
    dbState === 1 ? 'connected' :
    dbState === 2 ? 'connecting' :
    dbState === 3 ? 'disconnecting' : 'unknown');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.error('Error name:', err.name);
  console.error('Error code:', err.code);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
