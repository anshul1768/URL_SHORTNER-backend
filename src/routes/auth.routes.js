import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { redirectUrl, shortUrl } from "../controllers/shortUrl.controller.js";
const router=express.Router();

router.get('/me',verifyJWT,(req,res)=>{
    return res.status(200).json({ user: req.user }); 
})
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/',verifyJWT,shortUrl);

router.get('/:shortUrl',verifyJWT,redirectUrl)

export default router;