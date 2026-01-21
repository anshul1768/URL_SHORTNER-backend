import express from "express";
import router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app=express();
app.use(
  cors({
    origin: "https://frontend-beige-kappa-57.vercel.app/", // ✅ frontend
    credentials: true,              // ✅ cookies allow
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use('/api/user',router);
app.use('/api/create',router)
app.use('/api/redirect',router)
app.get('/',(req,res)=>{
    res.send("welcome")
})

export default app;