import express from "express"

import { getAllBooks, getBooksById,createBook,deleteBook } from "../controllers/books.controller.js"

const router = express.Router()

router.get("/",getAllBooks);
router.get("/:id",getBooksById);

export default router;
