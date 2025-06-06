import express from "express";
import { getGreeting, getName, getWelcome } from "../controllers/greetings.controller.js";

const router = express.Router();

router.get('/', getWelcome);
router.get('/greeting', getGreeting);
router.get('/name', getName);

export default router;
