import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongo DB connected succesfully ...`); 
    } catch (error) {
        console.log("mongo DB connection failed : ",error);
    }
    
}