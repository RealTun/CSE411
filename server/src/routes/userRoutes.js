const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');



router.post('/login', userController.login);
router.post('/logout', userController.logout);

// router.get('/users/:id', userController.getUserById);

module.exports = router;
