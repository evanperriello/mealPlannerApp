//Require modules
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Recipe = require("./models/recipe.js"),
    User = require("./models/user.js");
    
//Require the Route files here
var indexRoutes = require("./routes/index");
    
//DATABASE CONFIG
    //Connect to database:
mongoose.connect("mongodb://localhost/meal_planner");
    //define function to be called once the database is connected
function dbOpen(){
    var recipeTest = new Recipe({
        name: "Untasty Chicken",
        ingredients: {chicken: 1, salt: 1, pepper: 1, onion: 1},
        steps: "Cook da chicken. Make it bad. Burn it."
    });
    recipeTest.save(function(err, recipeTest) {
        if(err) {return console.error(err);}
        console.log(recipeTest.name + " was saved.");
    });
}
    //Check if it connected, then run the dbOpen function
var db = mongoose.connection;
db.on("error", console.error.bind(console, "There was an error connecting to the database:"));
db.once("open", dbOpen);


//APP CONFIG
    //set up bodyParser so that req.body object is accessible, accepts UTF-8
app.use(bodyParser.urlencoded({extended: true}));
    //serve static files from the ./public folder
app.use(express.static(__dirname + "/public"));
    //set ejs as the engine to build HTML from view templates
app.set("view engine", "ejs");
    //use methodOverride to allow the use of Put, Edit, and other RESTFUL routes
    //remember to add "?_method=" at the end of a url to change the method from POST
app.use(methodOverride("_method"));

//PASSPORT CONFIG
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user){
            if(err){return done(err);}
            if (!user) {return done(null, false);}
            if (!user.verifyPassword(password)) {return done(null, false); }
            return done(null, user);
        });
    }
    ));

//ROUTES CONFIG
app.use(indexRoutes);

//listen to local port and ip, and console log.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("You are on the air.");
});