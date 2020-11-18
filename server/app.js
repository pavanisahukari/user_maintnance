
'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/development');
var bodyParser = require('body-parser');

// Connect to database
mongoose.connect(config.mongo.uri, { useNewUrlParser: true ,  useCreateIndex: true,
    useUnifiedTopology:true});
mongoose.connection.once('open', function(){
  console.log('Conection has been made!');
}).on('error', function(error){
    console.log('Error is: ', error);
});

// Setup server
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var server = require('http').createServer(app);
app.use('/api/users', require('./api/routes/userindex'));
// app.use('/api/usersessions', require('./api/usersession'));
// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

