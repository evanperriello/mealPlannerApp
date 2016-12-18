var express = require("express"),
    router = express.Router(),
    middleware = require("./../middleware");

//LANDING/ROOT ROUTE
router.get("/", function(req, res){
   res.render("landing"); 
});

//ABOUT PAGE
router.get("/about", function(req, res){
    res.render("about");
});

//HOME Page after
router.get("/home", middleware.isLoggedIn, function(req, res){
   res.render("home");
});

//export the router object to the main app file
module.exports = router;