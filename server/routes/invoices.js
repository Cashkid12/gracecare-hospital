const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  generateInvoicePDF,
  getInvoiceStats
} = require('../controllers/invoiceController');

// All routes protected
router.use(protect);

// Get invoice statistics (Admin, Receptionist)
router.get('/stats', authorize('admin', 'receptionist'), getInvoiceStats);

// Get all invoices
router.get('/', getInvoices);

// Get single invoice
router.get('/:id', getInvoice);

// Generate PDF invoice
router.get('/:id/pdf', generateInvoicePDF);

// Create new invoice (Admin, Receptionist)
router.post('/', authorize('admin', 'receptionist'), createInvoice);

// Update invoice (Admin, Receptionist)
router.put('/:id', authorize('admin', 'receptionist'), updateInvoice);

// Delete invoice (Admin)
router.delete('/:id', authorize('admin'), deleteInvoice);

module.exports = router;