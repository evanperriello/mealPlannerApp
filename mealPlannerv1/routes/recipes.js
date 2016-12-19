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

//RECIPES SHOW ROUTE
router.get("/:id", function(req, res){
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
      ingredients : req.body.ingredients,
      directions : req.body.directions,
   };
    
    //Create new recipe from the object and save to db
    Recipe.create(newRecipe, function(err, newlyCreated){
            if (err){
              console.log(err);
        } else {
            //redirect back to recipes page.
            res.redirect("/");
           }
    });

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
          res.render("recipes/edit", {campground: foundRecipe});
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