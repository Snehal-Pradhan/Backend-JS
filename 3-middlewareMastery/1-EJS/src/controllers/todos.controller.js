import todosModel from "../models/todos.model.js"

export const getAllTodos = async(req,res)=>{
    try {
        const data = await todosModel.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error: "unable to fetch todos"})
    }
}