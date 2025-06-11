import express from "express"

import { getAllBooks, getBooksById,createBook } from "../controllers/books.controller.js"

const router = express.Router()

router.get("/",getAllBooks);
router.get("/:id",getBooksById);
router.post("/",createBook)

export default router;
