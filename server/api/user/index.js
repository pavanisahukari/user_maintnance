'use strict';

var express = require('express');
var controller = require('./user.controller');
var userschema = require('./userSchema');
var validators = require('./uservalidator')
var router = express.Router();

router.get('/',  controller.index);
router.delete('/:id', controller.destroy);
router.post('/addUser',validators.validateproperties(userschema,'body'),controller.create);
router.post('/login', controller.Login);


module.exports = router;
