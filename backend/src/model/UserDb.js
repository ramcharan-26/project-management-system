import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
       type:String,
       unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        default:"User"
    },
},
{
    timestamps:true
});

const User=mongoose.model("User",UserSchema);

export {User};