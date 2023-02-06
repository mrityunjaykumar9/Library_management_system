const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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

const Register = new mongoose.model("Register", studentSchema);

module.exports  = Register;