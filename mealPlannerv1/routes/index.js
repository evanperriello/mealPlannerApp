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
//Join PAGE
router.get("/join", function(req, res){
    res.render("join");
});

//Join Logic
router.post("/join", function(req, res){
   res.render("home");
});

//export the router object to the main app file
module.exports = router;