
const Joi = require('joi');


const objectId = () =>
  Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      'string.base': `"{{#label}}" must be a string`,
      'string.length': `"{{#label}}" must be 24 characters`,
      'string.hex': `"{{#label}}" must be a valid hex ObjectId`,
      'any.required': `"{{#label}}" is required`,
    });

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

module.exports = {
  objectId,
  password,
};
