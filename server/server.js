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

// Rest of your server.js code remains the same...
