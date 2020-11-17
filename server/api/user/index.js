'use strict';

var express = require('express');
var controller = require('./user.controller');
// var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',  controller.index);
router.delete('/:id', controller.destroy);
router.post('/', controller.create);
router.post('/login', controller.Login);


module.exports = router;
