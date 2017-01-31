var middleware = {};
var Recipe = require("./../models/recipe.js");

middleware.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

middleware.allFavorites = [];
//middleware to collect all the recipes the user has favorited
middleware.collectRecipes = function collectRecipes(req, res, next){
    middleware.allFavorites = [];
    var counter = 0;
    var userFavs = req.user.favRecipes;
        if (userFavs.length > 0){
            userFavs.forEach (function(myId){
                Recipe.findById(myId).exec(function(err, foundRecipe){
                    if(err){
                        //handle error better in future.
                        counter++;
                        console.log(err);
                        if (counter === userFavs.length) {
                            next();
                        }
                    } else {
                        counter++;
                        middleware.allFavorites.push(foundRecipe);
                        if (counter === userFavs.length) {
                            next();
                        }
                    }
                }
                );
            });
        } else {
            next();
        }
 };

middleware.checkRecipeOwnership = function(req, res, next){
     if(req.isAuthenticated()){
        Recipe.findById(req.params.id, function(err, foundRecipe){
            if(err){
                console.log("Recipe not found.");
                res.redirect("back");
            } else {
                //does user own the recipe?
                if(foundRecipe.author.id == req.user._id){
                    next();
                } else {
                    console.log("error", "You can only update your own recipes.");
                   res.redirect("back");
                }
               
            }
    });
    } else {
        console.log("You must be logged in to do that");
        res.redirect("back");
    }
};

module.exports = middleware;