import express from "express"

import { getAllBooks, getBooksById,createBook,deleteBook ,updateBook} from "../controllers/books.controller.js"

const router = express.Router()

router.get("/",getAllBooks);
router.get("/:id",getBooksById);
router.post("/",createBook);
router.delete("/:id",deleteBook);
router.patch("/:id",updateBook);

export default router;
