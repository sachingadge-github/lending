const Loan = require('../models/loan.model');

/**
 * Create a new loan
 */
const createLoan = async (data) => {
  return Loan.create(data);
};

/**
 * Get all loans (with optional filters)
 */
const getLoans = async (filter = {}, options = {}) => {
  return Loan.paginate(filter, options);
};

/**
 * Get single loan by ID
 */
const getLoanById = async (id) => {
  return Loan.findById(id);
};

/**
 * Update a loan
 */
const updateLoan = async (id, updateData) => {
  return Loan.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Delete a loan
 */
const deleteLoan = async (id) => {
  return Loan.findByIdAndDelete(id);
};

module.exports = {
  createLoan,
  getLoans,
  getLoanById,
  updateLoan,
  deleteLoan
};
