import {login,logout,register} from "./../controller/auth.js";
import express from "express";
const authRoutes=express.Router();
authRoutes.post("/login",login);
authRoutes.post("/register",register);
authRoutes.post("/logout",logout);

export{authRoutes};