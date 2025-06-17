import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/personDatabase");


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
})


export const Person =  mongoose.model("Person", personSchema);