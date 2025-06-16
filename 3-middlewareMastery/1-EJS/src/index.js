import express from "express"
import dotenv from "dotenv"
import todosRouter from "./routes/todos.routes.js"

import { connectDB } from "./config/db.js";
dotenv.config()
connectDB();


const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.json());

app.use("/",todosRouter);

app.listen(PORT,()=>{
    console.log(`app listening at port : ${PORT}`)
})