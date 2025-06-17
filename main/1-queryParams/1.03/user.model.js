import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/taskdata");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
});


export const Task = mongoose.model("Task", taskSchema);
