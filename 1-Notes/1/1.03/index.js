import dotenv from "dotenv";
dotenv.config()
import express from "express"

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/home',(req,res)=>{
    res.send("<h1>Home</h1>")
})
app.get('/contact',(req,res)=>{
    res.send("<h1>Contact</h1>")
})
app.get('/about',(req,res)=>{
    res.send("<h1>About</h1>")
})
app.get('/docs',(req,res)=>{
    res.send("<h1>Docs</h1>")
})
app.get('/login',(req,res)=>{
    res.send("<h1>Login</h1>")
})

app.listen(PORT,()=>{
    console.log(`App listening at port ${PORT}`);
})



