import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDB=async ()=>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB connected");
    }
    catch(err){
        console.log(`Error Occured While Connecting Db : ${err}`);
        process.exit(1);
    }
}

export {connectDB};