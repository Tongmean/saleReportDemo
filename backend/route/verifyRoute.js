const express = require('express');
const router = express.Router();

const {verifypin} = require('../controller/verifyController');

router.post('/',verifypin);




module.exports = router;