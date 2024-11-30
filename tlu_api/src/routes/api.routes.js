const express = require('express');
const { login, getCurrentStudent, getListMarkDetail } = require('../controllers/api.controller');
const router = express.Router();

router.post('/login', login);

router.get('/getCurrentStudent', getCurrentStudent);

router.get('/getListMarkDetail', getListMarkDetail);

module.exports = router;