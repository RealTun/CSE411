const express = require('express');
const router = express.Router();
const groupController = require('../controller/groupController');



router.post('/selectTopic', groupController.selectTopic);

router.get('/selectGroups', groupController.selectGroups);

// router.get('/users/:id', userController.getUserById);

module.exports = router;
