import express from "express";
import { getJokes,getRandomJokes } from "../controllers/jokes.controller.js";

const router = express.Router()

router.get("/jokes",getJokes)

router.get("/jokes/random",getRandomJokes)

export default router