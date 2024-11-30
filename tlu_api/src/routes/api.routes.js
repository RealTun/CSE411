const express = require('express');
const { login, getCurrentStudent, getListMarkDetail,testAPIs } = require('../controllers/api.controller');
const router = express.Router();

router.post('/login', login);

router.get('/getCurrentStudent', getCurrentStudent);

router.get('/getListMarkDetail', getListMarkDetail);

router.post('/testAPIs', testAPIs);

module.exports = router;