const express = require('express');

const app = express();

const PORT = 3000;

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.get('/somu',(req,res)=>{
    res.send("somu")
})

app.listen(PORT, ()=>{
    console.log(`app listening at port : ${PORT}`)
})