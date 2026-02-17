const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getPrescriptions,
  getPrescription,
  createPrescription,
  updatePrescription,
  deletePrescription,
  getPrescriptionsByPatient,
  getPrescriptionsByDoctor
} = require('../controllers/prescriptionController');

// All routes protected
router.use(protect);

// Get all prescriptions
router.get('/', getPrescriptions);

// Get prescriptions by patient
router.get('/patient/:patientId', getPrescriptionsByPatient);

// Get prescriptions by doctor
router.get('/doctor/:doctorId', getPrescriptionsByDoctor);

// Get single prescription
router.get('/:id', getPrescription);

// Create new prescription (Doctor, Admin)
router.post('/', authorize('doctor', 'admin'), createPrescription);

// Update prescription (Doctor, Admin)
router.put('/:id', authorize('doctor', 'admin'), updatePrescription);

// Delete prescription (Admin)
router.delete('/:id', authorize('admin'), deletePrescription);

module.exports = router;