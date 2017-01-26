var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("./../models/user.js"),
    Recipe = require("./../models/recipe.js"),
    middleware = require("./../middleware");

//RECIPES INDEX ROUTE
router.get("/", function(req, res){
   Recipe.find({}, function(err, allRecipes){
        if (err){
           //handle error better in future
            console.log(err);
        } else {
            res.render("recipes/index", {recipes: allRecipes});
        }
    });
});

//RECIPES NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("recipes/new");
});

//FAVORITE INDEX ROUTE
router.get("/favorite", middleware.isLoggedIn, middleware.collectRecipes, function(req, res){
   res.render("recipes/favorites", {recipes: middleware.allFavorites});
});

//RECIPES SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
       //find the recipe with provided ID
    Recipe.findById(req.params.id).exec(function(err, foundRecipe){
        if (err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("recipes/show", {recipe: foundRecipe});
        }
    });
});

//RECIPES CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
//populate newRecipe object with form values
   var newRecipe = {
      name : req.body.name,
      image : req.body.image,
      description : req.body.description,
      author : {
        id:  req.user._id,
        username: req.user.username
      },
      ingredients : [],
      directions : req.body.directions,
   };
   //loop over all keys with "ing" at the start and add their values to the ingredients array.
   for(var key in req.body) {
       if(/^ing/.test(key)) {
           newRecipe.ingredients.push(req.body[key]);
       }
   }
    
    //Create new recipe from the object and save to db
    Recipe.create(newRecipe, function(err, newlyCreated){
            if (err){
              console.log(err);
        } else {
            //redirect back to recipes page.
            res.redirect("/recipes");
           }
    });

});

//FAVORITE A RECIPE ROUTE
router.post("/favorite", middleware.isLoggedIn, function(req, res){
    User.findOne({username: req.user.username}, function(err, user){
        var recipeId = req.body.recipe_id;
        var placeInArray = user.favRecipes.indexOf(recipeId);
        if(err) {
            console.log(err);
        } else {
           if (placeInArray == -1){
                    user.favRecipes.push(recipeId);
            } else {
                user.favRecipes.splice(placeInArray, 1);
            }
                user.save();
        }
    });
    res.end();
});

//RECIPES EDIT ROUTE
//verify that user owns the recipe before letting them access with middleware in future.
router.get("/:id/edit", function(req, res){
     Recipe.findById(req.params.id, function(err, foundRecipe){
      if(err){
         //handle this with a flash in future
          console.log("Something went wrong. Recipe not found.");
          res.redirect("back");
      } else{
          res.render("recipes/edit", {recipe: foundRecipe});
      }
   });
});

//RECIPES UPDATE ROUTE
//check user owns with middleware in future.
router.put("/:id", function(req, res){
   Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updatedRecipe){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/" + req.params.id);
        }
    });
});

//RECIPES DESTROY ROUTE
//check user owns with middleware in future.
router.delete("/:id", function(req, res){
   Recipe.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/");
       } else {
           res.redirect("/");
       }
   });
});
module.exports = router;