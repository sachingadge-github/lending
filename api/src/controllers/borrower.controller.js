const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const borrowerService = require('../services/borrower.service');

// const createBorrower = catchAsync(async (req, res) => {
//   const borrower = await borrowerService.createBorrower(req.body);
//   res.status(httpStatus.CREATED).send(borrower);
// });

const createBorrower = catchAsync(async (req, res) => {
  // Only allow if user has lender role

  console.log(req.user, 'req.user');
  
  if (req.user.role !== 'lender') {
    return res.status(httpStatus.FORBIDDEN).send({ message: 'Only lenders can create borrowers' });
  }

  const borrowerData = {
    ...req.body,
    lenderId: req.user.id // Set from logged-in user
  };

  const borrower = await borrowerService.createBorrower(borrowerData);
  res.status(httpStatus.CREATED).send(borrower);
});


const getBorrowers = catchAsync(async (req, res) => {
  const borrowers = await borrowerService.getBorrowers({}, { sortBy: 'createdAt:desc' });
  res.send(borrowers);
});

const getBorrower = catchAsync(async (req, res) => {
  const borrower = await borrowerService.getBorrowerById(req.params.borrowerId);
  if (!borrower) return res.status(httpStatus.NOT_FOUND).send({ message: 'Borrower not found' });
  res.send(borrower);
});

const updateBorrower = catchAsync(async (req, res) => {
  const updated = await borrowerService.updateBorrower(req.params.borrowerId, req.body);
  res.send(updated);
});

const deleteBorrower = catchAsync(async (req, res) => {
  console.log(req.params, 'req.params.borrowerId' );
  
  await borrowerService.deleteBorrower(req.params.borrowerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBorrower,
  getBorrowers,
  getBorrower,
  updateBorrower,
  deleteBorrower
};
