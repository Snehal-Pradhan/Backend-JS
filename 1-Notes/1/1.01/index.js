require('dotenv').config()

const express = require("express")

const app = express();

const PORT = 3000;

app.get('/',(req,res)=>{
    res.send("hi")
})

app.listen(process.env.PORT,()=>[
    console.log('app listening at port :',process.env.PORT)
])