import mongoose from "mongoose";


const crudSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,   
    },
    description:{
        type:String,
        required:false,
    },
    price:{
        type:Number,
        required:true,
    }


}

);


const crudModel = new mongoose.model('crudData',crudSchema);

export default crudModel;