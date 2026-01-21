import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/db/configdb.js";

dotenv.config({
    path:'./.env'
})




const port=process.env.PORT||3000;
app.listen(port,async()=>{
    try {
        await connectDB();
        console.log(`Server is listening on port ${port}`)
    } catch (error) {
        console.log(error)
    }
})