import express from 'express';
import {
    getAllBooks,
    getBookById,
    createBook,
    patchBook,
    deleteBook
} from '../controllers/books.controller.js';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.get('/:id', getBookById);
router.patch('/:id', patchBook);
router.delete('/:id', deleteBook);

export default router;