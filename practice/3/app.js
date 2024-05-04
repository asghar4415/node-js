import express from 'express';
import products from './product.js';

const app = express();

const PORT = process.env.PORT || 3000;




const authMiddleware = (request, response, next) => {
    console.log("hit every request")
    const isAuth = true
    if (!isAuth) {
        response.json({
            data: null,
            message: "UnAUTH USER"
        })
    } else {
        next()
    }
}
//Middlewares:
//Middlewares are functions that have access to the request and response objects.  Middleware functions can perform the following tasks:
//Execute any code.
//Make changes to the request and the response objects.
//End the request-response cycle.
//Call the next middleware function in the stack.

//If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.


// app.use((req , res , next) => {
//     console.log("Hit the middleware function")  
//     next()
// }
// )  




app.get("/", (request, response) => {
    response.send("<h1>HELLO WORLD</h1>")
})

app.get("/products", authMiddleware, (request, response) => {
    console.log("request.query", request.query)
    const query = request.query
    if (query?.limit) {
        response.send(products.slice(0, query?.limit))
    } else {
        response.send(products)
    }

})



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






app.listen(PORT , () => console.log(`server is running on http://localhost:${PORT}`))