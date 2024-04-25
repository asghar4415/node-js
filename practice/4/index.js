import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;



app.use(express.json());
//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. it is a method that is used to parse incoming requests with JSON payloads. It is a middleware that is used to parse JSON objects from the request object.

app.use(express.urlencoded({ extended: true }));
//express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded())




//API contains:
//-URL: a URL is a reference to a web resource that specifies its location on a computer network and a mechanism for retrieving it.
//-HTTP Method: The HTTP method is a type of request that tells the server what action should be performed.
//-Header: The header contains information about the client and the server.
//-Body: The body contains the data that is sent to the server.

//methods: 
//GET: The GET method is used to request data from a specified resource. (read data)
//POST: The POST method is used to submit data to be processed to a specified resource. (create new data)
//PUT: The PUT method is used to update data to a specified resource. (update data)
//DELETE: The DELETE method is used to delete data from a specified resource. (delete data)

//status codes:
//200: OK
//201: Created
//400: Bad Request
//401: Unauthorized
//404: Not Found
//500: Internal Server Error

//two types of API:
//Rest API: REST API is an architectural style that uses a stateless protocol like HTTP for data communication. REST API is used to build web services that are lightweight, maintainable, and scalable.

//Restful API: A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST, and DELETE data. A RESTful API is based on representational state transfer (REST) technology, an architectural style, and approach to communications often used in web services development.







app.get("/" , (req , res) => {
    res.json(
    {
        message : "Hello its me"

    }
    )
}
)


app.post("/createuser" , (req , res) => {
    res.json(
    {
        message : "User created successfully"

    }
    )
}
)

//use post man for testing API


app.put("/updateuser" , (req , res) => {
    res.json(
    {
        message : "User updated successfully"

    }
    )
}
)

app.delete("/deleteuser" , (req , res) => {
    res.json(
    {
        message : "User deleted successfully"

    }
    )
}
)

















app.listen(PORT , () => console.log(`server is running on http://localhost:${PORT}`))

