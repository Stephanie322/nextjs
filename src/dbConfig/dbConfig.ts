import { console } from "inspector";
import mongoose from "mongoose";

export async function connect() {
   try{
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection;

    connection.on('connected',()=>{
        console.log('Mongodb connected successfullu')
    })
    connection.on('error',(err)=>{
        console.log('Mongoose connection error'+err);
        process.exit();
    })
   } catch(error){
     console.log("Something went wrong");
     console.log(error);
   }
   
    
}