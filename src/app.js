import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRouter from "./routes/auth.routes.js";
import urlRouter from "./routes/createUrl.routes.js";
import { verifyJWT } from "./middlewares/auth.middleware.js";
import { redirectUrl } from "./controllers/shortUrl.controller.js";
const app=express();
const allowedOrigins = [
  "https://url-shortner-frontend-beige.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // ✅ Postman / server-to-server requests me origin undefined hota hai
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
// Public redirect
app.get("/:shortUrl", redirectUrl);
app.use('/api/user',authRouter);
app.use('/api/create',urlRouter);
// app.use('/api/redirect',authRouter);

app.get('/',(req,res)=>{
    res.send("welcome")
})

export default app;