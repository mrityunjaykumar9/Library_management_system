const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//collection

const RegisterAdmin = new mongoose.model("RegisterAdmin", AdminSchema);

module.exports  = RegisterAdmin;