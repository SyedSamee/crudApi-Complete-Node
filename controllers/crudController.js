import mongoose from "mongoose";
import crudModel from "../model/crud.js";
import userModel from "../model/user.js";


class crudController{
    static addItem = async(req,res)=>{
        const {name,description,price} = req.body;

        if(name&&price){
          try {
            const postedData =  await crudModel({
                name:name,
                description: description,
                price:price,
            });

            const saveData= await postedData.save();
            res.status(201).send({"result":"successfull","message":saveData})
          } catch (error) {
            res.status(403).send({"result":"unsuccessfull","message":"something went wrong"})
          }
        }else{
            // one of the field is empty
            res.status(403).send({"result":"unsuccessfull","message":"one of the field or both field is empty"})
        }


    };

    static get_all_item = async(req,res)=>{
         const data= await crudModel.find();
         if(data){
          res.status(200).send({"response":"successfull","result":data})
         }
    }

  static updateField = async(req,res)=>{
    const {name,description,price,id} = req.body;

   try {
    if(id){
      if(name||description || price){
        if(name){
          const updatedData =  await crudModel.findByIdAndUpdate(id,{name:name});
          const letestData = await crudModel.findById(id);
          if(updatedData){
            res.status(200).send({"result":"successfull","message":letestData})
          }else{
            // id does'nt exist
            res.status(403).send({"result":"unsuccessfull","message":"id does'nt exitst"})
          }
  
        }
        if(description){
          const updatedData =  await crudModel.findByIdAndUpdate(id,{description:description});
          const letestData = await crudModel.findById(id);
          if(updatedData){
            res.status(200).send({"result":"successfull","message":letestData})
          }else{
            // id does'nt exist
            res.status(403).send({"result":"unsuccessfull","message":"id does'nt exitst"})
          }
        }
        if(price){
          const updatedData =  await crudModel.findByIdAndUpdate(id,{price:price});
          const letestData = await crudModel.findById(id);
          if(updatedData){
            res.status(200).send({"result":"successfull","message":letestData})
          }else{
            // id does'nt exist
            res.status(403).send({"result":"unsuccessfull","message":"id does'nt exitst"})
          }
        }
      }else{
        res.status(403).send({"result":"unsuccessfull","message":"fields empty"})
      }
     }else{
      res.status(403).send({"result":"unsuccessfull","message":"id cannot be null"})
     }
   } catch (error) {
    res.status(403).send({"result":"unsuccessfull","message":"id doesn't exist"})
   }
  }

  static updateAllField =async(req,res)=>{
    const {name,description,price,id} = req.body;

try {
  if(id){
    if(name&&description&&price){
      // update all 
    const data =  await  crudModel.findByIdAndUpdate(id,{
        name:name,
        description:description,
        price:price
      });
      const letestData = await crudModel.findById(id);
      res.status(200).send({"result":"successfull","message":letestData})
    }else if (name&&price&& description === undefined|| description.length <1){
      // update 2 exclude des
      const data =  await  crudModel.findByIdAndUpdate(id,{
        name:name,
        price:price
      })

      const letestData = await crudModel.findById(id);
        
      res.status(200).send({"result":"successfull","message":letestData})
      
  
      
    }else{

      res.status(403).send({"result":"unsuccessfull","message":"one of or all requried field empty"})
    }
   }else{
    
    res.status(403).send({"result":"unsuccessfull","message":"id cannot be null"})
   }
} catch (error) {

  res.status(403).send({"result":"unsuccessfull","message":"id does'nt exist"})
}


  }

  
  static deleteItem = async(req,res)=>{
    const {id}= req.body;
    if(id){
    try {
      const data = await crudModel.deleteOne({_id:id});
  
      if(data.deletedCount > 0){
        res.status(200).send({"result":"successfull","message":"Item Deleted"})
      }else{
        res.status(403).send({"result":"unsuccessfull","message":"Already Deleted"})
      }
    } catch (error) {
      // id does'nt exist
      res.status(403).send({"result":"unsuccessfull","message":"id doesn't exist"})
    }
    }else{
      // id is null
      res.status(403).send({"result":"unsuccessfull","message":"id cannot be null"})

    }


  }

}

export default crudController;