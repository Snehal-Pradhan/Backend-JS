import express from "express"
import { ObjectModel } from "./object.model.js";
const app = express();
app.use(express.json());

app.get("/", async(req, res) => {
    const page = parseInt(req.query.page) || 1 ;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const data = await ObjectModel.find().skip(skip).limit(limit);
    res.status(200).json(data);
})



app.post("/",async(req,res)=> {
    const {title} = req.body;
    const createdData = await ObjectModel.create({title});
    res.status(201).json({msg : "Object created successfully",createdData});
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); 