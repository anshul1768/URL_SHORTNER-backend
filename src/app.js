import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRouter from "./routes/auth.routes.js";
import urlRouter from "./routes/createUrl.routes.js";
const app=express();
app.use(
  cors({
    origin: "https://frontend-beige-kappa-57.vercel.app", // ✅ frontend
    credentials: true,              // ✅ cookies allow
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use('/api/user',authRouter);
app.use('/api/create',urlRouter);
app.use('/api/redirect',authRouter);
app.get('/',(req,res)=>{
    res.send("welcome")
})

export default app;