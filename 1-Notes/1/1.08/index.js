import express from "express";
import dotenv from "dotenv";
dotenv.config()
import booksRouter from "./routes/books.routes.js"

const app = express()

const PORT  = process.env.PORT || 3000;

app.use(express.json())

app.use("/",booksRouter)

app.listen(PORT, ()=>{
    console.log(`app is listening at port ${PORT}`)
})