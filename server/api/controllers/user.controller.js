'use strict';

var User = require('../modals/user.model');
var userSession = require('../usersession/usersession.model')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');



/**
 * Get list of users
 */
exports.index = function(req, res) {
  User.find({active:true}).skip(Number(req.query.skip)).limit(Number(req.query.limit)).exec((err, result) => {
    if(err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res) {
  req.body.password = encryptPassword(req.body.password)
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err) return handleError(res, err);
    const token = jwt.sign({ _id: user._id  }, '123-key', { algorithm: "HS256", expiresIn: 60*5 })
    res.json({ token: token });
  });
};

exports.Login = function (req, res) {
  try {
      User.findOne({ email: req.body.email }).exec(function (err, user) {
        if (err) { return handleError(res, err);}
          if (!user) {
              res.status(404).json({ "message": 'Account does not exist !!' });
          } else {
                if (user && bcrypt.compareSync(req.body.password, user.password)) {
                  let userdat = {
                      _id: user._id,                    
                      email: user.email
                  }
                  if(req.body.role)  userdat.role = user.role
                      const token = jwt.sign({ _id: user._id  }, '123-key', { algorithm: "HS256", expiresIn: 60*5 })
                      userSession.create({token:token}, function(err, usersession) {
                        if (err) { return handleError(res, err);}
                        return res.status(201).json(usersession);
                      });
              }
              else {
                  res.status(200).json({ "message": 'Invalid password !!' });
              }
          }
      })
  } catch{
      res.status(400).send({ "message": "Something went wrong !!" })
  }
}
// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
};
/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};
function encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
}
function handleError(res, err) {
  return res.status(500).send(err);
}

