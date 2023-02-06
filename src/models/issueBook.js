const mongoose = require("mongoose");

const issueBook = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    }

})

const IssueBookdata = new mongoose.model("IssueBookdata", issueBook);

module.exports = IssueBookdata;