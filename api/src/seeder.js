const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const Borrower = require('./models/borrower.model');
const Loan = require('./models/loan.model');
const Repayment = require('./models/repayment.model');
const Document = require('./models/document.model');
const Alert = require('./models/alert.model');
const AuditLog = require('./models/auditLog.model');

// Replace with your MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/node-boilerplate';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('🟢 Connected to DB');

    // Clear collections
    await Promise.all([
      User.deleteMany({}),
      Borrower.deleteMany({}),
      Loan.deleteMany({}),
      Repayment.deleteMany({}),
      Document.deleteMany({}),
      Alert.deleteMany({}),
      AuditLog.deleteMany({})
    ]);

    // Create users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 8),
      role: 'admin',
      isEmailVerified: true
    });

    const lender = await User.create({
      name: 'Lender One',
      email: 'lender1@example.com',
      password: await bcrypt.hash('lender123', 8),
      role: 'user',
      isEmailVerified: true
    });

    // Create borrowers
    const borrower = await Borrower.create({
      lenderId: lender._id,
      name: 'Ravi Kumar',
      email: 'ravi@demo.com',
      phone: '9876543210',
      address: 'Delhi',
      kycStatus: 'verified'
    });

    // Create loan
    const loan = await Loan.create({
      borrowerId: borrower._id,
      principal: 50000,
      interestRate: 12,
      interestType: 'monthly',
      startDate: new Date('2024-01-01'),
      dueDate: new Date('2025-01-01'),
      status: 'active',
      collateral: 'Bike RC'
    });

    // Create repayments
    await Repayment.create([
      {
        loanId: loan._id,
        amount: 5000,
        paymentDate: new Date('2024-02-01'),
        mode: 'cash',
        notes: 'First EMI'
      },
      {
        loanId: loan._id,
        amount: 5000,
        paymentDate: new Date('2024-03-01'),
        mode: 'cash',
        notes: 'Second EMI'
      }
    ]);

    // Create document
    await Document.create({
      borrowerId: borrower._id,
      type: 'ID Proof',
      fileUrl: 'http://example.com/documents/ravi-id.pdf',
      expiryDate: new Date('2030-12-31')
    });

    // Create alert
    await Alert.create({
      userId: lender._id,
      type: 'due',
      message: 'Loan repayment due for Ravi Kumar',
      frequency: 'monthly',
      isRead: false
    });

    // Create audit log
    await AuditLog.create({
      userId: lender._id,
      action: 'create_loan',
      entity: 'loan',
      entityId: loan._id,
      metadata: {
        principal: 50000,
        interestRate: 12
      }
    });

    console.log('✅ Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
