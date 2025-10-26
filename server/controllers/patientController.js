const Patient = require('../models/Patient');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// @desc    Get patient profile
// @route   GET /api/patients/profile
// @access  Private/Patient
const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id })
      .populate('user', 'firstName lastName email phone address dateOfBirth');

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    console.error('Get patient profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching patient profile'
    });
  }
};

// @desc    Update patient profile
// @route   PUT /api/patients/profile
// @access  Private/Patient
const updatePatientProfile = async (req, res) => {
  try {
    const { bloodType, allergies, emergencyContact, insuranceProvider, insuranceNumber } = req.body;

    let patient = await Patient.findOne({ user: req.user.id });

    if (!patient) {
      // Create patient profile if it doesn't exist
      patient = new Patient({
        user: req.user.id,
        bloodType,
        allergies,
        emergencyContact,
        insuranceProvider,
        insuranceNumber
      });
    } else {
      // Update existing profile
      patient.bloodType = bloodType || patient.bloodType;
      patient.allergies = allergies || patient.allergies;
      patient.emergencyContact = emergencyContact || patient.emergencyContact;
      patient.insuranceProvider = insuranceProvider || patient.insuranceProvider;
      patient.insuranceNumber = insuranceNumber || patient.insuranceNumber;
    }

    await patient.save();

    // Populate user data
    await patient.populate('user', 'firstName lastName email phone address dateOfBirth');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: patient
    });
  } catch (error) {
    console.error('Update patient profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating patient profile'
    });
  }
};

// @desc    Get patient appointments
// @route   GET /api/patients/appointments
// @access  Private/Patient
const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate('doctor')
      .populate('doctor.user', 'firstName lastName')
      .sort({ appointmentDate: -1, appointmentTime: -1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Get patient appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments'
    });
  }
};

// @desc    Get patient medical history
// @route   GET /api/patients/medical-history
// @access  Private/Patient
const getMedicalHistory = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id })
      .select('medicalHistory currentMedications');

    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    console.error('Get medical history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching medical history'
    });
  }
};

module.exports = {
  getPatientProfile,
  updatePatientProfile,
  getPatientAppointments,
  getMedicalHistory
};