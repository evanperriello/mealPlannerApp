var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema({
    name : String,
    image : String,
    description : String,
    author : {
        id:  String,
        username: String
    },
    ingredients : [],
    directions : []
    
});

module.exports = mongoose.model("Recipe", recipeSchema);