const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();
const port = process.env.PORT || 3000;
const usersRouter = require('./routes/users');

const { User } = require("./db/index");

require('dotenv').config()

passport.serializeUser(async (user, done) => {
  done(null, await user.get("id"));
});

passport.deserializeUser(async (id, done) => {
  try {
    done(null, await new User({id}).fetch());
  } catch (err) {
    done(null, await new User({id}).fetch());
  }
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  (email, password, done) => {
    new User({email}).fetch().then(async (user)=>{
      if (!user) return done(null, false);
      if (await !user.checkPassword(password)) return done(null, false);
      return done(null, user);
    })
    .catch(err => {
      done(err)
    });
  }
));

// serve the homepage from here
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// handle api calls from here
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}!`);
});