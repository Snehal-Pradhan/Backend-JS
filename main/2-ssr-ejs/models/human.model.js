import mongoose, { mongo } from "mongoose";

mongoose.connect("mongodb://localhost:27017/humanDB")

const humanSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        trim: true
    },
    email :{
        type: String,
        required: true, 
        unique: true,
        trim: true,
    },
    age:{
        type: Number,
        required: true,
        min: 0,
        max: 120,
        integer: true
    }
})

humanSchema.index({name: 1},{collation: { locale: 'en', strength: 2 }});

export const Human = mongoose.model("Human", humanSchema);
