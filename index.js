// // ! REQUIRING MODULES
// let express = require('express'),
//   mongoose = require('mongoose'),
//   methodOverride = require('method-override'),
//   path = require('path'),
//   session = require('express-session'),
//   passport = require('passport'),
//   localStrategy = require('passport-local'),
//   moment = require('moment'),
//   flash = require('connect-flash');
// let app = express();
// require('dotenv').config();

// // ! DATABASE SETUP
// let DB_URL = process.env.MONGODB_URI; // MongoDB URI from .env file

// mongoose
//   .connect(DB_URL)
//   .then(function () {
//     console.log('Connected to MongoDB');
//   })
//   .catch(function (err) {
//     console.log('Error connecting to MongoDB:', err);
//   });

// // ! SESSION SETUP
// let sessionSecret = process.env.SESSION_SECRET; // Get session secret from .env file
// if (!sessionSecret) {
//   console.error('SESSION_SECRET is not defined in the .env file');
//   process.exit(1); // Exit the process if SESSION_SECRET is not set
// }

// app.use(
//   session({
//     secret: sessionSecret, // Use the secret from .env
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//       expires: Date.now() + 1000 * 60 * 60 * 24,
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );

// // ! DATABASE MODELS
// let User = require('./models/user-DB');

// // ! PASSPORT CONFIGURATION
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // ! SERVER SETUP AND MIDDLEWARES
// app.use(express.static(path.join(__dirname, 'public'))); // static resources
// app.set('view engine', 'ejs'); // ejs extension
// app.use(express.urlencoded({ extended: true })); // body parsing
// app.use(express.static('public'));

// app.use(methodOverride('_method')); // patch/delete requests
// app.use(flash()); // alerts
// app.use(function (req, res, next) {
//   res.locals.currentUser = req.user;
//   res.locals.moment = moment;
//   res.locals.error = req.flash('error');
//   res.locals.success = req.flash('success');
//   next();
// });

// // ! ROUTING LOGIC
// let jobRoutes = require('./routes/jobs.js');
// let notifRoutes = require('./routes/notifications');
// let authRoutes = require('./routes/auth');
// let userRoutes = require('./routes/user');
// let questionRoutes = require('./routes/questions');
// app.use(jobRoutes);
// app.use(notifRoutes);
// app.use(authRoutes);
// app.use(userRoutes);
// app.use(questionRoutes);

// // ! PORT SETUP
// let port = process.env.PORT || 8000;
// app.listen(port, function () {
//   console.log('Server started on port ' + port);
// });
let express = require('express'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override'),
  path = require('path'),
  session = require('express-session'),
  passport = require('passport'),
  localStrategy = require('passport-local'),
  moment = require('moment'),
  flash = require('connect-flash');
let app = express();
require('dotenv').config();

// DATABASE SETUP
let DB_URL = process.env.MONGODB_URI; // MongoDB URI from .env file
mongoose.connect(DB_URL)
  .then(function () {
    console.log('Connected to MongoDB');
  })
  .catch(function (err) {
    console.log('Error connecting to MongoDB:', err);
  });

// SESSION SETUP
let sessionSecret = process.env.SESSION_SECRET; // Get session secret from .env file
if (!sessionSecret) {
  console.error('SESSION_SECRET is not defined in the .env file');
  process.exit(1); // Exit the process if SESSION_SECRET is not set
}

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// PASSPORT CONFIGURATION
let User = require('./models/user-DB');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SERVER SETUP AND MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(methodOverride('_method'));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.moment = moment;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// ROUTING LOGIC
let jobRoutes = require('./routes/jobs.js');
let notifRoutes = require('./routes/notifications');
let authRoutes = require('./routes/auth');
let userRoutes = require('./routes/user');
let questionRoutes = require('./routes/questions');
app.use(jobRoutes);
app.use(notifRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(questionRoutes);

// PORT SETUP
let port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log('Server started on port ' + port);
});
