const Invoice = require('../models/InvoiceModel');

const createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice({
      ...req.body,
      user: req.user.id
    });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(400).json({ message: error.message });
  }
};

const getUserInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id }).populate('items.product');
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('items.product');
    if (!invoice || invoice.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice || invoice.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice || invoice.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Invoice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInvoice,
  deleteInvoice,
  getUserInvoices,
  getInvoice,
  updateInvoice
};
