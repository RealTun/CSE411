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
// Mẫu body request
// {
//     "lan": 1
// }
router.post('/selectGroups', groupController.selectGroups);
// dùng để phân nhóm
// Mẫu body request
// {
//     "lan": 1
// }
router.post('/grouping', groupController.grouping);

router.get("/getUserSameGroup",groupController.getUserSameGroup);

router.get("/getMyInfor",groupController.getMyInfor);


module.exports = router;
