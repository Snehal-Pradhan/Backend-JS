import express from "express"
import dotenv from "dotenv"
import todosRouter from "./routes/todos.routes.js"
import path from "path"
import { fileURLToPath } from "url"
import { connectDB } from "./config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config()
//connectDB();


const PORT = process.env.PORT || 3000;6


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views')); 
app.use(express.static(path.join(__dirname,"./public")))


app.use(express.json());
app.use(express.urlencoded({extended : true}))


app.use("/",todosRouter);

app.listen(PORT,()=>{
    console.log(`app listening at port : ${PORT}`)
})