const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');

const router = express.Router();

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
router.get('/', protect, getAppointments);

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
router.post('/', protect, createAppointment);

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
router.get('/:id', protect, getAppointment);

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
router.put('/:id', protect, updateAppointment);

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
router.delete('/:id', protect, deleteAppointment);

module.exports = router;

module.exports = router;