import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/echo",(req,res)=>{
    res.json(req.query);
})

app.listen(PORT,()=>{
    console.log(`app listenin at port ${PORT}`)
})