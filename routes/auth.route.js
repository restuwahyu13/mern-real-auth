const express = require('express');
const router = express.Router();
const { authController } = require('../controllers/auth.controller');

router.post('/auth/signup', authController.registerAccount);
router.post('/auth/signin', authController.loginAccount);
router.get('/auth/activation/:token', authController.activationAccount);
router.post('/auth/forgotpassword', authController.forgotPassword);
router.put('/auth/resetpassword/:token', authController.resetPassword);

module.exports = router;
