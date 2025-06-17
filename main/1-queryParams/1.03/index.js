import express from "express";
import dotenv from "dotenv";
import { Task } from "./user.model.js";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); // ✅ To parse JSON body

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/taskdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ GET /tasks?status=pending
app.get("/tasks", async (req, res) => {
  const { status } = req.query;
  const query = status ? { status } : {};
  const filteredData = await Task.find(query);
  res.json(filteredData);
});

// ✅ POST /tasks
app.post("/tasks", async (req, res) => {
  const { title, status } = req.body;
  try {
    const createdTask = await Task.create({ title, status });
    res.status(201).json({ msg: "New task created", createdTask });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`App listening at port: ${PORT}`);
});
