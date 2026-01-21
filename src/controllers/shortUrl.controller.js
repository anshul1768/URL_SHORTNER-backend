import { URL } from "../models/url.models.js";
import {nanoid} from "nanoid";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Api-Response.js";
import { ApiError } from "../utils/Api-Error.js";
const shortUrl=async(req,res)=>{
    const {url}=req.body;
    console.log(url);
    const shortUrl=nanoid(7);

    const Url=await URL.create({
        full_url:url,
        short_url:shortUrl,
        createdBy:req.user._id,
    })

    res.status(201).json(new ApiResponse(201,shortUrl,"ShortUrl created successfully"));
}

const redirectUrl=async(req,res)=>{
    const {shortUrl}=req.params;
    console.log(shortUrl);
    const url=await URL.findOneAndUpdate(
        {short_url:shortUrl},
        {$inc:{clicks:1}},//clicks+=1;
        {new:true}//returns the updated doc.
    );

    if(!url){
        throw new ApiError(400,"Url not found");
    }
    res.redirect(url.full_url);
}

export {shortUrl,redirectUrl}