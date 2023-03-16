import mongoose from "mongoose";


const connectDb = async (DATABASE_URL)=>{
    try {
        const DB_OPTIONS = {
            dbName:"crudDb",
            family:4,

        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS,);
  
    } catch (error) {
        
    }
}


export default connectDb;