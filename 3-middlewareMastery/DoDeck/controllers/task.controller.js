import taskModel from "../models/task.model.js";

// ✅ Fetch all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

// ✅ Pending tasks
export const getPendingTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ status: "pending" });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pending tasks" });
  }
};

// ✅ Completed tasks
export const getCompletedTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ status: "completed" });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching completed tasks" });
  }
};

// ✅ Create task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const newTask = await taskModel.create({ title, description, status, dueDate });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// ✅ Update task by ID
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { title, description, status, dueDate },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

// ✅ Delete task by ID
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await taskModel.findByIdAndDelete(id);

    if (!deletedTask) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
