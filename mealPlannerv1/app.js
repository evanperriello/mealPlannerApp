//Require modules
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override");
    
//Require the Route files here
var indexRoutes = require("./routes/index");
    
//App CONFIG
    //connect to/create database
mongoose.connect("mongodb://localhost/meal_planner");
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
//Do this later.

//ROUTES CONFIG
app.use(indexRoutes);

//listen to local port and ip, and console log.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("You are on the air.");
});