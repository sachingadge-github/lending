const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const documentSchema = mongoose.Schema(
  {
    borrowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Borrower',
      required: true,
    },
    type: { type: String, required: true },
    fileUrl: { type: String, required: true },
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

documentSchema.plugin(toJSON);
documentSchema.plugin(paginate);

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
