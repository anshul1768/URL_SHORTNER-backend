import mongoose from "mongoose";

const urlSchema=new mongoose.Schema({
    full_url:{
        type:String,
        required:true,
    },
    short_url:{
        type:String,
        required:true,
        index:true,
    },
    clicks:{
        type:Number,
        default:0
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
    }
},{timestamps:true})

export const URL=mongoose.model("Url",urlSchema);

