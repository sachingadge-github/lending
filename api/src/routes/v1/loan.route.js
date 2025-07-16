const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const loanController = require('../../controllers/loan.controller');
const loanValidation = require('../../validations/loan.validation');

const router = express.Router();
 
router
  .route('/')
  .get(auth('getUsers'), loanController.getLoans)
  .post(auth('manageUsers'), validate(loanValidation.createLoan), loanController.createLoan);

router
  .route('/:loanId')
  .get(auth('getUsers'), validate(loanValidation.getLoan), loanController.getLoan)
  .patch(auth('manageUsers'), validate(loanValidation.updateLoan), loanController.updateLoan)
  .delete(auth('manageUsers'), validate(loanValidation.deleteLoan), loanController.deleteLoan);

module.exports = router;
