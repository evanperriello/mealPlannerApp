//Require modules
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    expressSession = require("express-session"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride = require("method-override"),
    Recipe = require("./models/recipe.js"),
    User = require("./models/user.js");
    
//Require the Route files here
var indexRoutes = require("./routes/index"),
    authenticateRoutes = require("./routes/authenticate"),
    recipeRoutes = require("./routes/recipes");
    
//DATABASE CONFIG
    //Connect to database:
var databaseUrl = process.env.DATABASEURL || "mongodb://localhost/meal_planner";
mongoose.connect(databaseUrl);
//added comment
    //define function to be called once the database is connected
function dbOpen(){
    console.log("Database open.");
}
    //Check if it connected, then run the dbOpen function
var db = mongoose.connection;
db.on("error", console.error.bind(console, "There was an error connecting to the database:"));
db.once("open", dbOpen);


//APP CONFIG
    //set up bodyParser so that req.body object is accessible, accepts UTF-8
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
    //serve static files from the ./public folder
app.use(express.static(__dirname + "/public"));
    //set ejs as the engine to build HTML from view templates
app.set("view engine", "ejs");
    //use methodOverride to allow the use of Put, Edit, and other RESTFUL routes
    //remember to add "?_method=" at the end of a url to change the method from POST
app.use(methodOverride("_method"));
app.use(flash());

//SESSION CONFIG
var secretPhrase = process.env.SESSIONSECRET || "I am the very model of the modern major general.";
app.use(expressSession({
    secret: secretPhrase,
    resave: false,
    saveUninitialized: false
}));

//PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//RES.LOCALS config
app.use(function(req, res, next){
   res.locals.currentUser  = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


//ROUTES CONFIG
app.use(indexRoutes);
app.use(authenticateRoutes);
app.use("/recipes", recipeRoutes);

//listen to local port and ip, and console log.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("You are on the air.");
});