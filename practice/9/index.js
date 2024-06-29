import express from 'express'
import userRouter from './routes/users.js'
import connectMongoDB from './connection.js'
import logRequest from './middleware/index.js'


const app = express()
const PORT = process.env.PORT || 5000


connectMongoDB("practice-2")



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logRequest)



app.get("/", (req, res) => {
    res.json({
        message: "HELLO WORLD"
    })
})


app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
}
)


