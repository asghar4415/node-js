// login signup api with otp verification

import 'dotenv/config'

import express from "express";
import connectMongoDB from "./connection.js";

import cors from 'cors';
import router from "./routes/routes.js";

const app = express();
 
const PORT = 4000;

console.log(process.env.MONGODB_URI, "env test")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))


connectMongoDB("login-signupapi")


app.use("/", router)

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}/`))
