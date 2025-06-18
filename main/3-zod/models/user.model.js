import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/mydatabase789");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type : Number,
        required : true
    }
})

export const User = mongoose.model("User",userSchema);