import express from "express";
import dotenv from "dotenv";
dotenv.config();

import greetingsRouter from "./routes/greeting.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', greetingsRouter);

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
