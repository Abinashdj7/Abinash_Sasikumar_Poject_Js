const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getUserInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/InvoiceController'); 


router.post('/', createInvoice);


router.get('/', getUserInvoices);


router.get('/:id', getInvoice);

router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);

module.exports = router;
