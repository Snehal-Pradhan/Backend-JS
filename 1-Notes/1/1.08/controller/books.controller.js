import { books } from "../books.js"

export const getBooks = (req,res) => {
    res.json(books)
}

export const getBooksByID = (req,res) => {
    const bookID = parseInt(req.params.id);
    const book = books.find(b => b.id === bookID)

    if(!book){ 
        res.status(404).json({error: "Book not found"});
    }

    res.json(book)

}