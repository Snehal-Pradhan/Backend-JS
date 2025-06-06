import express from "express"
import dotenv from "dotenv"
dotenv.config()
import todoRoutes from "./routes/todos.routes.js"

const app = express()

const PORT = process.env.PORT || 3000;

app.use(express.json());           

app.use("/api", todoRoutes); 

app.listen(PORT,()=>{
    console.log(`App listening at PORT ${PORT}`)
})