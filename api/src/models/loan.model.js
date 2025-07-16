const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const loanSchema = mongoose.Schema(
  {
    borrowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Borrower',
      required: true,
    },
    principal: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    interestType: { type: String, enum: ['monthly', 'yearly'], required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['active', 'closed', 'defaulted'],
      default: 'active',
    },
    collateral: { type: String },
  },
  { timestamps: true }
);

loanSchema.plugin(toJSON);
loanSchema.plugin(paginate);

const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;
