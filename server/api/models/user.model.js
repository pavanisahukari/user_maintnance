'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String, lowercase: true },
  first_name:String,
  last_name:String,
  password:String,
  status:{type:Boolean,default:true},
  created_at: { type: Date, required: true, default: Date.now },

});

module.exports = mongoose.model('User', UserSchema);
