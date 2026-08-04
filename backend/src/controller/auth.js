import {User} from "../model/UserDb.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function register(req,res)
{
    try{
         const {name,email,password}=req.body;
         if((!email)||(!password))
            return res.status(400).send("Enter Valid Credentials");
         const user=await User.findOne({email});
         if(user)
         return res.status(409).send("Email is Not Available");
        const hashedPassword=await bcrypt.hash(password,10);
         await User.create({name,email,password:hashedPassword});
         return res.status(201).send("Registered Successfully");
    }
    catch(err){
      console.log(`Error Occured at Registration : ${err}`);
      return res.status(500).send("server Issue");
    }
}

async function login(req,res)
{
    try{
           const {email,password}=req.body;
           if((!email)||(!password))
           return res.status(400).send("Enter Valid Credentials");
           const user=await User.findOne({email});
           if((!user))
            return res.status(401).send("Invalid Credentials");
           const isValid=await bcrypt.compare(password,user.password);
           if((!isValid))
           return res.status(400).send('Incorrect Password');
           const token=jwt.sign(
            {
                id:user._id,
                email:user.email
            },
            process.env.SECRET_KEY,
            {
                expiresIn:"1h"
            }
           );
           res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge: 1000 * 60 * 60
           });
           return res.status(200).send("Login Successful");
    }
    catch(err){
        console.log(`An Error Occured At Login : ${err}`);
        return res.status(500).send("Server Issue");
    }
}

export {register,login};