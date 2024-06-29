//URL shortener
//Enter any URL and get a shortened URL
//When you visit the shortened URL, it should redirect you to the original URLy

import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { UrlModel } from './models/url.js';


const app = express();

const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))

const uri = "mongodb://localhost:27017/url-shortener"

mongoose.connect(uri)
    .then(() => console.log("mongodb connected!"))
    .catch((error) => console.log("err mongodb", error.message))




 
app.post("/", async (req, res) => 
    {
        console.log(req.body);
        const body = req.body;

        if(!body.url)
        {
            return res.status(400).json({message: "URL is required"});
        }
        const shortId = nanoid(7);
        const url = await UrlModel.create(
            {
                shortId: shortId,
                redirectUrl: body.url,
                visitHistory: []
                
            }
        );
        return res.json({
            
            message: "URL shortened successfully",
            data: url
        });
    }
)

app.get("/:shortId", async (req, res) => 
    {
        const shortId = req.params.shortId;
        const urlfind= await UrlModel.findOneAndUpdate(
            {
                shortId,
            }, 
            {
                $push:
                {
                    visitHistory:
                    {
                        timestamp: Date.now()
                    }
                },
            });
            res.redirect(urlfind.redirectUrl);
        
    })

app.get("/stats/:shortId", async (req, res) =>
    {
        const shortId = req.params.shortId;
        const urlfind = await UrlModel.findOne({shortId});
        if(!urlfind)
        {
            return res.status(404).json({message: "URL not found"});
        }
        return res.json({
            message: "URL stats",
            totalVisits: urlfind.visitHistory.length,
            data: urlfind
        });

    })



















app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}/`))
