//install express before running this file (npm install express)

import express from 'express';


const app = express();

const port = 5000;

app.get("/" , (request, response) => 
{
    response.send("Hello World");

})
app.get("/products" , (request, response) =>
{
    response.send( "Products List: ");
    response.json(products);
}
)

const products = [
    {
        id: 1,
        name: "product 1"
    },
    {
        id: 2,
        name: "product 2"
    },
    {
        id: 3,
        name: "product 3"
    }
]


app.listen(port, () => console.log(`server running on localhost:${port}`) )

//whenever we run this file, it will start a server on localhost:5000 and will display "Hello World" on the browser.
//to run this file, type "node index.js" in the terminal.
//to stop the server, press "ctrl + c" in the terminal.
//to run the server in the background, type "node index.js &" in the terminal.
//if you make a change in the file, you need to stop the server and run it again to see the changes.



//another way of running this file is (npm run start) command. if you look in package.json file, you will see a script called "start" which runs the file. now you know how (npm run dev) command works in react. it runs the file mentioned in the script.