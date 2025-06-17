import express from 'express';  
import { Book } from './book.model.js';
import { bookValidationSchema } from './book.validation.js';

const app = express();
app.use(express.json());

// GET books with optional rating, pagination, sorting
app.get("/", async (req, res) => {
    try {
        const rating = req.query.rating ? parseFloat(req.query.rating) : undefined;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort === 'asc' ? 1 : -1;
        const skip = limit * (page - 1);

        const filter = {};
        if (rating !== undefined) filter.rating = rating;

        const books = await Book.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ rating: sort });

        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// POST a new book with Joi validation
app.post("/", async (req, res) => {
    try {
        const { error, value } = bookValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message.replace(/['"]/g, '') });
        }

        const { title, rating } = value;
        const bookData = await Book.create({ title, rating });

        res.status(201).json({ msg: "New book created", bookData });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});