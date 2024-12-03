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
// router.get('/selectGroups', groupController.selectGroups);
// dùng để phân nhóm
router.get('/grouping', groupController.grouping);
// dùng để lưu thành viên
// {
//     "username": 2151163709,
//     "fullname": "Nguyễn Tuấn Ngọc",
//     "Average_MIS_Score": 7.5,
//     "Average_BigData_Score": 6.0,
//     "GPA": 3.0,
//     "Average_Self_Study_Time": 3.0,
//     "Number_of_Late_Attendances_in_Phase_1": 0,
//     "Soft_Skills": "Tốt",
//     "Technology_Usage_Skills": "Khá",
//     "Strengths": "Kỹ thuật",
//     "Muc_do": 1
// }
router.post('/saveStudent',groupController.saveStudent)

router.get("/getUserSameGroup",groupController.getUserSameGroup);

router.get("/getMyInfor",groupController.getMyInfor);


module.exports = router;
