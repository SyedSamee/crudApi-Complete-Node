import dotEnv from "dotEnv";
import express from "express";
import connectDb from "./config/connectionDb.js";
import userRoute from "../crudNodeAPi/routes/userRoutes.js";
import bodyparser from "body-parser";
import cors from "cors"
import crudRoute from '../crudNodeAPi/routes/crudRoute.js'

const dbUrl = process.env.DATABASEURL

dotEnv.config();
const port = process.env.PORT;
const app = express();



app.use(bodyparser.json());

app.use(cors())

//connection to database

connectDb("mongodb://localhost:27017")

// loading userRoutes

app.use('/api/user/',userRoute);

app.use('/api/data/',crudRoute)

app.listen(port,()=>{
    console.log("listening");
})





