import express from 'express';
import products from './product.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/" , (req , res) => {
    res.send("Hello World")
}
)
//req = request is the request that the client sends to the server. 
//res = response is the response that the server sends back to the client.


app.get("/products", (req , res) => {

    // res.send("Products Page")
    // console.log(products)
    // res.json(products)
    console.log("request query" , req.query)
    
    const query = req.query
    if(query?.limit){
        // const limit =  parseInt(query.limit)
        // console.log("limit" , limit)
        res.json(products.slice(0 , query?.limit ))

    }else{
        res.json(products)

}
}
)

app.get("/products/:id" , (req , res) => {
    const product = products.find((product) => product.id === +req.params.id)
    console.log(product)
    res.json(product)
    console.log(req.params)
}
)  //recheck it


//query params and search query params
//query params are used to filter the data that is being sent to the server.
//search query params are used to search for a specific data in the server.



//Middlewares:
//Middlewares are functions that have access to the request and response objects.  Middleware functions can perform the following tasks:
//Execute any code.
//Make changes to the request and the response objects.
//End the request-response cycle.
//Call the next middleware function in the stack.

//If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.


app.use((req , res , next) => {
    console.log("Hit the middleware function")  
    next()
}
)  //recheck it


app.listen(PORT , () => console.log(`server is running on http://localhost:${PORT}`))