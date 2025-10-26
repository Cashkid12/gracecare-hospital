const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user (Patient or Doctor)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      phone,
      address,
      dateOfBirth,
      // Doctor specific fields
      specialization,
      licenseNumber,
      experience,
      department,
      consultationFee,
      // Patient specific fields
      bloodType,
      allergies,
      emergencyContact,
      insuranceProvider,
      insuranceNumber
    } = req.body;

    // Prevent admin registration through this route
    if (role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin registration is not allowed through this endpoint'
      });
    }

    // Validation for required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: firstName, lastName, email, password, role'
      });
    }

    // Doctor specific validation
    if (role === 'doctor') {
      if (!specialization || !licenseNumber || !experience || !department) {
        return res.status(400).json({
          success: false,
          message: 'For doctor registration, please provide: specialization, licenseNumber, experience, department'
        });
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password,
      role,
      phone: phone ? phone.trim() : '',
      address: address ? address.trim() : '',
      dateOfBirth: dateOfBirth || null
    });

    await user.save();

    // If role is doctor, create doctor profile
    if (role === 'doctor') {
      // Check if license number already exists
      const existingDoctor = await Doctor.findOne({ licenseNumber: licenseNumber.trim() });
      if (existingDoctor) {
        // Delete the user we just created
        await User.findByIdAndDelete(user._id);
        return res.status(400).json({
          success: false,
          message: 'Doctor with this license number already exists'
        });
      }

      const doctor = new Doctor({
        user: user._id,
        specialization: specialization.trim(),
        licenseNumber: licenseNumber.trim(),
        experience: parseInt(experience) || 0,
        department: department.trim(),
        consultationFee: consultationFee || 50
      });

      await doctor.save();
    }

    // If role is patient, create patient profile
    if (role === 'patient') {
      const patient = new Patient({
        user: user._id,
        bloodType: bloodType || '',
        allergies: allergies ? allergies.split(',').map(allergy => allergy.trim()) : [],
        emergencyContact: emergencyContact || {
          name: '',
          phone: '',
          relationship: ''
        },
        insuranceProvider: insuranceProvider || '',
        insuranceNumber: insuranceNumber || ''
      });

      await patient.save();
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // If it's a validation error, send specific message
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    // If it's a duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email or license number already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Login user (Patient, Doctor, or Admin)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact administrator.'
      });
    }

    // Check if user role matches
    if (role && user.role !== role) {
      // Special message for admin login attempts
      if (role === 'admin') {
        return res.status(401).json({
          success: false,
          message: 'No admin account found with this email. Please use the admin login portal.'
        });
      }
      return res.status(401).json({
        success: false,
        message: `No ${role} account found with this email`
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Create first admin user (one-time setup)
// @route   POST /api/auth/create-admin
// @access  Public (should be protected in production)
const createAdminUser = async (req, res) => {
  try {
    console.log('Creating admin user...');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      return res.status(400).json({
        success: false,
        message: 'Admin user already exists'
      });
    }

    // Create admin user
    const adminUser = new User({
      firstName: 'System',
      lastName: 'Administrator',
      email: 'admin@gracecare.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1234567890',
      address: 'GraceCare Hospital Headquarters',
      isActive: true
    });

    await adminUser.save();
    console.log('Admin user created successfully');

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: adminUser._id,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        email: adminUser.email,
        role: adminUser.role
      }
    });

  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating admin user',
      error: error.message
    });
  }
};

// @desc    Check if admin user exists
// @route   GET /api/auth/check-admin
// @access  Public
const checkAdminExists = async (req, res) => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    
    res.json({
      success: true,
      adminExists: !!adminExists
    });
  } catch (error) {
    console.error('Check admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking admin user',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  createAdminUser,
  checkAdminExists
};