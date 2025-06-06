import express from "express"

import { getStatus,getTodos } from "../controllers/todos.controller.js"

const router = express.Router();

router.get("/", getStatus);
router.get("/todos", getTodos);

export default router;