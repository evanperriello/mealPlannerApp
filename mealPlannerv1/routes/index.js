var express = require("express"),
    router = express.Router(),
    middleware = require("./../middleware"),
    User = require("./../models/user.js");
    

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
//MONTH Page
router.get("/month", middleware.isLoggedIn, middleware.collectRecipes, function(req, res){
    User.findById(req.user.id, function(err, user){
        if (err){
            console.log(err);
        } else {
            res.render("month", {recipes: middleware.allFavorites, events: req.user.monthlyMeals});   
        }
});
});
//MONTH POST REQUEST for saving monthly recipes
router.post("/month", middleware.isLoggedIn, middleware.collectRecipes, function(req, res){
    //find the user by the logged in id
    User.findById(req.user.id, function(err, user){
        //set their monthlyMeals attribute equal to the submitted data
        user.monthlyMeals = req.body;
        //save the db entry
        user.save();
        res.render("month", {recipes: middleware.allFavorites, events: user.monthlyMeals});
    });
    //FINISH THIS UP NEXT IN FUTURE!
});

//export the router object to the main app file
module.exports = router;