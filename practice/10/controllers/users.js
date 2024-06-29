import { UrlModel } from "../models/url.js";
import { nanoid } from 'nanoid';



export async function handleGetUrls(req, res)
    {
        const urls = await UrlModel.find();
        
        // return res.json({
        //     message: "All URLs",
        //     data: urls

        // });
        return res.render("home", {urls});
    }

export async function handleShortenUrl(request, response) 
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

export async function handleRedirectUrl(req, res)
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
            return res.redirect(urlfind.redirectUrl);
        
    }

export async function handleGetUrlStats(req, res)
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

    }













