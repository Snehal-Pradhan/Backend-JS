import express from 'express';
import {Person} from "./person.model.js";

const app = express();
app.use(express.json());    

app.get('/', async (req, res) => {
    const query = {};
    if(req.query.role)query.role = req.query.role;
    if(req.query.age_gte)query.age = {$gte : parseInt(req.query.age_gte)};
    const data = await Person.find(query);
    res.json(data);
})

app.post('/', async (req, res) => {
    const {name, role, age} = req.body;
    if(!name || !role || !age) {
        return res.status(400).json({error: "All fields are required"});
    }
    const personData = await Person.create({name, role, age});
    
    res.status(201).json(personData);
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 