const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    street:{
         type:String,
        required:true
    }
})
const UserSchema = new mongoose.Schema({
    id:{
        type:String,
        unique: true,
        required:true
    },
  
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true
    },
      firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },address:{
        type:[addressSchema],
        required:true
    }
})
const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel