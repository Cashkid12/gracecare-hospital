const express = require('express');
const Department = require('../models/Department');

const router = express.Router();

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true })
      .populate('headOfDepartment', 'user specialization')
      .select('-__v');

    res.json(departments);
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single department
// @route   GET /api/departments/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('headOfDepartment', 'user specialization experience');

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json(department);
  } catch (error) {
    console.error('Get department error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get department by name
// @route   GET /api/departments/name/:name
// @access  Public
router.get('/name/:name', async (req, res) => {
  try {
    const department = await Department.findOne({ 
      name: new RegExp(req.params.name, 'i'),
      isActive: true 
    }).populate('headOfDepartment', 'user specialization');

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json(department);
  } catch (error) {
    console.error('Get department by name error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;