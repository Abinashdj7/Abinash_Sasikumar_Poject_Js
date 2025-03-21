const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getUserInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/InvoiceController'); // Adjust path as necessary

// Create a new invoice
router.post('/', createInvoice);

// Get all invoices for a specific user
router.get('/', getUserInvoices);

// Get a single invoice by its ID
router.get('/:id', getInvoice);

// Update an existing invoice
router.put('/:id', updateInvoice);

// Delete an invoice by its ID
router.delete('/:id', deleteInvoice);

module.exports = router;
