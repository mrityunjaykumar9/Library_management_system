const mongoose = require("mongoose");

const connect_db = async () => {
     try{
        await mongoose.connect("mongodb://localhost:27017/student_api");
     }
     catch(err){
        console.log(err);
     }
}

connect_db();