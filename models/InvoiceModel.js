const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model for customers
      required: true
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Referencing the Product model
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Cancelled'],
      default: 'Pending'
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'Cash', 'Bank Transfer'],
      required: true
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    dueDate: {
      type: Date
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
