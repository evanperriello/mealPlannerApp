var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("./../models/user.js");

//LANDING/ROOT ROUTE
router.get("/", function(req, res){
   res.render("landing"); 
});
//ABOUT PAGE
router.get("/about", function(req, res){
    res.render("about");
});
//JOIN FORM
router.get("/join", function(req, res){
    res.render("join");
});

//JOIN SUBMITTED
router.post("/join", function(req, res){
    //using the User model, create a new user with a username and email
    User.create({username: req.body.username, email: req.body.email}, function(err, user){
        if(err){console.log(err);}
        else {
            console.log("We just saved a user to the database: ");
            console.log(user);
        }
    });
    res.redirect("home");
});

//LOGIN FORM
router.get("/login", function (req, res){
    res.render("login");
});

//LOGIN SUBMITTED
router.post("/login", function (req, res){
    User.findOne({"username": req.body.username}, function(err, user){
        if(err){
            //handle error better here.
            console.log(err);
            res.redirect("/login");
        }
        else {
            if (user) {
                console.log(user);
                res.redirect("/home");
            } else {
                console.log("User " + req.body.username + " was not found. Please try again or register now.");
                res.redirect("/login");
            }
        }
    });
});

//HOME Page after login/join
router.get("/home", function(req, res){
   res.render("home"); 
});

//export the router object to the main app file
module.exports = router;