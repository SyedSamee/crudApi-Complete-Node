import userModel from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { response } from "express";



class userController{
    static userRegister = async(req,res)=>{
        const {name,email,password,password_confirmation,}= req.body
        const user =await userModel.findOne({email:email});
   
        if(user){

            res.status(403).send("already email there");

        }else if (name&& email && password && password_confirmation ){
            if(password === password_confirmation){
     
                try {
                    const salt = 10;
                    bcrypt.hash(password,salt,async(err,hash)=>{
                

                      //saving the data 
                      
                     const data = userModel({
                        name:name,
                        email:email,
                        password:hash,
     
                      });
                     const savedData =  await data.save();
                    const token = jwt.sign({userId:savedData._id,},process.env.jwt_SECRET_KEY);
                    
                    res.status(201).send({"status":"success","message":"Registered successfully","userInormation": {
                        "name":savedData.name,
                        "email":savedData.email,
                        "token":token,

                    },});
                  
                    
                    });
                   
                } catch (error) {
                    
                }
            }else{
                res.status(403).send("password did'nt match");
       
            }

        }else{
            +
            res.status(403).send({"result":"unsuccessfull", "message": "one of the field is empty"})
        }

       
}

static userLogin=async(req,res)=>{
    const {email,password} = req.body;
    if(email){
        try {
            const user = await userModel.findOne({email:email});
            if(user){
                const isMatched =await bcrypt.compare(password,user.password);
               if(isMatched){
                //gen a jwt token

                const token = jwt.sign({userId:user._id,},process.env.jwt_SECRET_KEY);
                res.status(200).send({"result":"successfull", "message": "user login","User Information": {
                    "name":user.name,
                    "email":user.email,
                    "token": token
                },})
               }else{
                res.status(403).send({"result":"unsuccessfull", "message": "user or password is wrong"})
               }
            }else{
                res.status(403).send({"result":"unsuccessfull", "message": "user is not registered"})
            }
        } catch (error) {
            
        }
    }
}


static userChangePassword = async(req,res)=>{
    const {email, password,newPassword}= req.body;
    if(email&&password&&newPassword){
       const data = await userModel.findOne({email:email});
        
       //checkingPasswordHashed
       const isMatched =await bcrypt.compare(password,data.password);

       if(isMatched){
        const salt = 10;
        // change password now
        bcrypt.hash(newPassword,salt,async(err,hashed)=>{
            if(err)res.status(403).send("try again later");
            if(hashed){
              const data= await  userModel.findOneAndUpdate({email:email},{password:hashed}).select("-password");
            const token = jwt.sign({userId:data._id},process.env.jwt_SECRET_KEY)
              res.status(200).send({"result":"succesfull","userInformation": {
                "name":data.name,
                "email":data.email,
                "_id":data._id,
                "token":token
              }})
            }
        });
       }else{
        //wrong password
        res.status(403).send({"result":"unsuccesfull","message": "Wrong password"})


       }

    }else{
        res.status(403).send({"result":"unsuccesfull","message": "one of the field is empty"})
        // one of the field or both field empty
    }
}

static sendResetPasswordMail = async(req,res)=>{
    const {email} = req.body;

    try {
        if(email.length > 1){
      
            const response = await userModel.findOne({email});
           if(response){
          const  secret  = response._id + process.env.jwt_SECRET_KEY;
            const token = jwt.sign({userId:response._id},secret);

            console.log(response._id),
            console.log(token)

           }else{
            res.status(403).send({"result":"unsuccesfull","message": "user not found"})
           }
        }else{
            res.status(403).send({"result":"unsuccesfull","message": "email is empty or not right"})
        }
    } catch (error) {
       
        res.status(403).send({"result":"unsuccesfull","message": "field cannot be empty"})
    }

}



static  changePasswordThrough_mail =  async(req,res)=>{
    const {id,authToken} = req.params;
    const {password,conPassword} = req.body;
   
   

   

     try {
        const response =  await userModel.findById(id)
        const  secret  = response._id + process.env.jwt_SECRET_KEY;
        const verify = jwt.verify(authToken,secret);

        if(password && conPassword && password === conPassword){
      
                       
            try {
        
               
                const data = await userModel.findById(id);
                if(data){
    
                  
                    const salt = 10;
                     bcrypt.hash(password,salt,async(err,hashed)=>{
                        const response =  await userModel.findByIdAndUpdate(id,{password:hashed});
                     


                            res.status(400).send({"result":"successfull","response":"Password Changed Succesfully"});
    
                   
                    });
    
                    
                 
                
                }else{
                    //wrong id
                    console.log("wrong id")
                    res.status(400).send({"result":"unsuccessfull","response":"wrong id"});
                    
                }
        
            } catch (error) {
                console.log(error)
            }
        }else{
           
            res.status(400).send({"result":"unsuccessfull","response":"field empty or password doesnt match"});
        }
     } catch (error) {
        res.status(400).send({"result":"unsuccessfull","response":"invalid token or invalid id"});
     }
    
    
                       
  
  
    
   

  
}







}


export default userController;