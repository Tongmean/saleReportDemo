const express = require('express');
const router = express.Router();

const {getMatid} = require('../controller/matidController');

router.get('/',getMatid);




module.exports = router;