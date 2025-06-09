import express from "express"
import dotenv from "dotenv"
dotenv.config();
import jokesRouter from "./routes/jokes.routes.js"


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use("/",jokesRouter)


app.listen(PORT,()=>{
    console.log(`App is listening at port  : ${PORT}`)
})
