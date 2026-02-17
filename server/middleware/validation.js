const { body, query, param } = require('express-validator');

// Medical Record Validation
const medicalRecordValidation = {
  create: [
    body('patient').isMongoId().withMessage('Valid patient ID is required'),
    body('doctor').isMongoId().withMessage('Valid doctor ID is required'),
    body('visitDate').isISO8601().withMessage('Valid visit date is required'),
    body('diagnosis').notEmpty().withMessage('Diagnosis is required'),
    body('treatment').notEmpty().withMessage('Treatment is required')
  ],
  update: [
    body('diagnosis').optional().notEmpty().withMessage('Diagnosis cannot be empty'),
    body('treatment').optional().notEmpty().withMessage('Treatment cannot be empty'),
    body('status').optional().isIn(['Active', 'Completed', 'Archived']).withMessage('Invalid status')
  ]
};

// Prescription Validation
const prescriptionValidation = {
  create: [
    body('patient').isMongoId().withMessage('Valid patient ID is required'),
    body('doctor').isMongoId().withMessage('Valid doctor ID is required'),
    body('medicalRecord').optional().isMongoId().withMessage('Valid medical record ID is required'),
    body('medications').isArray({ min: 1 }).withMessage('At least one medication is required'),
    body('medications.*.name').notEmpty().withMessage('Medication name is required'),
    body('medications.*.dosage').notEmpty().withMessage('Medication dosage is required'),
    body('medications.*.frequency').notEmpty().withMessage('Medication frequency is required'),
    body('medications.*.duration').notEmpty().withMessage('Medication duration is required'),
    body('diagnosis').notEmpty().withMessage('Diagnosis is required'),
    body('validUntil').isISO8601().withMessage('Valid until date is required')
  ],
  update: [
    body('status').optional().isIn(['Pending', 'Dispensed', 'Completed', 'Cancelled']).withMessage('Invalid status')
  ]
};

// Invoice Validation
const invoiceValidation = {
  create: [
    body('patient').isMongoId().withMessage('Valid patient ID is required'),
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.description').notEmpty().withMessage('Item description is required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Item quantity must be at least 1'),
    body('items.*.unitPrice').isFloat({ min: 0 }).withMessage('Unit price must be a positive number'),
    body('items.*.itemType').isIn(['Consultation', 'Medication', 'Lab Test', 'Procedure', 'Other']).withMessage('Invalid item type'),
    body('paymentMethod').isIn(['Cash', 'Card', 'Insurance', 'Mobile Money', 'Bank Transfer']).withMessage('Invalid payment method')
  ],
  update: [
    body('paymentStatus').optional().isIn(['Pending', 'Partial', 'Paid', 'Overdue', 'Cancelled']).withMessage('Invalid payment status'),
    body('status').optional().isIn(['Pending', 'Dispensed', 'Completed', 'Cancelled']).withMessage('Invalid status')
  ]
};

// Message Validation
const messageValidation = {
  create: [
    body('recipient').isMongoId().withMessage('Valid recipient ID is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('messageType').optional().isIn(['Direct', 'Announcement', 'System']).withMessage('Invalid message type'),
    body('priority').optional().isIn(['Low', 'Normal', 'High', 'Critical']).withMessage('Invalid priority')
  ],
  update: [
    body('status').optional().isIn(['Sent', 'Delivered', 'Read', 'Archived']).withMessage('Invalid status')
  ]
};

// User Management Validation
const userValidation = {
  create: [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['admin', 'doctor', 'nurse', 'receptionist', 'patient']).withMessage('Invalid role'),
    body('phone').optional().matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Invalid phone number')
  ],
  update: [
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('status').optional().isIn(['Active', 'Suspended']).withMessage('Invalid status'),
    body('role').optional().isIn(['admin', 'doctor', 'nurse', 'receptionist', 'patient']).withMessage('Invalid role')
  ]
};

// Appointment Validation
const appointmentValidation = {
  create: [
    body('patient').isMongoId().withMessage('Valid patient ID is required'),
    body('doctor').isMongoId().withMessage('Valid doctor ID is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time is required (HH:MM)'),
    body('type').isIn(['Consultation', 'Follow-up', 'Emergency']).withMessage('Invalid appointment type')
  ],
  update: [
    body('status').optional().isIn(['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled']).withMessage('Invalid status'),
    body('paymentStatus').optional().isIn(['Pending', 'Paid', 'Partial', 'Overdue', 'Cancelled']).withMessage('Invalid payment status')
  ]
};

// Department Validation
const departmentValidation = {
  create: [
    body('name').notEmpty().withMessage('Department name is required'),
    body('description').notEmpty().withMessage('Department description is required'),
    body('head').optional().isMongoId().withMessage('Valid head ID is required')
  ],
  update: [
    body('name').optional().notEmpty().withMessage('Department name cannot be empty'),
    body('description').optional().notEmpty().withMessage('Department description cannot be empty')
  ]
};

// Doctor Validation
const doctorValidation = {
  create: [
    body('user').isMongoId().withMessage('Valid user ID is required'),
    body('specialization').notEmpty().withMessage('Specialization is required'),
    body('licenseNumber').notEmpty().withMessage('License number is required'),
    body('experience').isInt({ min: 0 }).withMessage('Experience must be a positive number'),
    body('department').isMongoId().withMessage('Valid department ID is required'),
    body('consultationFee').isFloat({ min: 0 }).withMessage('Consultation fee must be a positive number')
  ],
  update: [
    body('specialization').optional().notEmpty().withMessage('Specialization cannot be empty'),
    body('experience').optional().isInt({ min: 0 }).withMessage('Experience must be a positive number'),
    body('consultationFee').optional().isFloat({ min: 0 }).withMessage('Consultation fee must be a positive number')
  ]
};

// Patient Validation
const patientValidation = {
  create: [
    body('user').isMongoId().withMessage('Valid user ID is required'),
    body('bloodGroup').optional().isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', '']).withMessage('Invalid blood group')
  ],
  update: [
    body('bloodGroup').optional().isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', '']).withMessage('Invalid blood group'),
    body('height').optional().isFloat({ min: 0 }).withMessage('Height must be a positive number'),
    body('weight').optional().isFloat({ min: 0 }).withMessage('Weight must be a positive number')
  ]
};

// Analytics Query Validation
const analyticsValidation = {
  dateRange: [
    query('startDate').optional().isISO8601().withMessage('Valid start date is required'),
    query('endDate').optional().isISO8601().withMessage('Valid end date is required')
  ]
};

module.exports = {
  medicalRecordValidation,
  prescriptionValidation,
  invoiceValidation,
  messageValidation,
  userValidation,
  appointmentValidation,
  departmentValidation,
  doctorValidation,
  patientValidation,
  analyticsValidation
};