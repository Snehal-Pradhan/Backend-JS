import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }});

export default User = mongoose.model("User", userSchema);    

