import express from "express"
import dotenv from "dotenv";
dotenv.config();

import { Product } from "./product.model.js";

const app = express()

const port = process.env.PORT;

app.use(express.json());

app.get("/", async (req, res) => {
  const { sortBy, order } = req.query;
  const sortOrder = order === "desc" ? 1 : -1;
  const sortOptions = sortBy ? { [sortBy]: sortOrder } : {};

  const sortedData = await Product.find().sort(sortOptions);
  res.json(sortedData);
});


app.post("/", async (req, res) => {
  const { name, price } = req.body;

  try {
    const newProduct = await Product.create({ name, price });
    res.status(201).json({ message: "Product created", newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.listen(port,()=>{
    console.log(`app listening at port ${port}`)
});
