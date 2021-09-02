require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const ejsLayouts = require("express-ejs-layouts");
const path = require("path");
const port =process.env.PORT||3000;
const mongoose = require("mongoose");
const session = require('express-session');
const flash = require("express-flash");
const MongoStore = require('connect-mongo');
const { Cookie } = require("express-session");

//DataBase connection
const url = "mongodb://localhost:27017/cakeDB"
mongoose.connect(url, {useNewUrlParser: true})
mongoose.connection.once("open",()=>{
    console.log("database connected succesfully")
})

//session configuration
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
    mongoUrl: url
    }),
    // cookie:{maxAge:1000*15}
    
}))

app.use(flash());

app.use(express.json());
app.use(express.static("public"));
//setting ejs templates
app.use(ejsLayouts);
app.set('views', path.join(__dirname, "/resources/views"));
app.set("view engine","ejs");
//global middlewares
app.use((req,res,next)=>{
    res.locals.session = req.session;
    next();
});

//rotes
require("./routes/web")(app);

// set server 
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});