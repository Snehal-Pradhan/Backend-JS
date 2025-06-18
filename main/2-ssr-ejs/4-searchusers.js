import express from "express"
import { Human } from "./models/human.model.js"

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    try {
    const searchTerm = req.query.q;
    const query = searchTerm ? { 
    name: { 
        $regex: searchTerm.length === 1 ? `^${searchTerm}` : searchTerm, $options: 'i' 
    } 
    } : {};
    
    const users = await Human.find(query);
    res.json(users);
    } catch (err) {
    res.status(500).json({ error: "Search failed", details: err.message });
    }
});


app.post("/",async(req,res)=>{
    const {name,email,age} = req.body;
    const newHuman =  await Human.create({
        name,
        email,
        age
    });
    res.status(201).json({
        status: "success",
        data: {
            human: newHuman
        }
    })
})


app.listen(3000,()=>{
    console.log(`app listening at port 3000`);
})