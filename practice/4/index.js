import express from 'express';
import fs from 'fs';

const rawData = fs.readFileSync('./mock_data.json');

const users = JSON.parse(rawData);


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
//PATCH: The PATCH method is used to apply partial modifications to a resource. (update data)

//status codes:
//200: OK
//201: Created
//400: Bad Request
//401: Unauthorized
//404: Not Found
//500: Internal Server Error



//Rest API: REST API is an architectural style that uses a stateless protocol like HTTP for data communication. REST API is used to build web services that are lightweight, maintainable, and scalable.

//Restful API: A RESTful API uses HTTP requests to perform the CRUD operations. It is a type of web service that is used to create, retrieve, update, and delete data. It is a stateless architecture that means each request from the client to the server must contain all the information needed to understand the request.


//use post man for testing API
//working with restful api


//CRUD operations:


app.get("/" , (req , res) => {
    res.json(
    {
        message : "Hello its me",
        // user : users

    }
    )
}
)

app.get("/getusers", (request, response) => {
    response.json({
        message: "USER GET!",
        users: users

    })
})
app.get("/getusers/:id", (request, response) => {
    const id = Number(request.params.id);
    const user = users.find((user) => user.id === id);
    console.log("user", user)   
    return response.json({
        message: "USER GET BY ID!",
        user: user
    })
})



app.post("/createuser", (request, response) => {
    console.log("request", request.body)
    users.push(request.body)
    response.json({
        message: "USER CREATED!"
    })
})


app.put("/updateuser/:id", (request, response) => {
    const id = Number(request.params.id)
    const user = users.find((user) => user.id === id)
    console.log("user", user)

    return response.json({
        message: "USER UPDATED!",
        user: user
    })
    
})

app.delete("/deleteuser/:id", (request, response) => {
    const id = Number(request.params.id)
    const user = users.find((user) => user.id === id)
    console.log("user", user)
    users.splice(users.indexOf(user), 1)
    return response.json({
        message: "USER Deleted!"
    })
})






app.listen(PORT , () => console.log(`server is running on http://localhost:${PORT}`))

