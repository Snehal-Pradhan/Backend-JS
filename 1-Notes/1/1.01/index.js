require('dotenv').config()

const express = require("express")

const app = express();

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("hi")
})

app.get('/name',(req,res)=>{
    res.json({ name: "somu" })
})

app.listen(PORT,()=>[
    console.log('app listening at port :',PORT)
])