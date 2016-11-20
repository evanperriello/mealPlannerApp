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
    //logic to add new user to the database
   res.render("home");
});

//export the router object to the main app file
module.exports = router;