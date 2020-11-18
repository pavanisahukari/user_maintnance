'use strict';

var Usersession = require('../models/usersession.model');
var user = require('../models/user.model')
var mongoose = require('mongoose')


/**
 * Get user sessions of partucular user
 */
exports.getUserTokens = function (req, res) {
  Usersession.aggregate([
    { $match: { $and: [{ userid: mongoose.Types.ObjectId(req.params.id) }] } },
    {
      $lookup: {
        from: user.collection.name,
        pipeline: [{
          $match: {
            status: true
          }
        }],
        as: "user"
      }
    }, {
      $project: {
        'token': 1,
        'user': {
          '$map': {
            'input': '$user',
            'as': 'users',
            'in': {
              'email': '$$users.email',
            }
          }
        }
      }
    }]).exec(function (err, usersessions) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(usersessions);
    })
};
function handleError(res, err) {
  return res.status(500).send(err);
}



