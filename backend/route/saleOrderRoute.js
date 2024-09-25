const express = require('express');
const router = express.Router();

const {getSaleorder} = require('../controller/saleOrderController');

router.get('/',getSaleorder);




module.exports = router;