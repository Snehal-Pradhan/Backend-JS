import express from "express"
import dotenv from "dotenv"
dotenv.config()
import todosRouter from "./routes/todos.routes.js"

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use("/",todosRouter)

app.listen(PORT,()=>{
    console.log(`app listening at port ${PORT}`)
})