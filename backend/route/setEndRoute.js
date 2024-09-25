const express = require('express');
const router = express.Router();

const {getsetEnd} = require('../controller/setEndController');

router.get('/',getsetEnd);




module.exports = router;