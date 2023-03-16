import Jwt  from "jsonwebtoken";
import userModel from "../model/user.js";

var checkUserAuth = async(req,res,next)=>{
    // let token;
    const {auth} = req.headers;

   try {
    if(auth){
        const isVerified =  Jwt.verify(auth,process.env.jwt_SECRET_KEY);
 
        if(isVerified.iat.toFixed){
    
            next();
        }
    }

   else{
        res.status(403).send({"result":"unsuccessfull","message":"no token found"})
    }
   } catch (error) {
    res.status(403).send({"result":"unsuccessfull","message":"invalid token"})
   }
}

export default checkUserAuth;   