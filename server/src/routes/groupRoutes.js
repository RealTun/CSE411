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
router.get('/selectGroups', groupController.selectGroups);
// dùng để phân nhóm
router.get('/grouping', groupController.grouping);

router.get("/getUserSameGroup",groupController.getUserSameGroup);

router.get("/getMyInfor",groupController.getMyInfor);


module.exports = router;
