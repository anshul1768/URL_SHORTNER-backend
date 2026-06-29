import { URL } from "../models/url.models.js";
import {nanoid} from "nanoid";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Api-Response.js";
import { ApiError } from "../utils/Api-Error.js";
const shortUrl = async (req, res) => {
  let { url } = req.body;

  // Backend validation
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const short = nanoid(7);

  const Url = await URL.create({
    full_url: url,
    short_url: short,
    createdBy: req.user._id,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        shortUrl: short,
      },
      "Short URL created successfully"
    )
  );
};

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
const deleteUrl = async (req, res) => {
  try {
    const deleted = await URL.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!deleted) {
      throw new ApiError(404, "URL not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "URL deleted successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Server Error"));
  }
};

const getUrlAnalytics = async (req, res) => {
  try {
    const url = await URL.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!url) {
      throw new ApiError(404, "URL not found");
    }

    return res.status(200).json(
      new ApiResponse(200, url, "Analytics fetched successfully")
    );
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Server Error"));
  }
};
export {shortUrl,redirectUrl,deleteUrl,getUrlAnalytics};