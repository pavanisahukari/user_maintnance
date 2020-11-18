'use strict';
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email:  { type: String, index: { unique: true }},
	first_name: String,
	last_name: String,
	created_at: { type: Date, default: Date.now },
  status:{type:Boolean,default:true},
  password:String,
});

// const schema = Joi.object({ first_name: Joi.string() .required(),
//   email: Joi.string().required() .email(),
//   password: Joi.string() .min(6) .required() });
//   const validation = schema.validate("newUser");
//   console.log(validation);




module.exports = mongoose.model('User', UserSchema);
