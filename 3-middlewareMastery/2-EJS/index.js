import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))


app.get("/",(req,res)=>{
    res.render("index");
})


app.listen(PORT,()=>{
    console.log(`app listening at port : ${PORT}`)
})