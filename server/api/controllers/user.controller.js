'use strict';

var User = require('../models/user.model');
var userSession = require('../models/usersession.model')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

/**
 * Get list of users
 */
exports.index = function(req, res) {
  User.find({active:true}).skip(Number(req.query.skip)).limit(Number(req.query.limit)).exec((err, result) => {
    if(err) return handleError(res, err); ;
    res.status(200).json(result);
  });
};

/**
 * Creates a new user
 */
exports.create = async function (req, res) {
  req.body.password = await encryptPassword(req.body.password)
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err) return handleError(res, err);
    const token = jwt.sign({ _id: user._id  }, '123-key', { algorithm: "HS256", expiresIn: 60*5 })
    res.status(200).json(user);
  });
};

exports.Login = function (req, res) {
      User.findOne({ email: req.body.email }).exec(async function (err, user) {
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
                      var usersession = await addUserSessions(token,user._id)
                      return res.status(201).json(usersession);
              }
              else {
                  res.status(200).json({ "message": 'Invalid password !!' });
              }
          }
      })
   
}
//add userSessions
function addUserSessions(token,id){
  return new Promise((resolve) => {
  userSession.create({token:token,userid:id}, function(err, usersession) {
    if (err) { reject(new Error(err));;}
    else resolve(usersession);
  });
})
.catch(e => {
  return e.message
  })
  
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

