const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const auditLogSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    metadata: { type: Object }, // Flexible payload
  },
  { timestamps: true }
);

auditLogSchema.plugin(toJSON);
auditLogSchema.plugin(paginate);

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
module.exports = AuditLog;
