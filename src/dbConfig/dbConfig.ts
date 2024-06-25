import mongoose from "mongoose";

export async function connect(){
    try{
         await mongoose.connect(process.env.MONGO_URL!)
         const connection = mongoose.connection
         connection.on("connected",()=>{
            console.log("Mongodb coneected successfully")
            
         })

         connection.on("error",(err)=>{
            console.log("error in connection")
         })
    }catch(error)
    {
        console.log("goes something wrong")
    }
}