import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import {authRoutes} from "./src/routes/authRoutes.js";
import {projectRoutes} from "./src/routes/projectRoutes.js";
import { taskRouter } from "./src/routes/taskRoutes.js";

dotenv.config();

const PORT=process.env.PORT||5000;

const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth",authRoutes);
app.use("/project",projectRoutes);
app.use("/api",taskRouter);
try{
    await  connectDB();
    app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
    });
}
catch(err)
{
    console.log(`Error while initialising server : ${err}`);
    process.exit(1);
}