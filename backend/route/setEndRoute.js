const express = require('express');
const router = express.Router();

const {getsetEnd} = require('../controller/setEndController');

router.post('/',getsetEnd);




module.exports = router;