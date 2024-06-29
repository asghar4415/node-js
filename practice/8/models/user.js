import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    age: {
        type: Number,
        default: 0
    },
})

const UserModel = mongoose.model("user", userSchema)

export default UserModel