import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))


const app = express();

app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"views")))

app.get("/users/new",(req,res)=>{
    res.render("index")
});


app.get("/",(req,res)=>{
    res.render("user")
});

app.get("/home",(req,res)=>{
    res.render("home")
})





app.listen(3000,()=>{
    console.log(`App listening at port : 3000`)
})