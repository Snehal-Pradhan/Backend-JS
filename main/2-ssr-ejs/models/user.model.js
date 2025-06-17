import { name } from "ejs";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/mydatabase123");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        }
    }
)

export const User = mongoose.model("User", userSchema);