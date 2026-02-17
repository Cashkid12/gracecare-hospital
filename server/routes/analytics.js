const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboardStats,
  getAppointmentStats,
  getRevenueStats,
  getPatientStats,
  getDoctorStats
} = require('../controllers/analyticsController');

// All routes protected and require admin access
router.use(protect);
router.use(authorize('admin'));

// Get dashboard statistics
router.get('/dashboard', getDashboardStats);

// Get appointment statistics
router.get('/appointments', getAppointmentStats);

// Get revenue statistics
router.get('/revenue', getRevenueStats);

// Get patient statistics
router.get('/patients', getPatientStats);

// Get doctor statistics
router.get('/doctors', getDoctorStats);

module.exports = router;