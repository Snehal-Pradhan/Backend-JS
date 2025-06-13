import express from "express";
import dotenv from "dotenv";
import userModel from "./user.model.js";
import { connectDB } from "./db.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000 ;


connectDB();

app.get("/",(req,res)=>{
    
})

app.get("/create", async (req,res)=>{
    let createdUser = await userModel.create({
        name : "Somu",
        username :"Somu2005",
        email: "snehalpradhan23@gmail.com"
    })

    res.send(createdUser);
})

app.get("/update", async (req,res) => {
    let updatedUser = await userModel.findOneAndUpdate({name : "Somu"},{name : "Snehal Pradhan"},{new : true});
    res.send(updatedUser);
})

app.get("/read", async (req,res) => {
    let User = await userModel.find();
    res.send(User);
})

app.get("/delete", async(req,res) =>{
    let deleteUser = await userModel.findOneAndDelete({name:"Somu"});
    res.send(deleteUser)
})


app.listen(PORT,()=>{
    console.log(`app listening at port : ${3000}`)
})