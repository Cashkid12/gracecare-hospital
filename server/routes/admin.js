const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboardStats,
  getAllUsers,
  getAllDoctors,
  getAllPatients,
  getAllAppointments,
  updateUserStatus,
  deleteUser
} = require('../controllers/adminController');

const router = express.Router();

// Protect all admin routes
router.use(protect);
router.use(authorize('admin'));

// Dashboard stats
router.get('/dashboard/stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.get('/doctors', getAllDoctors);
router.get('/patients', getAllPatients);

// Appointment management
router.get('/appointments', getAllAppointments);

// User management actions
router.put('/users/:id/status', updateUserStatus);
router.delete('/users/:id', deleteUser);

module.exports = router;