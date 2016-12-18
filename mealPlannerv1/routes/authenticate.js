var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("./../models/user.js"),
    middleware = require("./../middleware");
    
//JOIN FORM
router.get("/join", function(req, res){
    res.render("join");
});

//JOIN SUBMITTED
router.post("/join", function(req, res){
    //use the register method added to the User model by passport to create user w/ encoded password
    User.register(new User(
            //take username and email from form, store unsalted
            {username: req.body.username, email: req.body.email}
        ), req.body.password, function(err, user){
        if(err){
            //handle error better in future.
            console.log(err);
            res.render("join");
        }
        //authenticate user, using the local strategy from passport.
        passport.authenticate("local")(req, res, function(){
           res.redirect("/home");
        });
    });
});

//LOGIN FORM
router.get("/login", function (req, res){
    res.render("login", {errorMessage: ""});
});

//LOGIN SUBMITTED
router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: "Login failed. Please try again or Join as a new user."
}), function (req, res){
    
});

//LOGOUT Route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});
    
//export the router object to the main app file
module.exports = router;

