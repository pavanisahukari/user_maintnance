'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
  email: { type: String, lowercase: true },
  firstname:String,
  lastname:String,
  password:String,
  status:{type:Boolean,default:true},
});




module.exports = mongoose.model('User', UserSchema);
