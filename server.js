// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080; // what is a port
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
var passport = require('passport'); //used for authentication
var flash    = require('connect-flash');

var morgan       = require('morgan'); // logger logs everything that is happening n the server
var cookieParser = require('cookie-parser');//remembers who you are
var bodyParser   = require('body-parser');
var session      = require('express-session');
//ADDED OBJECT ID AND REQUIRE
var ObjectId = require('mongodb').ObjectID;
// var multer = require('multer');
var configDB = require('./config/database.js');

var db

// configuration ===============================================================
mongoose.connect(configDB.url, { useNewUrlParser: true },(err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db, ObjectId); //is a file made to hold the api , spits out a function
}); // connect to our database


require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2019a', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
//require('./app/routes.js')(app, passport, db); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
