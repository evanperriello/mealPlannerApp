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
    User.register(new User(
            {username: req.body.username, email: req.body.email}
        ), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("join");
        }
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
router.post("/login", function (req, res){
    User.findOne({"username": req.body.username}, function(err, user){
        if(err){
            //handle error better here in future.
            console.log(err);
            res.render("login", {errorMessage: ""});
        }
        else {
            if (user) {
                console.log(user);
                res.redirect("/home");
            } else {
                var errorMessage = "User " + req.body.username + " was not found. Please try again or join now.";
                res.render("login", 
                {errorMessage: errorMessage}
                );
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