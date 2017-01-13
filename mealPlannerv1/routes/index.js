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

//HOME Page after login
router.get("/home", middleware.isLoggedIn, function(req, res){
    //Get today's date and put it into moment.js format (easier to do this one time than make moment a dependency) 
    var todaysDate = new Date();
    var dateString = todaysDate.getFullYear() + "-" + todaysDate.getMonth() + 1 + "-" + todaysDate.getDate();
    //Define default URL in case user has no recipe of the day
    var defaultUrl = req.protocol + '://' + req.get('host') + "/month";
    //Define function to find the recipe set to today's date.
    function filterRecsByDate(obj){
        return obj.start === dateString;
    }
    //Find the logged in user.
    User.findById(req.user.id, function(err, user) {
         if (err){
             console.log(err);
         } else {
             //find the recipe assigned to this date and pass it to the home template.
            var todaysRecipe = user.monthlyMeals.filter(filterRecsByDate);
            res.render("home", {todaysRecipe: todaysRecipe, defaultURL: defaultUrl});  
         }
 });
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
        //handle error better in future
        if (err) {console.log(err)} else {
        //set their monthlyMeals attribute equal to the submitted data
        user.monthlyMeals = req.body;
        //save the db entry
        user.save();
        res.render("month", {recipes: middleware.allFavorites, events: user.monthlyMeals});
    }});
});

//export the router object to the main app file
module.exports = router;