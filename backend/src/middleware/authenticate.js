import jwt from "jsonwebtoken";
async function authenticate(req,res,next)
{
    try{
        const {token}=req.cookies;
        if(!token)
        {
            return res.status(401).json({message:"unauthorised"});
        }
        const check=jwt.verify(token,process.env.SECRET_KEY);
        req.user=check;
        return next();
    }
    catch(err)
     {
        console.log(`Authentication Error ${err}`);
        return res.status(401).json({message:"Invalid Token"});
     }
}

export {authenticate};