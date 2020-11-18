'use strict';

var express = require('express');
var controller = require('../controllers/usersession.controller');

var router = express.Router();


router.get('/:id',  controller.getUserTokens);
module.exports = router;