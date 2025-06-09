import express from "express"
import { getBooks,getBooksByID } from "../controller/books.controller.js"

const router = express.Router()

router.get("/books",getBooks);
router.get("/books/:id",getBooksByID);

export default router;