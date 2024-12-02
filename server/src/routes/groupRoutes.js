const express = require('express');
const router = express.Router();
const groupController = require('../controller/groupController');


// dùng để chọn topic
// Mẫu body request
// {
//     "username": "",
//     "topic": ""
// }
router.post('/selectTopic', groupController.selectTopic);
// dùng để chốt nhóm
router.post('/selectGroups', groupController.selectGroups);
// dùng để phân nhóm
router.post('/grouping', groupController.grouping);

module.exports = router;
