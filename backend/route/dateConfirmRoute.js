const express = require('express');
const router = express.Router();

const {dateConfirm} = require('../controller/dateConfirmController');

router.post('/',dateConfirm);




module.exports = router;