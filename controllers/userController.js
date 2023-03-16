import userModel from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



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
                    const token = jwt.sign({userId:savedData._id,},process.env.jwt_SECRET_KEY,{expiresIn:"5d"});
                    
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
              const data= await  userModel.findOneAndUpdate({email:email},{password:hashed});

              res.status(200).send({"result":"succesfull","userInformation": data})
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




}


export default userController;