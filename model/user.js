import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,requrired:true,trim:true},
    password:{type:String,required:true,trim:true},
})


const userModel = mongoose.model("crudOp",userSchema);

export default userModel;