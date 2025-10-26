const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Appointment = require('../models/Appointment');

const router = express.Router();

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let appointments;
    
    if (req.user.role === 'patient') {
      const Patient = require('../models/Patient');
      const patient = await Patient.findOne({ user: req.user._id });
      appointments = await Appointment.find({ patient: patient._id })
        .populate('doctor', 'user specialization')
        .populate('patient', 'user')
        .sort({ appointmentDate: -1 });
    } else if (req.user.role === 'doctor') {
      const Doctor = require('../models/Doctor');
      const doctor = await Doctor.findOne({ user: req.user._id });
      appointments = await Appointment.find({ doctor: doctor._id })
        .populate('patient', 'user')
        .populate('doctor', 'user specialization')
        .sort({ appointmentDate: -1 });
    } else {
      // Admin can see all appointments
      appointments = await Appointment.find()
        .populate('patient', 'user')
        .populate('doctor', 'user specialization')
        .sort({ appointmentDate: -1 });
    }

    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { doctorId, department, appointmentDate, appointmentTime, reason, symptoms } = req.body;

    // Find patient
    const Patient = require('../models/Patient');
    const patient = await Patient.findOne({ user: req.user._id });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    const appointment = await Appointment.create({
      patient: patient._id,
      doctor: doctorId,
      department,
      appointmentDate,
      appointmentTime,
      reason,
      symptoms: symptoms || [],
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctor', 'user specialization')
      .populate('patient', 'user');

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: populatedAppointment,
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { status, notes, prescription } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has permission to update this appointment
    if (req.user.role === 'doctor') {
      const Doctor = require('../models/Doctor');
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (appointment.doctor.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this appointment' });
      }
    }

    // Update fields
    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;
    if (prescription) appointment.prescription = prescription;

    await appointment.save();

    const updatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctor', 'user specialization')
      .populate('patient', 'user');

    res.json({
      message: 'Appointment updated successfully',
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;