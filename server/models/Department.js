const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Department name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Department description is required'],
      maxlength: 1000,
    },
    headOfDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    services: [String],
    facilities: [String],
    contact: {
      phone: String,
      email: String,
      extension: String,
    },
    image: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Department', departmentSchema);