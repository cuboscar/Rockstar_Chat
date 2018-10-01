
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(require('express-session')({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true
// }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  console.log("deserialize:")
  done(null, user);
});
passport.use(
  new SpotifyStrategy(
    {
      clientID: "10041c3cbddf4a62bd667606af6a1bb8",
      clientSecret: "d94ce2bfd35d4b4a98e629fcef97a40a",
      callbackURL: 'http://localhost:3000/auth/spotify/callback'
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      console.log(profile)
      return done(null, profile);

    }
  )
);
var indexRouter = require('./routes/index');
var chatRouter = require('./routes/chat');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');


app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
var authRouter = require('./routes/auth')(app, express, passport);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
