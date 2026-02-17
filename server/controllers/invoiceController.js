const Invoice = require('../models/Invoice');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const { validationResult } = require('express-validator');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
const getInvoices = async (req, res) => {
  try {
    const { patientId, paymentStatus, startDate, endDate } = req.query;
    let query = {};

    if (patientId) query.patient = patientId;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    if (startDate || endDate) {
      query.issuedDate = {};
      if (startDate) query.issuedDate.$gte = new Date(startDate);
      if (endDate) query.issuedDate.$lte = new Date(endDate);
    }

    // For patients, only show their own invoices
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (patient) {
        query.patient = patient._id;
      }
    }

    const invoices = await Invoice.find(query)
      .populate('patient', 'user')
      .populate('appointment')
      .populate('prescription')
      .populate('createdBy', 'firstName lastName role')
      .sort({ issuedDate: -1 });

    res.json({
      success: true,
      count: invoices.length,
      data: invoices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private
const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('patient', 'user')
      .populate('appointment')
      .populate('prescription')
      .populate('createdBy', 'firstName lastName role');

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (!patient || patient._id.toString() !== invoice.patient.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this invoice'
        });
      }
    }

    res.json({
      success: true,
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private (Admin, Receptionist)
const createInvoice = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    if (req.user.role !== 'admin' && req.user.role !== 'receptionist') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create invoices'
      });
    }

    const { patient, appointment, prescription, items, tax, discount, paymentMethod, dueDate, notes } = req.body;

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxAmount = tax || 0;
    const discountAmount = discount || 0;
    const totalAmount = subtotal + taxAmount - discountAmount;

    const invoice = await Invoice.create({
      patient,
      appointment,
      prescription,
      items,
      subtotal,
      tax: taxAmount,
      discount: discountAmount,
      totalAmount,
      paymentMethod,
      dueDate,
      notes,
      createdBy: req.user._id
    });

    const populatedInvoice = await Invoice.findById(invoice._id)
      .populate('patient', 'user')
      .populate('appointment')
      .populate('prescription')
      .populate('createdBy', 'firstName lastName role');

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: populatedInvoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private (Admin, Receptionist)
const updateInvoice = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    if (req.user.role !== 'admin' && req.user.role !== 'receptionist') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update invoices'
      });
    }

    let invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    // Prevent updating paid invoices
    if (invoice.paymentStatus === 'Paid') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update paid invoice'
      });
    }

    const { items, tax, discount, paymentMethod, paymentStatus, dueDate, notes, paidDate } = req.body;

    // Recalculate totals if items changed
    let subtotal = invoice.subtotal;
    let totalAmount = invoice.totalAmount;

    if (items) {
      subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      const taxAmount = tax !== undefined ? tax : invoice.tax;
      const discountAmount = discount !== undefined ? discount : invoice.discount;
      totalAmount = subtotal + taxAmount - discountAmount;
    }

    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        items,
        subtotal: items ? subtotal : undefined,
        tax,
        discount,
        totalAmount: items ? totalAmount : undefined,
        paymentMethod,
        paymentStatus,
        dueDate,
        notes,
        paidDate
      },
      { new: true, runValidators: true }
    ).populate('patient', 'user')
      .populate('appointment')
      .populate('prescription')
      .populate('createdBy', 'firstName lastName role');

    res.json({
      success: true,
      message: 'Invoice updated successfully',
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private (Admin)
const deleteInvoice = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete invoices'
      });
    }

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    // Prevent deleting paid invoices
    if (invoice.paymentStatus === 'Paid') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete paid invoice'
      });
    }

    await invoice.remove();

    res.json({
      success: true,
      message: 'Invoice deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Generate PDF invoice
// @route   GET /api/invoices/:id/pdf
// @access  Private
const generateInvoicePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('patient', 'user')
      .populate('appointment')
      .populate('prescription');

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (!patient || patient._id.toString() !== invoice.patient.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this invoice'
        });
      }
    }

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    // Add content to PDF (simplified version)
    page.drawText(`INVOICE`, { x: 50, y: height - 50, size: 24 });
    page.drawText(`Invoice #: ${invoice.invoiceNumber}`, { x: 50, y: height - 80, size: 12 });
    page.drawText(`Date: ${new Date(invoice.issuedDate).toLocaleDateString()}`, { x: 50, y: height - 100, size: 12 });
    
    // Save PDF
    const pdfBytes = await pdfDoc.save();
    const pdfPath = path.join(__dirname, '..', 'uploads', 'invoices', `${invoice.invoiceNumber}.pdf`);
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(pdfPath), { recursive: true });
    await fs.writeFile(pdfPath, pdfBytes);

    res.json({
      success: true,
      message: 'PDF generated successfully',
      data: {
        url: `/uploads/invoices/${invoice.invoiceNumber}.pdf`
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

// @desc    Get invoice statistics
// @route   GET /api/invoices/stats
// @access  Private (Admin, Receptionist)
const getInvoiceStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'receptionist') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view invoice statistics'
      });
    }

    const totalInvoices = await Invoice.countDocuments();
    const totalRevenue = await Invoice.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const pendingInvoices = await Invoice.countDocuments({ paymentStatus: 'Pending' });
    const overdueInvoices = await Invoice.countDocuments({ 
      paymentStatus: { $ne: 'Paid' },
      dueDate: { $lt: new Date() }
    });

    res.json({
      success: true,
      data: {
        totalInvoices,
        totalRevenue: totalRevenue[0]?.total || 0,
        pendingInvoices,
        overdueInvoices
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
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  generateInvoicePDF,
  getInvoiceStats
};