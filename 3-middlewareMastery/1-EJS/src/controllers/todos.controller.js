export const getAllTodos = (req,res)=>{
    try {
        res.status(200).json({status : "succesful"})
    } catch (error) {
        res.status(500).json({error: "unable to fetch todos"})
    }
}