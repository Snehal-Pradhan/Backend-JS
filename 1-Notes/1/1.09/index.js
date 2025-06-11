import express from "express"
import bookRouter from "./routes/books.routes.js"
import dotenv from "dotenv"
dotenv.config()


const app = express()

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/",bookRouter);

app.listen(PORT,()=>{
    console.log(`app is listening at port : ${PORT}`)
})