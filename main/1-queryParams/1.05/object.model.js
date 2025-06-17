import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/objecttestdb")

const objectSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    }
})

export const ObjectModel = mongoose.model("Object", objectSchema);