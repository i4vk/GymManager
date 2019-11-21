var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs')

var indexRouter = require('./routes/index');

var app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'))

app.use(logger('common', {stream: accessLogStream}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var error = new Error("No existe la ruta especificada");
  error.status = 404;
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  if (err.status) {
    res.status(err.status).json({"error":err.message});
  } else {
    res.sendStatus(500);
  }
});

module.exports = app;
