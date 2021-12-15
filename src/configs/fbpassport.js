const FacebookStrategy = require('passport-facebook').Strategy;
require("dotenv").config()
const jwt = require("jsonwebtoken")
const passport = require("passport");
const User = require("../models/userModel")
const { v4: uuidV4 } = require('uuid');
const {newToken} = require("../controllers/authController")

passport.use(new FacebookStrategy({
  clientID: process.env.APP_ID,
  clientSecret: process.env.APP_SECRET,
  callbackURL: "http://localhost:7765/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'email']
},

async function (accessToken, refreshToken, profile, done) {

    console.log("profile",profile)
    const email = profile?._json?.email;
    const name = profile?._json?.name;
    let user;

    try {

      user = await User.findOne({ email }).lean().exec();

      //------------if user doesnt exist then create the user-------------//
      if (!user) {
        user = await User.create({
          name: name,
          password: uuidV4(),
          email: email
        })
      }
      console.log("user", user)
      const token = newToken(user)
      return done(null, { user, token });
    }

    catch (err) {
      console.log(err)
    }

  }
));

module.exports = passport