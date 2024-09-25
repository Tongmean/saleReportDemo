const express = require('express');
const router = express.Router();

const {getCreditNote} = require('../controller/creditNoteController');

router.get('/',getCreditNote);




module.exports = router;