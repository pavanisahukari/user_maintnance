'use strict';

var express = require('express');
var controller = require('../controllers/user.controller');
var userschema = require('../schemaValidators/userSchema');
var validators = require('../validatorMiddlewares/uservalidator')
var router = express.Router();

router.get('/',  controller.index);
router.delete('/:id', controller.destroy);
router.post('/addUser',validators.validateproperties(userschema,'body'),controller.create);
router.post('/login', controller.Login);


module.exports = router;
