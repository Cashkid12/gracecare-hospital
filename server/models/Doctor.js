const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  available: {
    type: Boolean,
    default: false
  },
  start: {
    type: String,
    default: "09:00"
  },
  end: {
    type: String,
    default: "17:00"
  }
});

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    trim: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'License number is required'],
    unique: true,
    trim: true
  },
  experience: {
    type: Number,
    required: [true, 'Experience is required'],
    min: 0
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  consultationFee: {
    type: Number,
    default: 50
  },
  bio: {
    type: String,
    default: '',
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  availability: {
    Monday: availabilitySchema,
    Tuesday: availabilitySchema,
    Wednesday: availabilitySchema,
    Thursday: availabilitySchema,
    Friday: availabilitySchema,
    Saturday: availabilitySchema,
    Sunday: availabilitySchema
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, { 
  timestamps: true 
});

// Set default availability
doctorSchema.pre('save', function(next) {
  if (this.isNew) {
    this.availability = {
      Monday: { available: true, start: "09:00", end: "17:00" },
      Tuesday: { available: true, start: "09:00", end: "17:00" },
      Wednesday: { available: true, start: "09:00", end: "17:00" },
      Thursday: { available: true, start: "09:00", end: "17:00" },
      Friday: { available: true, start: "09:00", end: "17:00" },
      Saturday: { available: false, start: "09:00", end: "13:00" },
      Sunday: { available: false, start: "09:00", end: "17:00" }
    };
  }
  next();
});

module.exports = mongoose.model('Doctor', doctorSchema);