import express from "express";
import mongoose from "mongoose";
const app = express()
const PORT = process.env.PORT || 8080
import cors from "cors"
import route from "./routes/index.js";

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))

const uri = "mongodb://localhost:27017/singup-api"

mongoose.connect(uri)
    .then(() => console.log("mongodb connected!"))
    .catch((error) => console.log("err mongodb", error.message))

app.use(route)

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}/`))