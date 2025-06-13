import express from "express";
import {
    getAllTasks,
    getCompletedTasks,
    getPendingTasks,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js"

const router = express.Router();

router.get("/",getAllTasks);
router.get("/pending",getPendingTasks);
router.get("/completed",getCompletedTasks);
router.post("/create",createTask);
router.put("/update/:id",updateTask);
router.delete("/delete/:id",deleteTask);


export default router;
