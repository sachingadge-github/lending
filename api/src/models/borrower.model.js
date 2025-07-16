const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const borrowerSchema = mongoose.Schema(
  {
    lenderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    kycStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

borrowerSchema.plugin(toJSON);
borrowerSchema.plugin(paginate);

const Borrower = mongoose.model('Borrower', borrowerSchema);
module.exports = Borrower;
