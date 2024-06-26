import mongoose from "mongoose";


const UrlSchema = new mongoose.Schema({
    shortId: 
    {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl:
    {
        type: String,
        required: true
    
    },
    visitHistory:
    [
        {
            timestamp: {type: Number},

        }
    ]

}, 
{
    timestamps: true
}
)
;


export const UrlModel = mongoose.model("url", UrlSchema)