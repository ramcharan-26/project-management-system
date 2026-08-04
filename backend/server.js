import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT=process.env.PORT||5000;

const app=express();
app.use(cookieParser());
app.use(express.json());
await  connectDB();
app.listen(PORT,()=>{
   console.log(`server running on ${PORT}`);
});