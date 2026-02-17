const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getMedicalRecords,
  getMedicalRecord,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  addAttachment
} = require('../controllers/medicalRecordController');
const { upload } = require('../middleware/upload');

// All routes protected
router.use(protect);

// Get all medical records (Doctor, Admin)
router.get('/', authorize('doctor', 'admin'), getMedicalRecords);

// Get single medical record
router.get('/:id', getMedicalRecord);

// Create new medical record (Doctor, Admin)
router.post('/', authorize('doctor', 'admin'), createMedicalRecord);

// Update medical record (Doctor, Admin)
router.put('/:id', authorize('doctor', 'admin'), updateMedicalRecord);

// Delete medical record (Admin)
router.delete('/:id', authorize('admin'), deleteMedicalRecord);

// Add attachment to medical record (Doctor, Admin)
router.post('/:id/attachments', authorize('doctor', 'admin'), upload.single('attachment'), addAttachment);

module.exports = router;