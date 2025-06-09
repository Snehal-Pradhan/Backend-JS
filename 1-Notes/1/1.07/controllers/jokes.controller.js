import { jokesArray } from "../jokes.js"

export const getJokes = (req,res) => {
    res.json(jokesArray)
}

export const getRandomJokes = (req,res) => {
    const randomJoke = jokesArray[Math.floor(Math.random()*jokesArray.length)]
    res.json(randomJoke);
}