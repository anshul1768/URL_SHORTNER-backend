import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        lowecase:true,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"1d"}
);
}
userSchema.methods.isPasswordCorrect=function(password){
    if(this.password===password){
        return true;
    }
    return false;
}

export const User=mongoose.model('User',userSchema);