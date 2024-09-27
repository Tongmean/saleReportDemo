const express = require('express');
const router = express.Router();

const {lastestConfirmDate} = require('../controller/latestConfirmDate');

router.get('/',lastestConfirmDate);




module.exports = router;