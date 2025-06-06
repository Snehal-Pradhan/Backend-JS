
export const getTodos = (req, res) => {
    res.json({ todos: [] });
};

export const getStatus = (req,res) =>{
     res.status(200).json({
        status : "Server is running",
    }
    )
}