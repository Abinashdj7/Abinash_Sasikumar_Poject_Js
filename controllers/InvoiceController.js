const Invoice = require('../models/InvoiceModel'); 


const createInvoice = async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debugging Step
      const invoice = new Invoice(req.body);
      await invoice.save();
      res.status(201).json(invoice);
    } catch (error) {
      console.error("Error creating invoice:", error);
      res.status(400).json({ message: error.message });
    }
  };
  


const getUserInvoices = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const invoices = await Invoice.find({ user: userId });
    if (!invoices) {
      return res.status(404).json({ message: 'Invoices not found' });
    }
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, req.body, { new: true });
    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={createInvoice,deleteInvoice,getUserInvoices,getInvoice,updateInvoice}
