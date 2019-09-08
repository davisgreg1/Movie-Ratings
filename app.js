var express = require("express");
var path = require("path");
const jwt = require('jsonwebtoken');
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const config = require('./config');
require('dotenv').config();


//not using index at this time.
var index = require("./routes/index");
var users = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  store: new(require('connect-pg-simple')(session))(),
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }, // 30 days
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "client/public/index.html")));

app.use("/", index);
app.use("/users", users);

//this takes all my front end routes

// app.get("*", (req, res) => {
//   res.sendFile(__dirname + "/client/public/index.html");
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req
    .app
    .get("env") === "development"
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

