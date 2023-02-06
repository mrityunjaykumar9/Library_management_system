const mongoose = require("mongoose");

const Book = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowecase:true
    },
    author:{
        type:String,
        required:true,
        trim:true,
        lowecase:true
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    }

})

const Bookdata = new mongoose.model("Bookdata", Book);

module.exports = Bookdata;