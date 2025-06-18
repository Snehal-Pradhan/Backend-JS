import express from 'express';
import { userValidationSchema,validateUser } from './validators/userValidationSchema.js';
import { User } from './models/user.model.js';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    const userData = User.find();
    res.status(200).json(userData);
})


app.post("/",async(req,res)=>{
    const {name,age} = req.body;
    validateUser({name,age});

    const newUser = await User.create({name,age});

    res.status(201).json({msg : "new user created"}, newUser);
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});