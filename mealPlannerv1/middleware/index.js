var middleware = {};
var Recipe = require("./../models/recipe.js");

middleware.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

middleware.allFavorites = [];

middleware.collectRecipes = function collectRecipes(req, res, next){
    middleware.allFavorites = [];
    var counter = 0;
    var userFavs = req.user.favRecipes;
        if (userFavs.length > 0){
            userFavs.forEach (function(myId){
                Recipe.findById(myId).exec(function(err, foundRecipe){
                    if(err){
                        //handle error better in future.
                        console.log(err);
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
 }

module.exports = middleware;