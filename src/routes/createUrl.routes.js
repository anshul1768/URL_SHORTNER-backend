import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { shortUrl,deleteUrl,getUrlAnalytics} from "../controllers/shortUrl.controller.js";
import { displayUrl } from "../controllers/displayUrl.js";
const urlRouter=express.Router();

urlRouter.post('/',verifyJWT,shortUrl);
urlRouter.get("/myurls", verifyJWT, displayUrl);
urlRouter.delete("/:id", verifyJWT, deleteUrl);
urlRouter.get("/analytics/:id", verifyJWT, getUrlAnalytics);
export default urlRouter;
