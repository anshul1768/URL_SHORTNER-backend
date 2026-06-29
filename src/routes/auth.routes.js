import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { redirectUrl, shortUrl } from "../controllers/shortUrl.controller.js";

import getCurrentUser from "../controllers/getCurrentUser.js"
const authRouter=express.Router();

// authRouter.get('/me',verifyJWT,displayUrl);

authRouter.get("/me", verifyJWT, getCurrentUser);
authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser);
authRouter.post('/logout',verifyJWT,logoutUser);
// authRouter.get('/:shortUrl',verifyJWT,redirectUrl)
// authRouter.get('/:shortUrl',redirectUrl);
export default authRouter;