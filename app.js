// connect to database for init
require('./db')

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var passport = require('passport')
var session = require('express-session')

var configPassport = require('./app/auth/configPassport')

/** Routers */
var Routers = require('./routes/routers')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(
  {
    secret: 'mu3-server',
    resave: false,
    saveUninitialized: true,
    // enable only when https, which is out of scope in this project
    cookie: { secure: false },
    maxAge: 360 * 5
  }
))
app.use(passport.initialize())
app.use(passport.session())

/** Install Routes */
for (const route of Routers) {
  app.use(route.path, route.route)
}

/** Configure Passport integration must be after express app config */
configPassport(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
