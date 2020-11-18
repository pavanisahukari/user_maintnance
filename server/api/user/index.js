'use strict';

var express = require('express');
var controller = require('./user.controller');
var User = require('./user.model');
const validator = require('express-joi-validation').createValidator({})

var router = express.Router();

router.get('/',  controller.index);
router.delete('/:id', controller.destroy);
router.post('/', validator.query(User), controller.create);
router.post('/login', controller.Login);


module.exports = router;
