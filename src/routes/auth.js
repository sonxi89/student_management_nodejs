const express = require('express');
const authController = require('../app/controllers/authControllers');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', authController.changePassword);

module.exports = router;
