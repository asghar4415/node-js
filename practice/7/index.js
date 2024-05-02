import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// consr url = "";   Add your MongoDB URL here

mongoose.connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));


// making api for todo app




app .get("/", (req, res) => {
    res.json({ message: "Hello World" });
});


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); }
);
