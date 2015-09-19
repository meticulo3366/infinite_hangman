'use strict';

// define globals
var express = require('express'),
    io = require('socket.io'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = io.listen(server),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

    /*var v8 = require('v8');
    console.log(v8.getHeapStatistics())*/

// set an UNLIMITED NUMBER OF SOCKETS
http.globalAgent.maxSockets = Infinity



// set up our JSON API for later
require('./routes/api')(app);

//set up the one instance of the hangman game, that everyone connects too
var puzzle = require('./gameLogic/gameLogic.js');
console.log("******** GAME INIT ***********")
console.log(puzzle.getCurrent() );
puzzle.newPuzzle()
console.log(puzzle.getCurrent() );
console.log(puzzle);
console.log("******************************")

// set up our socket server
require('./sockets/base')(io,puzzle);

// start the server
server.listen(3000);

// optional - set socket.io logging level
//io.set('log level', 1000);
//io.set('heartbeat interval', 100);
//io.set('destroy upgrade',false)
io.set('log level', 1);

// view engine setup (for later)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware settings
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));

// for dev
app.use(express.static(__dirname +  '/angular-frontend/app/'));

// for production, do 'grunt --force' and then comment the line above
// and uncomment the line below

//app.use(express.static(__dirname +  '/public'));

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
