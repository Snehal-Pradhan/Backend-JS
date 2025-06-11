import path from "path";
import fs from "fs"
import { fileURLToPath } from "url";
import { dirname } from "path";

export const getTodos = (req,res)=>{
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const filePath = path.resolve(__dirname, "../data/todos.json")
        const data = fs.readFileSync(filePath,'utf-8');
        const todos = JSON.parse(data);

        res.status(200).json(todos)

    } catch (error) {
        console.error('Error loading todos:', error);

        res.status(500).json({error : "Failed to load todos"});
    }
}