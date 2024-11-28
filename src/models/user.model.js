// import { required } from "joi";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String ,
        required : true,
        trim : true
    }
})



export const User = mongoose.model('User' , userSchema)