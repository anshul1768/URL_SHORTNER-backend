import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { shortUrl } from "../controllers/shortUrl.controller.js";

const urlRouter=express.Router();

urlRouter.post('/',verifyJWT,shortUrl);

export default urlRouter;
