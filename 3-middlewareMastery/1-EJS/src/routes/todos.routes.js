import express from "express";
import { getAllTodos } from "../controllers/todos.controller.js";

const router = express.Router();

router.get("/",getAllTodos);

export default router;

