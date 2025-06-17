import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from './models/user.model.js';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/user/:id", async (req, res) => {
    try {
    const userid = req.params.id;
    const user = await User.findById(userid);
    res.render('userprofile', { user });
    } catch (err) {
    res.status(500).send("User not found");
    }
});

app.post("/user", async (req, res) => {
    const { name, email } = req.body;
    const newuser = await User.create({ name, email });
    res.status(201).json(newuser);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
} );    