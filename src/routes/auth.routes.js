import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { redirectUrl, shortUrl } from "../controllers/shortUrl.controller.js";
import { displayUrl } from "../controllers/displayUrl.js";
const authRouter=express.Router();

authRouter.get('/me',verifyJWT,displayUrl);
authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser);
authRouter.get('/:shortUrl',verifyJWT,redirectUrl)

export default authRouter;