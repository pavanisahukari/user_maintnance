'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersessionSchema = new Schema({
  token:String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Usersession', UsersessionSchema);