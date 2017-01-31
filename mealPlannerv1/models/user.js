var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
    
var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    favRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    monthlyMeals :[]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);