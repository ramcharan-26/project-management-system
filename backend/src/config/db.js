import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB connected");
    }
    catch(err){
        console.log(`Error Occured While Connecting Db : ${err}`);
    }
}

export {connectDB};