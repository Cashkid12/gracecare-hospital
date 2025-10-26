const express = require('express');
const { body } = require('express-validator');
const { protect, authorize } = require('../middleware/auth');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body('specialization').optional().notEmpty().withMessage('Specialization is required'),
  body('department').optional().notEmpty().withMessage('Department is required'),
  body('licenseNumber').optional().notEmpty().withMessage('License number is required'),
  body('experience').optional().isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  body('consultationFee').optional().isFloat({ min: 0 }).withMessage('Consultation fee must be a positive number'),
];

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate('user', 'firstName lastName email phone profilePicture')
      .select('-availability -education -languages -awards'); // Exclude sensitive data for public listing

    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'firstName lastName email phone profilePicture dateOfBirth gender');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get doctors by department
// @route   GET /api/doctors/department/:department
// @access  Public
router.get('/department/:department', async (req, res) => {
  try {
    const doctors = await Doctor.find({ 
      department: new RegExp(req.params.department, 'i') 
    })
    .populate('user', 'firstName lastName email phone profilePicture')
    .select('-availability -education');

    res.json(doctors);
  } catch (error) {
    console.error('Get doctors by department error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get doctor profile (for the doctor themselves)
// @route   GET /api/doctors/profile
// @access  Private/Doctor
router.get('/profile', protect, authorize('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id })
      .populate('user', 'firstName lastName email phone dateOfBirth gender address profilePicture');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    res.json(doctor);
  } catch (error) {
    console.error('Get doctor profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private/Doctor
router.put('/profile', protect, authorize('doctor'), updateProfileValidation, async (req, res) => {
  try {
    const {
      specialization,
      department,
      licenseNumber,
      education,
      experience,
      bio,
      consultationFee,
      availability,
      languages,
      awards,
    } = req.body;

    const doctor = await Doctor.findOne({ user: req.user._id });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    // Update fields
    if (specialization) doctor.specialization = specialization;
    if (department) doctor.department = department;
    if (licenseNumber) doctor.licenseNumber = licenseNumber;
    if (education) doctor.education = education;
    if (experience !== undefined) doctor.experience = experience;
    if (bio) doctor.bio = bio;
    if (consultationFee !== undefined) doctor.consultationFee = consultationFee;
    if (availability) doctor.availability = availability;
    if (languages) doctor.languages = languages;
    if (awards) doctor.awards = awards;

    await doctor.save();

    const updatedDoctor = await Doctor.findById(doctor._id)
      .populate('user', 'firstName lastName email phone profilePicture');

    res.json({
      message: 'Profile updated successfully',
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error('Update doctor profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get doctor's appointments
// @route   GET /api/doctors/appointments
// @access  Private/Doctor
router.get('/appointments/my-appointments', protect, authorize('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    const Appointment = require('../models/Appointment');
    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate('patient', 'user')
      .populate('patient.user', 'firstName lastName email phone')
      .sort({ appointmentDate: -1, appointmentTime: -1 });

    res.json(appointments);
  } catch (error) {
    console.error('Get doctor appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update doctor availability
// @route   PUT /api/doctors/availability
// @access  Private/Doctor
router.put('/availability', protect, authorize('doctor'), async (req, res) => {
  try {
    const { availability } = req.body;

    const doctor = await Doctor.findOne({ user: req.user._id });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    if (availability) {
      doctor.availability = availability;
    }

    await doctor.save();

    res.json({
      message: 'Availability updated successfully',
      availability: doctor.availability,
    });
  } catch (error) {
    console.error('Update doctor availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;