var express = require("express"),
    router = express.Router();

//LANDING/ROOT ROUTE
router.get("/", function(req, res){
   res.render("landing"); 
});
//ABOUT PAGE
router.get("/about", function(req, res){
    res.render("about");
});
//Join FORM
router.get("/join", function(req, res){
    res.render("join");
});

//Join SUBMITTED
router.post("/join", function(req, res){
    //include logic here to add new user to the database
   res.redirect("home");
});

//Login FORM
router.get("/login", function (req, res){
    res.render("login");
});

//Login FORM
router.post("/login", function (req, res){
    //include logic here to verify the login credentials
    res.redirect("home");
});

//Home Page after login/join
router.get("/home", function(req, res){
   res.render("home"); 
});

//export the router object to the main app file
module.exports = router;