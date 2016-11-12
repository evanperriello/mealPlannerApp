var express = require("express"),
    router = express.Router();

//LANDING/ROOT ROUTE
router.get("/", function(req, res){
   res.render("landing"); 
});

//export the router object to the main app file
module.exports = router;