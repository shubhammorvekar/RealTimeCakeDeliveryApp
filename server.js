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
const passport = require("passport");
const Emitter = require("events");
//DataBase connection
const url = "mongodb://localhost:27017/cakeDB"
mongoose.connect(url, {useNewUrlParser: true})
mongoose.connection.once("open",()=>{
    console.log("database connected succesfully")
})
// Event Emitter
const eventEmitter = new Emitter()
app.set("eventEmitter",eventEmitter)

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
//passport configg
const passwordInit = require("./app/config/passport");
passwordInit(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
//assets
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));
//setting ejs templates
app.use(ejsLayouts);
app.set('views', path.join(__dirname, "/resources/views"));
app.set("view engine","ejs");
//global middlewares
app.use((req,res,next)=>{
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

//routes
require("./routes/web")(app);

// set server 
const server = app.listen(port, () => {
    console.log(`server is running on ${port}`);
});

//
const io = require("socket.io")(server)
io.on("connection",(socket)=>{
    socket.on("join",(roomIdCreate) => {
        socket.join(roomIdCreate)
    })
})

eventEmitter.on("orderUpdated",(data)=>{
    io.to(`order_${data.id}`).emit("orderUpdated",data)
})

eventEmitter.on("orderPlaced",(data)=>{
    io.to("adminRoom").emit("orderPlaced",data)    
})