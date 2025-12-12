import mongoose from "mongoose";

 export const connectDB=async()=>{
    try{
            const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI not found in environment variables");
    }
          await mongoose.connect(uri);
          console.log("MongoDB connected successfully");
    }
    catch(err){
        console.log("Error in DB connection", err);
        throw err;
    }
}