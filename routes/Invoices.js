const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getUserInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/InvoiceController');

const authMiddleware = require("../middleware/Jwt")


router.post('/',authMiddleware,createInvoice);


router.get('/',authMiddleware, getUserInvoices);

router.get('/:id',authMiddleware, getInvoice);

router.put('/:id',authMiddleware, updateInvoice);

router.delete('/:id',authMiddleware,deleteInvoice);

module.exports = router;
