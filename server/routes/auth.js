const express = require('express');
const { 
  registerUser, 
  loginUser, 
  createAdminUser, 
  checkAdminExists 
} = require('../controllers/authController');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user (Patient/Doctor/Admin)
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginUser);

// @route   POST /api/auth/create-admin
// @desc    Create first admin user (one-time setup)
// @access  Public
router.post('/create-admin', createAdminUser);

// @route   GET /api/auth/check-admin
// @desc    Check if admin user exists
// @access  Public
router.get('/check-admin', checkAdminExists);

module.exports = router;