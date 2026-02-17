const MedicalRecord = require('../models/MedicalRecord');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Get all medical records
// @route   GET /api/medical-records
// @access  Private (Doctor, Admin)
const getMedicalRecords = async (req, res) => {
  try {
    const { patientId, doctorId, status } = req.query;
    let query = {};

    if (patientId) query.patient = patientId;
    if (doctorId) query.doctor = doctorId;
    if (status) query.status = status;

    // For doctors, only show their own patients' records
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (doctor) {
        query.doctor = doctor._id;
      }
    }

    const medicalRecords = await MedicalRecord.find(query)
      .populate('patient', 'user')
      .populate('doctor', 'user specialization')
      .populate('createdBy', 'firstName lastName role')
      .sort({ visitDate: -1 });

    res.json({
      success: true,
      count: medicalRecords.length,
      data: medicalRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single medical record
// @route   GET /api/medical-records/:id
// @access  Private
const getMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id)
      .populate('patient', 'user')
      .populate('doctor', 'user specialization')
      .populate('createdBy', 'firstName lastName role');

    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (!patient || patient._id.toString() !== medicalRecord.patient.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this record'
        });
      }
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor || doctor._id.toString() !== medicalRecord.doctor.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this record'
        });
      }
    }

    res.json({
      success: true,
      data: medicalRecord
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new medical record
// @route   POST /api/medical-records
// @access  Private (Doctor, Admin)
const createMedicalRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { patient, doctor, visitDate, diagnosis, symptoms, treatment, medications, vitalSigns, notes, followUpDate } = req.body;

    // Verify doctor exists and belongs to user
    if (req.user.role === 'doctor') {
      const doctorDoc = await Doctor.findOne({ user: req.user._id });
      if (!doctorDoc || doctorDoc._id.toString() !== doctor) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to create record for this doctor'
        });
      }
    }

    const medicalRecord = await MedicalRecord.create({
      patient,
      doctor,
      visitDate,
      diagnosis,
      symptoms,
      treatment,
      medications,
      vitalSigns,
      notes,
      followUpDate,
      createdBy: req.user._id
    });

    const populatedRecord = await MedicalRecord.findById(medicalRecord._id)
      .populate('patient', 'user')
      .populate('doctor', 'user specialization')
      .populate('createdBy', 'firstName lastName role');

    res.status(201).json({
      success: true,
      message: 'Medical record created successfully',
      data: populatedRecord
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update medical record
// @route   PUT /api/medical-records/:id
// @access  Private (Doctor, Admin)
const updateMedicalRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    let medicalRecord = await MedicalRecord.findById(req.params.id);
    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor || doctor._id.toString() !== medicalRecord.doctor.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this record'
        });
      }
    }

    const { diagnosis, symptoms, treatment, medications, vitalSigns, notes, followUpDate, status } = req.body;

    medicalRecord = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      {
        diagnosis,
        symptoms,
        treatment,
        medications,
        vitalSigns,
        notes,
        followUpDate,
        status
      },
      { new: true, runValidators: true }
    ).populate('patient', 'user')
      .populate('doctor', 'user specialization')
      .populate('createdBy', 'firstName lastName role');

    res.json({
      success: true,
      message: 'Medical record updated successfully',
      data: medicalRecord
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete medical record
// @route   DELETE /api/medical-records/:id
// @access  Private (Admin)
const deleteMedicalRecord = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete medical records'
      });
    }

    const medicalRecord = await MedicalRecord.findById(req.params.id);
    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    await medicalRecord.remove();

    res.json({
      success: true,
      message: 'Medical record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add attachment to medical record
// @route   POST /api/medical-records/:id/attachments
// @access  Private (Doctor, Admin)
const addAttachment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const medicalRecord = await MedicalRecord.findById(req.params.id);
    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor || doctor._id.toString() !== medicalRecord.doctor.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to add attachment to this record'
        });
      }
    }

    medicalRecord.attachments.push({
      filename: req.file.originalname,
      path: req.file.path
    });

    await medicalRecord.save();

    res.json({
      success: true,
      message: 'Attachment added successfully',
      data: medicalRecord
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
  getMedicalRecords,
  getMedicalRecord,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  addAttachment
};