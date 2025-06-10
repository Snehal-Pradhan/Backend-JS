import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { error } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname,"../data/bookData.json")
const data = fs.readFileSync(filePath,"utf-8");
const books = JSON.parse(data);

export const getAllBooks = (req,res)=>{
    try {
        res.status(200).json(books)
    } catch (error) {
        res.status(404).json({error : "book data not found"})
    }
}

export const getBooksById = (req,res)=>{
    const id = Number(req.params.id);
    const book = books.find((b) => b.id === id);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
}

