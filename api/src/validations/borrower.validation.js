const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBorrower = {
  body: Joi.object().keys({
    // lenderId: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    address: Joi.string(),
    kycStatus: Joi.string().valid('pending', 'verified', 'rejected')
  })
};

const getBorrowers = {
  query: Joi.object().keys({})
};

const getBorrower = {
  params: Joi.object().keys({
    borrowerId: objectId
  })
};

const updateBorrower = {
  params: Joi.object().keys({
    borrowerId: objectId
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    address: Joi.string(),
    kycStatus: Joi.string().valid('pending', 'verified', 'rejected')
  })
};

const deleteBorrower = {
  params: Joi.object({
    borrowerId: Joi.string().length(24).hex().required()
  })
};


module.exports = {
  createBorrower,
  getBorrowers,
  getBorrower,
  updateBorrower,
  deleteBorrower
};
