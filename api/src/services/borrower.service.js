const Borrower = require('../models/borrower.model');

/**
 * Create a new borrower
 */
const createBorrower = async (data) => {
  return Borrower.create(data);
};

/**
 * Get all borrowers (with optional filters)
 */
const getBorrowers = async (filter = {}, options = {}) => {
  return Borrower.paginate(filter, options);
};

/**
 * Get single borrower by ID
 */
const getBorrowerById = async (id) => {
  return Borrower.findById(id);
};

/**
 * Update a borrower
 */
const updateBorrower = async (id, updateData) => {
  return Borrower.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Delete a borrower
 */
const deleteBorrower = async (id) => {
  return Borrower.findByIdAndDelete(id);
};

module.exports = {
  createBorrower,
  getBorrowers,
  getBorrowerById,
  updateBorrower,
  deleteBorrower
};
