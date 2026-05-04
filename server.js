import express from "express";
import "dotenv/config"
import cors from "cors";
import connectDB from "./configs/db.js";
import useRouter from "./routes/userRoutes.js";


const app = express()

await connectDB()

//Midleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("server is running."))
app.use('/api/user', useRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`))