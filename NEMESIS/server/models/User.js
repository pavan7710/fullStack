const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String
    },

    phonenumber : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true 
    },
    password : {
        type : String,
        required : true
    },

    adress : {
        type : String
    }
    
})

module.exports = mongoose.model("User" , UserSchema)