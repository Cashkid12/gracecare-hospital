const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getPatientProfile,
  updatePatientProfile,
  getPatientAppointments,
  getMedicalHistory
} = require('../controllers/patientController');

const router = express.Router();

// Protect all routes
router.use(protect);

// @desc    Get patient profile
// @route   GET /api/patients/profile
// @access  Private/Patient
router.get('/profile', authorize('patient'), getPatientProfile);

// @desc    Update patient profile
// @route   PUT /api/patients/profile
// @access  Private/Patient
router.put('/profile', authorize('patient'), updatePatientProfile);

// @desc    Get patient appointments
// @route   GET /api/patients/appointments
// @access  Private/Patient
router.get('/appointments', authorize('patient'), getPatientAppointments);

// @desc    Get patient medical history
// @route   GET /api/patients/medical-history
// @access  Private/Patient
router.get('/medical-history', authorize('patient'), getMedicalHistory);

module.exports = router;