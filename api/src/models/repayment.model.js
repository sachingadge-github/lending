const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const repaymentSchema = mongoose.Schema(
  {
    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Loan',
      required: true,
    },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    mode: { type: String, trim: true },
    notes: { type: String },
  },
  { timestamps: true }
);

repaymentSchema.plugin(toJSON);
repaymentSchema.plugin(paginate);

const Repayment = mongoose.model('Repayment', repaymentSchema);
module.exports = Repayment;
