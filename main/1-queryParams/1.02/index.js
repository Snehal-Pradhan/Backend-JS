import express from "express";
import dotenv from "dotenv";
import { data } from "./data.js";
dotenv.config();

const app = express();

app.get("/",(req,res)=>{
    const {role} = req.query;

    const filteredData = role?data.filter((e)=> e.role === role):data;

    res.json(filteredData);
})

app.listen(process.env.PORT,()=>{
    console.log(`app listening..`)
})