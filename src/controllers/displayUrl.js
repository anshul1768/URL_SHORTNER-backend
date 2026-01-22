import { URL } from "../models/url.models.js";
import { ApiError } from "../utils/Api-Error.js";
import { ApiResponse } from "../utils/Api-Response.js";
const displayUrl=async(req,res)=>{
    try {
        const urls=await URL.find({createdBy:req.user._id}).sort({createdAt:-1});
        if(urls.length===0){
            res.status(200).json(new ApiResponse(200,urls,"no urls created by user"));
        }
        res.status(200).json(new ApiResponse(200,urls,"urls fetched successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Server error"));
    }

}
export {displayUrl}