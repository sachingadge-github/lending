const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLoan = {
  body: Joi.object().keys({
    borrowerId: objectId().required(),
    principal: Joi.number().required(),
    interestRate: Joi.number().required(),
    interestType: Joi.string().valid('monthly', 'yearly').required(),
    startDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    status: Joi.string().valid('active', 'closed', 'defaulted'),
    collateral: Joi.string().allow(''),
  }),
};

const getLoan = {
  params: Joi.object().keys({
    loanId: objectId(),
  }),
};

const updateLoan = {
  params: Joi.object().keys({
    loanId: objectId(),
  }),
  body: Joi.object().keys({
    principal: Joi.number(),
    interestRate: Joi.number(),
    interestType: Joi.string().valid('monthly', 'yearly'),
    startDate: Joi.date(),
    dueDate: Joi.date(),
    status: Joi.string().valid('active', 'closed', 'defaulted'),
    collateral: Joi.string().allow(''),
    borrowerId: objectId(),

  }),
};

const deleteLoan = {
  params: Joi.object().keys({
    loanId: objectId(),
  }),
};

module.exports = {
  createLoan,
  getLoan,
  updateLoan,
  deleteLoan,
};
