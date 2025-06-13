import express from "express"
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.routes.js"

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/",productRouter);

app.listen(PORT,()=>{
    console.log(`app listening at PORT : ${PORT}`)
})
