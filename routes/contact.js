const express = require('express');
const path=require('path');
const router = express.Router();
const rootDir=require('../util/path')
const contactController = require('../controller/contact');

router.get('/', contactController.getcontact);

module.exports = router;