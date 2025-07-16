const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const loanService = require('../services/loan.service');

const createLoan = catchAsync(async (req, res) => {
  const loan = await loanService.createLoan(req.body);
  res.status(httpStatus.CREATED).send(loan);
});

const getLoans = catchAsync(async (req, res) => {
  const loans = await loanService.getLoans({}, { sortBy: 'createdAt:desc' });
  res.send(loans);
});

const getLoan = catchAsync(async (req, res) => {
  const loan = await loanService.getLoanById(req.params.loanId);
  if (!loan) return res.status(httpStatus.NOT_FOUND).send({ message: 'Loan not found' });
  res.send(loan);
});

const updateLoan = catchAsync(async (req, res) => {
  const loan = await loanService.updateLoan(req.params.loanId, req.body);
  res.send(loan);
});

const deleteLoan = catchAsync(async (req, res) => {
  await loanService.deleteLoan(req.params.loanId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLoan,
  getLoans,
  getLoan,
  updateLoan,
  deleteLoan,
};
