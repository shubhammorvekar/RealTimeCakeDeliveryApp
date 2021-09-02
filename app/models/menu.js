const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
});

const Menu = mongoose.model("menu",menuSchema);

module.exports = Menu