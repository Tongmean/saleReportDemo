const express = require('express');
const router = express.Router();

const {getSaleorder} = require('../controller/saleOrderController');

router.post('/',getSaleorder);




module.exports = router;