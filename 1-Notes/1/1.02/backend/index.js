import dotenv from "dotenv";
dotenv.config()
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/api/jokes',(req,res)=>{
    const jokes = [
  {
    "id": 1,
    "title": "Programmer Humor",
    "joke": "Why do programmers prefer dark mode? Because light attracts bugs."
  },
  {
    "id": 2,
    "title": "Math Joke",
    "joke": "Why was the equal sign so humble? Because it knew it wasn't less than or greater than anyone else."
  },
  {
    "id": 3,
    "title": "Tech Support",
    "joke": "Have you tried turning it off and on again?"
  },
  {
    "id": 4,
    "title": "Database Joke",
    "joke": "I would tell you a joke about SQL, but you might not join in."
  },
  {
    "id": 5,
    "title": "JavaScript Fun",
    "joke": "Why did the developer go broke? Because he used up all his cache."
  }
]
 res.send(jokes)
})

app.listen(PORT,()=>{
    console.log(`App listening at http://localhost:${PORT}`)
})