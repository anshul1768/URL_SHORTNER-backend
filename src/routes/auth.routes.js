import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { redirectUrl, shortUrl } from "../controllers/shortUrl.controller.js";
const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/',verifyJWT,shortUrl);

router.get('/:shortUrl',verifyJWT,redirectUrl)

export default router;