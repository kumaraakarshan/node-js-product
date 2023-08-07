const express = require('express');
const path=require('path');
const router = express.Router();
const rootDir=require('../util/path')
const contactSuccessController=require('../controller/success')

router.get('/', contactSuccessController.success);

module.exports = router;