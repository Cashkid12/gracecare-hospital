const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { sendAppointmentConfirmation } = require('./emailController');
const { validationResult } = require('express-validator');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    let appointments;
    
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (!patient) {
        return res.status(404).json({ message: 'Patient profile not found' });
      }
      appointments = await Appointment.find({ patient: patient._id })
        .populate('doctor', 'user specialization department')
        .populate('patient', 'user')
        .populate('doctor.user', 'firstName lastName email phone')
        .populate('patient.user', 'firstName lastName email')
        .sort({ appointmentDate: -1, appointmentTime: -1 });
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor profile not found' });
      }
      appointments = await Appointment.find({ doctor: doctor._id })
        .populate('patient', 'user')
        .populate('doctor', 'user specialization department')
        .populate('patient.user', 'firstName lastName email phone')
        .populate('doctor.user', 'firstName lastName')
        .sort({ appointmentDate: -1, appointmentTime: -1 });
    } else {
      // Admin can see all appointments
      appointments = await Appointment.find()
        .populate('patient', 'user')
        .populate('doctor', 'user specialization department')
        .populate('patient.user', 'firstName lastName email phone')
        .populate('doctor.user', 'firstName lastName email')
        .sort({ appointmentDate: -1, appointmentTime: -1 });
    }

    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { doctorId, department, appointmentDate, appointmentTime, reason, symptoms } = req.body;

    // Find patient
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    // Find doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if appointment time is available
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
      status: { $in: ['scheduled', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'This time slot is already booked. Please choose another time.' });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patient: patient._id,
      doctor: doctorId,
      department,
      appointmentDate,
      appointmentTime,
      reason,
      symptoms: symptoms || [],
      status: 'scheduled'
    });

    // Populate the appointment for response
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctor', 'user specialization department')
      .populate('patient', 'user')
      .populate('doctor.user', 'firstName lastName')
      .populate('patient.user', 'firstName lastName email');

    // Send confirmation email (don't await to avoid blocking response)
    sendAppointmentConfirmation(appointment._id).catch(error => {
      console.error('Failed to send confirmation email:', error);
    });

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: populatedAppointment,
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error during appointment booking' });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'user specialization department')
      .populate('patient', 'user')
      .populate('doctor.user', 'firstName lastName email phone')
      .populate('patient.user', 'firstName lastName email phone');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has permission to view this appointment
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (appointment.patient._id.toString() !== patient._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to view this appointment' });
      }
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (appointment.doctor._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to view this appointment' });
      }
    }

    res.json(appointment);
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    const { status, notes, prescription } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has permission to update this appointment
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (appointment.doctor.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this appointment' });
      }
    } else if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (appointment.patient.toString() !== patient._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this appointment' });
      }
      // Patients can only cancel appointments
      if (status && status !== 'cancelled') {
        return res.status(403).json({ message: 'Patients can only cancel appointments' });
      }
    }

    // Update fields
    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;
    if (prescription) appointment.prescription = prescription;

    await appointment.save();

    const updatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctor', 'user specialization department')
      .populate('patient', 'user')
      .populate('doctor.user', 'firstName lastName')
      .populate('patient.user', 'firstName lastName email');

    res.json({
      message: 'Appointment updated successfully',
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has permission to delete this appointment
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (appointment.patient.toString() !== patient._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this appointment' });
      }
    }

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};