import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI,{dbName: "SaveMate"})
        .then(()=>{
            console.log("DB connected successfully");
        })
        .catch((err)=>{
            console.log("DB connection error: ", err);
        })
}