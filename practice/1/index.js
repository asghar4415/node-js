//install express before running this file (npm install express)

import express from 'express';


const app = express();

const port = 5000;


app.listen(port, () => console.log(`server running on localhost:${port}`) )