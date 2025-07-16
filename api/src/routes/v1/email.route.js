const express = require('express');
const emailController = require('../../controllers/email.controller.js');

const router = express.Router();

router.post('/send', emailController.sendEmail);

module.exports = router;
