const express = require('express');
const router = express.Router();

const {getCreditNote} = require('../controller/creditNoteController');

router.post('/',getCreditNote);




module.exports = router;