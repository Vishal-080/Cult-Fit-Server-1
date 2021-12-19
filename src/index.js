const express = require('express');
const app = express();
const passport = require("./configs/passport")
const session = require('express-session');
const cors = require('cors')

//add controllers here
const {register, login} = require("./controllers/authController")
const bookingController = require("./controllers/bookingController");
const centreController = require("./controllers/centreController");
const cityController = require("./controllers/cityController");
const sessionController = require("./controllers/sessionController");
const slotController = require("./controllers/slotController");
const userController = require("./controllers/userController");

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'secretcode',
        resave: true,
        saveUninitialized: true,
    })
)
app.use(passport.initialize());
app.use(passport.session());

app.use("/bookings", bookingController);
app.use("/centres", centreController);
app.use("/cities", cityController);
app.use("/sessions", sessionController);
app.use("/slots", slotController);
app.use("/users", userController);

passport.serializeUser(function({user, token}, done) {
    done(null, {user, token});
});
  
passport.deserializeUser(function({user, token}, done) {
    done(null, {user, token});
});


//---------------google auth----------//

app.get("/auth/google/failure", function(req, res) {
    return res.send("Something went wrong");
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}), function(req, res) {
    res.redirect('http://localhost:3000')
});


//-----------------Normal Login---------------//

app.post("/register", register);
app.post("/login", login);


app.get('/profile',isLoggedIn,(req, res) => {
    res.send(req.user);
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('http://localhost:3000');
}


module.exports = app;