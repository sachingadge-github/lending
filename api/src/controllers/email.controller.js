const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { sendEmail } = require('../services/email.service');

const sendEmailHandler = catchAsync(async (req, res) => {
  const { to, subject, text } = req.body;
  await sendEmail(to, subject, text);
  res.status(httpStatus.OK).send({ message: 'Email sent successfully' });
});

module.exports = {
  sendEmail: sendEmailHandler,
};
