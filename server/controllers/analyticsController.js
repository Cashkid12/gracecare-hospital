const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Invoice = require('../models/Invoice');
const Prescription = require('../models/Prescription');
const MedicalRecord = require('../models/MedicalRecord');
const Department = require('../models/Department');

// @desc    Get dashboard statistics
// @route   GET /api/analytics/dashboard
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view dashboard statistics'
      });
    }

    // Get counts
    const totalUsers = await User.countDocuments({ status: 'Active' });
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalDepartments = await Department.countDocuments();
    
    const totalAppointments = await Appointment.countDocuments();
    const upcomingAppointments = await Appointment.countDocuments({
      date: { $gte: new Date() },
      status: 'Confirmed'
    });
    
    const totalPrescriptions = await Prescription.countDocuments();
    const pendingPrescriptions = await Prescription.countDocuments({ status: 'Pending' });
    
    const totalInvoices = await Invoice.countDocuments();
    const paidInvoices = await Invoice.countDocuments({ paymentStatus: 'Paid' });
    
    const totalRevenue = await Invoice.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    // Get recent appointments
    const recentAppointments = await Appointment.find()
      .populate('patient', 'user')
      .populate('doctor', 'user')
      .sort({ date: -1 })
      .limit(5);

    // Get recent patients
    const recentPatients = await Patient.find()
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalPatients,
          totalDoctors,
          totalDepartments,
          totalAppointments,
          upcomingAppointments,
          totalPrescriptions,
          pendingPrescriptions,
          totalInvoices,
          paidInvoices,
          totalRevenue: totalRevenue[0]?.total || 0
        },
        recentAppointments,
        recentPatients
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get appointment statistics
// @route   GET /api/analytics/appointments
// @access  Private (Admin)
const getAppointmentStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view appointment statistics'
      });
    }

    const { startDate, endDate, doctorId, departmentId } = req.query;
    let matchQuery = {};

    if (startDate || endDate) {
      matchQuery.date = {};
      if (startDate) matchQuery.date.$gte = new Date(startDate);
      if (endDate) matchQuery.date.$lte = new Date(endDate);
    }

    if (doctorId) matchQuery.doctor = doctorId;
    if (departmentId) {
      const doctorIds = await Doctor.find({ department: departmentId }).distinct('_id');
      matchQuery.doctor = { $in: doctorIds };
    }

    // Appointment status distribution
    const statusDistribution = await Appointment.aggregate([
      { $match: matchQuery },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Appointments by date (for chart)
    const appointmentsByDate = await Appointment.aggregate([
      { $match: { ...matchQuery, date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Top doctors by appointments
    const topDoctors = await Appointment.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$doctor',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'doctors',
          localField: '_id',
          foreignField: '_id',
          as: 'doctor'
        }
      },
      { $unwind: '$doctor' },
      {
        $lookup: {
          from: 'users',
          localField: 'doctor.user',
          foreignField: '_id',
          as: 'doctor.user'
        }
      },
      { $unwind: '$doctor.user' },
      {
        $project: {
          doctorName: { $concat: ['$doctor.user.firstName', ' ', '$doctor.user.lastName'] },
          count: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        statusDistribution,
        appointmentsByDate,
        topDoctors
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get revenue statistics
// @route   GET /api/analytics/revenue
// @access  Private (Admin)
const getRevenueStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view revenue statistics'
      });
    }

    const { startDate, endDate } = req.query;
    let matchQuery = { paymentStatus: 'Paid' };

    if (startDate || endDate) {
      matchQuery.paidDate = {};
      if (startDate) matchQuery.paidDate.$gte = new Date(startDate);
      if (endDate) matchQuery.paidDate.$lte = new Date(endDate);
    }

    // Total revenue
    const totalRevenue = await Invoice.aggregate([
      { $match: matchQuery },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    // Revenue by month
    const revenueByMonth = await Invoice.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: {
            year: { $year: '$paidDate' },
            month: { $month: '$paidDate' }
          },
          total: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Revenue by payment method
    const revenueByMethod = await Invoice.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$paymentMethod',
          total: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalRevenue: totalRevenue[0]?.total || 0,
        revenueByMonth,
        revenueByMethod
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get patient statistics
// @route   GET /api/analytics/patients
// @access  Private (Admin)
const getPatientStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view patient statistics'
      });
    }

    const { startDate, endDate } = req.query;
    let matchQuery = {};

    if (startDate || endDate) {
      matchQuery.createdAt = {};
      if (startDate) matchQuery.createdAt.$gte = new Date(startDate);
      if (endDate) matchQuery.createdAt.$lte = new Date(endDate);
    }

    // New patients by date
    const newPatientsByDate = await Patient.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Patients by blood group
    const patientsByBloodGroup = await Patient.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$bloodGroup',
          count: { $sum: 1 }
        }
      }
    ]);

    // Patients with assigned doctors
    const patientsWithDoctors = await Patient.countDocuments({ assignedDoctor: { $exists: true } });
    const patientsWithoutDoctors = await Patient.countDocuments({ assignedDoctor: { $exists: false } });

    res.json({
      success: true,
      data: {
        newPatientsByDate,
        patientsByBloodGroup,
        patientsWithDoctors,
        patientsWithoutDoctors
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get doctor statistics
// @route   GET /api/analytics/doctors
// @access  Private (Admin)
const getDoctorStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view doctor statistics'
      });
    }

    // Doctors by department
    const doctorsByDepartment = await Doctor.aggregate([
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'department'
        }
      },
      { $unwind: '$department' },
      {
        $group: {
          _id: '$department.name',
          count: { $sum: 1 }
        }
      }
    ]);

    // Doctors by experience
    const doctorsByExperience = await Doctor.aggregate([
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lt: ['$experience', 5] }, then: '0-5 years' },
                { case: { $lt: ['$experience', 10] }, then: '5-10 years' },
                { case: { $lt: ['$experience', 15] }, then: '10-15 years' },
                { case: { $gte: ['$experience', 15] }, then: '15+ years' }
              ]
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    // Average consultation fee by specialization
    const avgFeeBySpecialization = await Doctor.aggregate([
      {
        $group: {
          _id: '$specialization',
          avgFee: { $avg: '$consultationFee' },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgFee: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        doctorsByDepartment,
        doctorsByExperience,
        avgFeeBySpecialization
      }
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
  getDashboardStats,
  getAppointmentStats,
  getRevenueStats,
  getPatientStats,
  getDoctorStats
};