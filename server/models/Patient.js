const mongoose = require('mongoose');

const patientSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''],
    },
    height: {
      type: Number, // in cm
    },
    weight: {
      type: Number, // in kg
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    insurance: {
      provider: String,
      policyNumber: String,
      groupNumber: String,
    },
    allergies: [String],
    currentMedications: [String],
    medicalHistory: [
      {
        condition: String,
        diagnosedDate: Date,
        status: {
          type: String,
          enum: ['active', 'resolved', 'chronic'],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Patient', patientSchema);