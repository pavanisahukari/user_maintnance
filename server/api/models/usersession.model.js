'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersessionSchema = new Schema({
  userid:{type:Schema.Types.ObjectId,ref:'User'},
  token:String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Usersession', UsersessionSchema);