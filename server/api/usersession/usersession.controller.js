'use strict';

var Usersession = require('./usersession.model');





// Creates a new usersession in the DB.
exports.create = function(req, res) {
  Usersession.create(req.body, function(err, usersession) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(usersession);
  });
};

