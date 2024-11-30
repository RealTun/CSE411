const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.get('/users', userController.getAlluser);

router.post('/login', userController.login);

// router.get('/users/:id', userController.getUserById);

module.exports = router;
