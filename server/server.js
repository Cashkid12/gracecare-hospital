const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load env vars - but don't fail if .env is missing (for production)
try {
  dotenv.config();
} catch (error) {
  console.log('.env file not found - using environment variables');
}

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/admin', require('./routes/admin'));

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to GraceCare Hospital API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// API status route
app.get('/api', (req, res) => {
  res.json({
    message: 'GraceCare Hospital API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      appointments: '/api/appointments',
      doctors: '/api/doctors',
      patients: '/api/patients',
      departments: '/api/departments',
      admin: '/api/admin'
    },
    timestamp: new Date().toISOString(),
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  
  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: errors
    });
  }
  
  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
      field: field
    });
  }
  
  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// ✅ FIXED PORT BINDING FOR RENDER
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`🏥 GraceCare Hospital API is ready!`);
  console.log(`📍 Base URL: http://0.0.0.0:${PORT}`);
  console.log(`❤️  Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`📚 API Info: http://0.0.0.0:${PORT}/api`);
});
