var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: {},
    steps: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);