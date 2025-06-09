const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/home',(req,res) => {
  res.send('Home')
})

app.get('/somu',(req,res) => {
  res.send('somu')
})

app.get('/login',(req,res)=>{
  res.send('<h1>Login</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
