const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const alertSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: { type: String, enum: ['due', 'overdue', 'custom'], required: true },
    message: { type: String, required: true },
    frequency: { type: String, enum: ['once', 'daily', 'weekly', 'monthly'], default: 'once' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

alertSchema.plugin(toJSON);
alertSchema.plugin(paginate);

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;
