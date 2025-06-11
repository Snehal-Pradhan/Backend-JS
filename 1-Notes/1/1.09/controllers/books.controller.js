import fs from "fs/promises"; 
import path from "path";
import { fileURLToPath }  from "url"; 
import { dirname } from "path";

// bookData.json - Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, "../data/bookData.json");

let books = [];

(async () => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        books = JSON.parse(data); 
        console.log("Initial book data loaded successfully asynchronously.");
    } catch (err) {
        console.error("Error loading initial book data:", err.message);
    }
})();


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


export const createBook = (req,res) =>{
    const {name} = req.body;
    if(!name)return res.status(400).json({msg: "name is required."})
    const newItemID = Math.max(...books.map(b => b.id))+1
    const newItem = {
        name : name,
        id: newItemID
    }
    books.push(newItem);
    SaveFile()
    res.status(201).json({
        status : "succesful",
        ...newItem
    })
}


const SaveFile = async() =>
    {
        try {
            const dataToSave = JSON.stringify(books,null,2);
            await fs.writeFile(filePath, dataToSave, "utf-8");
            console.log("Book data successfully saved to file!");
        } catch (error) {
            console.error("ERROR saving book data:", error.message)
        }
}