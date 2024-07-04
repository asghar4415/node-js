//URL shortener
//Enter any URL and get a shortened URL
//When you visit the shortened URL, it should redirect you to the original URLy

import express from "express";
import connectMongoDB from "./connection.js";

import cors from 'cors';
import router from "./routes/routes.js";

const app = express();
 
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))


connectMongoDB("url-shortener")


app.use("/", router)

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}/`))
