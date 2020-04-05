const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();
const { User } = require("../db/index");

// Signup route
router.post('/', async (req,res) => {
  try {
    const salt = await bcrypt.genSalt();
    const user = await User.forge({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: await bcrypt.hash(req.body.password, salt)
    }).save();

    res.json({
      message: `User created: ${await user.get("email")}`
    });
  } catch(err) {
    console.log(err);
    res.json({
      message: "User not created"
    });
  }
});

router.get('/login', async (req, res) => {
  res.json({
    message: "Please login to use this app"
  });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/users/login' }),
  (req, res) => {
    res.json({
      message: "Login success",
      user: req.session.passport.user
    });
});

module.exports = router;