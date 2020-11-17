'use strict';

var User = require('./user.model');
var jwt = require('jsonwebtoken');
var crypto = require("crypto");

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 */
exports.index = function(req, res) {
  User.find({}).skip(Number(req.query.skip)).limit(Number(req.query.limit)).exec((err, result) => {
    if(err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  req.body.password = encryptPassword(req.body.password)
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    // var token = jwt.sign({_id: user._id }, { expiresInMinutes: 60*5 });
    const token = jwt.sign({ _id: user._id  }, '123-key', { algorithm: "HS256", expiresIn: 60*5 })
    res.json({ token: token });
  });
};

exports.Login = function (req, res) {
  console.log(req.body)
  try {
      User.findOne({ email: req.body.email }).exec(function (err, user) {
          if (err) throw new Error()
          if (!user) {
              res.status(200).json({ "message": 'Account does not exist !!' });
          } else {
            console.log(encryptPassword(req.body.password),"????",user.password)
              if (user.password == encryptPassword(req.body.password)) {
                  let userdat = {
                      _id: user._id,                    
                      email: user.email
                  }
                  if(req.body.role)  userdat.role = user.role
                  // User.findOneAndUpdate({ "email": req.body.email }, { "$set": { "lastLogin": Date.now(), "IP": req.connection.remoteAddress } }).exec(function (err, result) {
                      if (err) throw new Error()
                      const token = jwt.sign({ _id: user._id  }, '123-key', { algorithm: "HS256", expiresIn: 60*5 })
                      res.status(201).json({ user: userdat, token: token })
                  // })         
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
  var cipher = crypto.createCipher('aes-256-cbc', 'onlineuser');
    return cipher.update(password, 'utf8', 'hex') + cipher.final('hex');

}




