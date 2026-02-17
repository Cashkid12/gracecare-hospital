const Prescription = require('../models/Prescription');
const MedicalRecord = require('../models/MedicalRecord');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { validationResult } = require('express-validator');

// @desc    Get all prescriptions
// @route   GET /api/prescriptions
// @access  Private
const getPrescriptions = async (req, res) => {
  try {
    const { patientId, doctorId, status } = req.query;
    let query = {};

    if (patientId) query.patient = patientId;
    if (doctorId) query.doctor = doctorId;
    if (status) query.status = status;

    // For doctors, only show their own prescriptions
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (doctor) {
        query.doctor = doctor._id;
      }
    }

    // For patients, only show their own prescriptions
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (patient) {
        query.patient = patient._id;
      }
    }

    const prescriptions = await Prescription.find(query)
      .populate('patient', 'user')
      .populate('doctor', 'user specialization')
      .populate('medicalRecord')
      .populate('createdBy', 'firstName lastName role')
      .sort({ issuedDate: -1 });

    res.json({
      success: true,
      count: prescriptions.length,
      data: prescriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single prescription
// @route   GET /api/prescriptions/:id
// @access  Private
const getPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patient', 'user')
      .populate('doctor', 'user specialization')
      .populate('medicalRecord')
      .populate('createdBy', 'firstName lastName role');

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (!patient || patient._id.toString() !== prescription.patient.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this prescription'
        });
      }
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor || doctor._id.toString() !== prescription.doctor.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this prescription'
        });
      }
    }

    res.json({
      success: true,
      data: prescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new prescription
// @route   POST /api/prescriptions
// @access  Private (Doctor, Admin)
const createPrescription = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { patient, doctor, medicalRecord, medications, diagnosis, validUntil, notes, pharmacy } = req.body;

    // Verify doctor exists and belongs to user
    if (req.user.role === 'doctor') {
      const doctorDoc = await Doctor.findOne({ user: req.user._id });
      if (!doctorDoc || doctorDoc._id.toString() !== doctor) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to create prescription for this doctor'
        });
      }
    }

    const prescription = await Prescription.create({
      patient,
      doctor,
      medicalRecord,
      medications,
      diagnosis,
      validUntil,
      notes,
      pharmacy,
      createdBy: req.user._id
    });

    const populatedPrescription = await Prescription.findById(prescription._id)
      .populate('patient', 'user')
      .populate('doctor', 'user specialization')
      .populate('medicalRecord')
      .populate('createdBy', 'firstName lastName role');

    res.status(201).json({
      success: true,
      message: 'Prescription created successfully',
      data: populatedPrescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update prescription
// @route   PUT /api/prescriptions/:id
// @access  Private (Doctor, Admin)
const updatePrescription = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    let prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor || doctor._id.toString() !== prescription.doctor.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this prescription'
        });
      }
    }

    // Prevent updating if already dispensed or completed
    if (prescription.status === 'Dispensed' || prescription.status === 'Completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update prescription that has been dispensed or completed'
      });
    }

    const { medications, diagnosis, validUntil, notes, pharmacy, status } = req.body;

    prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      {
        medications,
        diagnosis,
        validUntil,
        notes,
        pharmacy,
        status
      },
      { new: true, runValidators: true }
    ).populate('patient', 'user')
      .populate('doctor', 'user specialization')
      .populate('medicalRecord')
      .populate('createdBy', 'firstName lastName role');

    res.json({
      success: true,
      message: 'Prescription updated successfully',
      data: prescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete prescription
// @route   DELETE /api/prescriptions/:id
// @access  Private (Admin)
const deletePrescription = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete prescriptions'
      });
    }

    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found'
      });
    }

    // Prevent deleting if already dispensed or completed
    if (prescription.status === 'Dispensed' || prescription.status === 'Completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete prescription that has been dispensed or completed'
      });
    }

    await prescription.remove();

    res.json({
      success: true,
      message: 'Prescription deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get prescriptions by patient
// @route   GET /api/prescriptions/patient/:patientId
// @access  Private
const getPrescriptionsByPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'patient') {
      const currentPatient = await Patient.findOne({ user: req.user._id });
      if (!currentPatient || currentPatient._id.toString() !== patient._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this patient\'s prescriptions'
        });
      }
    } else if (req.user.role === 'doctor') {
      // Doctors can only see prescriptions for their assigned patients
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor || patient.assignedDoctor?.toString() !== doctor._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this patient\'s prescriptions'
        });
      }
    }

    const prescriptions = await Prescription.find({ patient: req.params.patientId })
      .populate('doctor', 'user specialization')
      .populate('medicalRecord')
      .sort({ issuedDate: -1 });

    res.json({
      success: true,
      count: prescriptions.length,
      data: prescriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get prescriptions by doctor
// @route   GET /api/prescriptions/doctor/:doctorId
// @access  Private (Doctor, Admin)
const getPrescriptionsByDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'doctor') {
      const currentDoctor = await Doctor.findOne({ user: req.user._id });
      if (!currentDoctor || currentDoctor._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this doctor\'s prescriptions'
        });
      }
    }

    const prescriptions = await Prescription.find({ doctor: req.params.doctorId })
      .populate('patient', 'user')
      .populate('medicalRecord')
      .sort({ issuedDate: -1 });

    res.json({
      success: true,
      count: prescriptions.length,
      data: prescriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getPrescriptions,
  getPrescription,
  createPrescription,
  updatePrescription,
  deletePrescription,
  getPrescriptionsByPatient,
  getPrescriptionsByDoctor
};