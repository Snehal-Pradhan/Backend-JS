import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/bookDatabase");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },  
    rating : {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
})


export const Book = mongoose.model("Book", bookSchema);